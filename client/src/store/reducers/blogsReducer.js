import mapKeys from "lodash/mapKeys";

import * as actionTypes from "../actions/actionTypes";

export default function(state = {}, action) {
    switch (action.type) {
        case actionTypes.FETCH_BLOG:
            const blog = action.payload;
            return { ...state, [blog._id]: blog };
        case actionTypes.FETCH_BLOGS:
            return { ...state, ...mapKeys(action.payload, "_id") };
        default:
            return state;
    }
}
