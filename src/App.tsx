import React, { FC } from 'react';
import './App.css';
import { Navigation } from './Router/Navigation';
import { Route, Routes } from 'react-router-dom';
import { LocalStoragePage } from './Pages/StoragePage/Storage.component';
import { IndexedPage } from './Pages/Indexed/Indexed.component';
import { ReduxPage } from './Pages/LocalRedux/Storage.component';

export const App: FC = () => {
  return (
    <div className="App">
       <Navigation />
       <Routes>
        <Route path="local" element={<LocalStoragePage />} />
        <Route path="indexed" element={<IndexedPage/>} />
        <Route path="localRedux" element={<ReduxPage/>} />
      </Routes>
    </div>
  );
}

export default App;
