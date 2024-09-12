import React from 'react';
import moment from 'moment';

const ProfileExperience = ({ experience }) => {
    return (
          <div>
            <h3 className="text-dark">{experience.company}</h3>
            <p>{moment(experience.from).format('DD-MM-YYYY')} - {!experience.to ? 'Now' : moment(experience.to).format('DD-MM-YYYY')}</p>
            <p><strong>Position: </strong>{experience.title}</p>
            {experience.description && <p><strong>Description: </strong> {experience.description}</p>}
          </div>
    );
}
 
export default ProfileExperience;