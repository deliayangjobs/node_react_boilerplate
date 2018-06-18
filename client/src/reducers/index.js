import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

// state key: reducer name
export default combineReducers({
    auth: authReducer,
    form: reduxForm
});
