import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import clientMiddleware from './clientMiddleware';

const configureStore = (preloadedState) => {
  const middlewares = [clientMiddleware];

  let store;
  
  store = createStore(
    rootReducer,
    preloadedState,
    compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
  );


  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
};

export default configureStore;
