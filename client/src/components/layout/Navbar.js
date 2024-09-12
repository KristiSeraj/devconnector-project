import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    }

    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/dashboard'><i className='fas fa-user'></i><span className='hide-sm'> Dashboard</span></Link>
            </li>
            <li>
                <Link to='/posts'>Posts</Link>
            </li>
            <li>
                <a onClick={handleLogout} href="#!"><i className='fas fa-sign-out-alt'></i><span className='hide-sm'> Logout</span></a>
            </li>
        </ul>
    )

    const guessLinks = (
        <ul>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            { !loading && (
                <>
                    { isAuthenticated ? authLinks : guessLinks}
                </>
            )}
        </nav>
    );
}
 
export default Navbar;