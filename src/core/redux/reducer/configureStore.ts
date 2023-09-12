import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './index';

export default function configureStore() {
    const allEnhancers = compose(
        applyMiddleware(thunk)
    );

    return createStore(rootReducer, allEnhancers);
}
