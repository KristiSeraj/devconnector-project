import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const ExperienceList = ({ experience }) => {
    const dispatch = useDispatch();
    return (
        <>
            <h2 className="my-2">Experience Credentials</h2>
            {experience.length === 0 ? <p> You have no education listed, please add your education </p> : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th className="hide-sm">Title</th>
                            <th className="hide-sm">Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {experience.map(exp => (
                            <tr key={exp._id}>
                                <td>{exp.company}</td>
                                <td className="hide-sm">{exp.title}</td>
                                <td className="hide-sm">
                                {moment(exp.from).format('DD-MM-YYYY')} - {!exp.to ? 'Now' : moment(exp.to).format('DD-MM-YYYY')}
                                </td>
                                <td>
                                <button className="btn btn-danger" onClick={() => dispatch(deleteExperience(exp._id))}>
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
 
export default ExperienceList;