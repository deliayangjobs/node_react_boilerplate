import axios from 'axios';
import { FETCH_USER } from './types';

// instead of return an action, reduxThunk allow return a function
// reduxThunk will execute this function, pass in dispatch
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
};
