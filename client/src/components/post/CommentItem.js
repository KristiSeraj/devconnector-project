import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { deleteComment } from '../../actions/post';
import { useDispatch, useSelector } from 'react-redux';

const CommentItem = ({ postId, comment }) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${comment.user}`}>
                    <img
                        className="round-img"
                        src={comment.avatar}
                        alt="avatar"
                    />
                    <h4>{comment.name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {comment.text}
                </p>
                <p className="post-date">
                    Posted on {moment(comment.date).format('DD-MM-YYYY')}
                </p>
                {!auth.loading && comment.user === auth.user._id && (
                    <button type="button" className="btn btn-danger" onClick={e => dispatch(deleteComment(postId, comment._id))}>
                        <i className="fas fa-times"></i>
                    </button> 
                )}
            </div>
        </div>
    );
}
 
export default CommentItem;