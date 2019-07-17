import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import navbarReducer from './containers/navbar/reducer';
import dataReducer from './services/dataReducer';

const persistConfig = {
  key: 'root',
  storage
};

const configureStore = () => {
  const reducers = combineReducers({
    navbarReducer: navbarReducer,
    dataReducer: dataReducer
  });

  const persistedReducer = persistReducer(persistConfig, reducers);

  let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

export { configureStore };
