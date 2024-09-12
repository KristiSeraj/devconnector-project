import React from 'react';
import moment from 'moment';
import { deleteEducation } from '../../actions/profile';
import { useDispatch } from 'react-redux';

const EducationList = ({ education }) => {
    const dispatch = useDispatch();
    return (
        <>            
            <h2 className="my-2">Education Credentials</h2>
            {education.length === 0 ? <p> You have no education listed, please add your education </p> : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {education.map(edu => (
                            <tr key={edu._id}>
                                <td>{edu.school}</td>
                                <td className="hide-sm">{edu.degree}</td>
                                <td className="hide-sm">
                                    {moment(edu.from).format('DD-MM-YYYY')} - {!edu.to ? 'Now' : moment(edu.to).format('DD-MM-YYYY')}
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => dispatch(deleteEducation(edu._id))}>
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
 
export default EducationList;