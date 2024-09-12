import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const { name, email, password, confirm_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm_password) {
            dispatch(setAlert('Passwords do not match', 'danger'))
        } else {
            dispatch(register({ name, email, password }))
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <section className='container'>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)}  />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" onChange={e => onChange(e)} value={email} />
                    <small className="form-text">This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        value={confirm_password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </section>
    );
}
 
export default Register;