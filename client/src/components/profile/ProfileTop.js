import React from 'react';

const ProfileTop = ({ profile }) => {
    return (
        <div className="profile-top bg-primary p-2">
            <img
                className="round-img my-1"
                src={profile.user.avatar}
                alt=""
            />
            <h1 className="large">{profile.user.name}</h1>
            <p className="lead">{profile.status} {profile.company && <span> at {profile.company} </span>}</p>
            <p>{profile.location && <span>{profile.location}</span>}</p>
            <div className="icons my-1">
                {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                    </a>
                )}
                {profile.social && profile.social.twitter && (
                    <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                )}
                {profile.social && profile.social.facebook && (
                    <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>
                )}
                {profile.social && profile.social.linkedin && (
                    <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                )}   
                {profile.social && profile.social.youtube && (
                    <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>
                )}   
                {profile.social && profile.social.instagram && (
                    <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                )}
            </div>
        </div>
    );
}
 
export default ProfileTop;