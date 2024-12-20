import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const DisplayProfiles = () => {
    const dispatch = useDispatch();
    const { profiles, loading } = useSelector(state => state.profile)

    useEffect(() => {
        dispatch(getAllProfiles())
    }, [dispatch])

    return (
        <section className="container">
            { loading ? <Spinner /> : 
                <>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.map(profile => (
                                <ProfileItem key={profile.user._id} profile={profile}/>
                            ))
                            ) : <h4>No profiles found...</h4>
                        }
                    </div>
                </>
            }
        </section>
    );
}
 
export default DisplayProfiles;