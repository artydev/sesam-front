import 'semantic-ui-css/semantic.min.css';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './store';

//prevent backspace navigation
document.onkeydown = function (event) {

  if (!event) { /* This will happen in IE */
    event = window.event;
  }

  var keyCode = event.keyCode;

  if (keyCode == 8 &&
    ((event.target || event.srcElement).tagName != "TEXTAREA") &&
    ((event.target || event.srcElement).tagName != "INPUT")) {

    if (navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
      event.stopPropagation();
    } else {
      alert("prevented");
      event.returnValue = false;
    }

    return false;
  }
};

let { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
export { store };

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
