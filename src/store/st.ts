import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    name: '',
  },
  reducers: {
    saveValue: (state, action) => {
        if (action.payload) {
            state.value = action.payload;
        }
    },
    saveName: (state, action) => {
        if (action.payload) {
            state.name = action.payload;
        }
    },
  },
})

export const { saveValue, saveName } = counterSlice.actions

export default counterSlice.reducer