import axios from 'axios';
import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE } from './types';
import { setAlert } from './alert';

const baseUrl = process.env.REACT_APP_API_URL;

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/api/profile/me`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Get all profiles
export const getAllProfiles = () => async dispatch => {

    dispatch({ type: CLEAR_PROFILE })

    try {
        const res = await axios.get(`${baseUrl}/api/profile`);

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Get profile by ID
export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Get Github repos
export const getGithubRepos = (username) => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Create or update a profile
export const createProfile = (formData, navigate, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post(`${baseUrl}/api/profile`, formData, config);
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

        if(!edit) {
            navigate('/dashboard')
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Add experience
export const addExperience = (formData, navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`${baseUrl}/api/profile/experience`, formData, config);
        
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience added', 'success'));
        navigate('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.mesage, 'danger')))
        }
        console.log(errors)

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Add education
export const addEducation = (formData, navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`${baseUrl}/api/profile/education`, formData, config);
        
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education added', 'success'));
        navigate('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Delete experience
export const deleteExperience = (id) =>  async dispatch => {
    try {
        const res = await axios.delete(`${baseUrl}/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience removed', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Delete education
export const deleteEducation = (id) =>  async dispatch => {
    try {
        const res = await axios.delete(`${baseUrl}/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education removed', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Delete account & profile
export const deleteAccount = () =>  async dispatch => {
    if (window.confirm('Are you sure? This can not be undone!!')) {
        try {
            await axios.delete(`${baseUrl}/api/profile`);
    
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })
    
            dispatch(setAlert('Your account has been permanantly deleted'))
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}