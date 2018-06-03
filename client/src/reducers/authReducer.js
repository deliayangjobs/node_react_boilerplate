import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            // when app starts, in loading fetchUser, return null
            return state;
    }
}
