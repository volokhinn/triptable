import React from 'react';
import AuthWindow from './components/AuthWindow/AuthWindow';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<AuthWindow />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
