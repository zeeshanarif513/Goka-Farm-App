import { createStore, applyMiddleware, compose} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import RootReducer from './reducers/RootReducer';

const logger = createLogger();

const Store = createStore(RootReducer, compose(applyMiddleware(thunk, logger)));

export default Store;