import * as actionTypes from '../actions/actionTypes';

export default function(state = false, action) {
    switch (action.type) {
        case actionTypes.FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}
