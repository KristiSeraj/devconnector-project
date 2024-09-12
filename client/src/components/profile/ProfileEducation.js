import React from 'react';
import moment from 'moment';

const ProfileEducation = ({ education }) => {
    return (
        <div>
            <h3>{education.school}</h3>
            <p>{moment(education.from).format('DD-MM-YYYY')} - {!education.to ? 'Now' : moment(education.to).format('DD-MM-YYYY')}</p>
            <p><strong>Degree: </strong>{education.degree}</p>
            {education.fieldofstudy && <p><strong>Field Of Study: </strong>{education.fieldofstudy}</p>}
            {education.description && <p><strong>Description: </strong>{education.description}</p>}
        </div>
    );
}
 
export default ProfileEducation;