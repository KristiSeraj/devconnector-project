import React, { useEffect } from 'react';
import { Link,  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import ExperienceList from './ExperienceList';
import EducationList from './EducationList';

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const { profile, loading } = useSelector(state => state.profile)

    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [dispatch])

    return loading && profile === null ? (
        <section className='container'>
            <Spinner />
        </section>
    ) : (
        <section className='container'>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome { user && user.name }
            </p>
            { profile !== null ? (
                <>
                    <DashboardActions />
                    <ExperienceList experience={profile.experience} />
                    <EducationList education={profile.education} />
                </>
            ) : (
                <>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
                </>
            )}
            <div className='my-2'>
                <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
                    <i className="fas fa-user-minus"></i> Delete My Account
                </button>
            </div>
        </section>
    );
}
 
export default Dashboard;