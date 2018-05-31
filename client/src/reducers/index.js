import { combineReducers } from 'redux';
import authReducer from './authReducer';

// state key: reducer name
export default combineReducers({
    auth: authReducer
});
