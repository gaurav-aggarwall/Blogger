import axios from "axios";

import * as actionTypes from './actionTypes';

export const fetchBlogs = () => async dispatch => {
    const res = await axios.get("/api/blogs");

    dispatch({ type: actionTypes.FETCH_BLOGS, payload: res.data });
};
