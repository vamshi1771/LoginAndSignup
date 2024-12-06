import { combineReducers, createStore } from '@reduxjs/toolkit'
import snackbarReducer from './reducers/SnackBarReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    user : userReducer,
});

const store = createStore(rootReducer);

export default store;
