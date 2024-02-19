import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer,  FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
// import storage from 'redux-persist/lib/storage/session'
import storage from 'redux-persist/lib/storage'
import st from './store/st'

const rootReducer = combineReducers({
    local: st,
})

const persistConfig = {
    key: 'root',
    storage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export const persist = persistStore(store);

export default store;