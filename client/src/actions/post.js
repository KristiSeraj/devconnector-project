import axios from "axios";
import { setAlert } from './alert';
import { ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES } from "./types";

const baseUrl = process.env.REACT_APP_API_URL;

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/api/posts`);

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Add like
export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`${baseUrl}/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Remove like
export const removeLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`${baseUrl}/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Delete post
export const deletePost = (id) => async dispatch => {
    try {
        await axios.delete(`${baseUrl}/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        })

        dispatch(setAlert('Post removed', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Add post
export const addPost = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`${baseUrl}/api/posts`, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post created', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Get post
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Add comment
export const addComment = (postId, formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`${baseUrl}/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('Comment Added', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {

    try {
        await axios.delete(`${baseUrl}/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert('Comment Removed', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
