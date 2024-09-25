import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

const baseUrl = process.env.BASE_URI;

// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`${baseUrl}/api/auth`);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = ({ name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post(`${baseUrl}/api/users`, body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${baseUrl}/api/auth`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors;
        console.log(errors)

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Logout / Clear profile

export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT })
    dispatch({ type: CLEAR_PROFILE })
}