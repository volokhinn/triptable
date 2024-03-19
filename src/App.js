import React from 'react';
import AuthWindow from './components/AuthWindow/AuthWindow';
import TripsTable from './components/TripsTable/TripsTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<AuthWindow />} />
            <Route exact path="/trips" element={<TripsTable />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
