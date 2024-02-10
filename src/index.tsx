import React from 'react';
import * as ReactDOM from 'react-dom';
import './_assets/fonts/SpaceGrotesk.ttf';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals(console.log);
