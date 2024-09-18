import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, deletePost, removeLike } from '../../actions/post';

const PostItem = ({ post, showActions = true }) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${post.user}`}>
                    <img
                        className="round-img"
                        src={post.avatar}
                        alt="avatar"
                    />
                    <h4>{post.name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{post.text}</p>
                <p className="post-date">
                    Posted on {moment(post.date).format('DD-MM-YYYY')}
                </p>
                {showActions && 
                <>
                    <button onClick={e => dispatch(addLike(post._id))} type="button" className="btn btn-light"><i className="fas fa-thumbs-up"></i> {post.likes.length > 0 && (<span>{post.likes.length}</span>)}</button>
                    <button onClick={e => dispatch(removeLike(post._id))} type="button" className="btn btn-light"><i className="fas fa-thumbs-down"></i></button>
                    <Link to={`/posts/${post._id}`} className="btn btn-primary">Discussion {post.comments.length > 0 && (<span className='comment-count'>{post.comments.length}</span>)}</Link>
                    {!auth.loading && post.user === auth.user._id && <button type="button" className="btn btn-danger" onClick={e => dispatch(deletePost(post._id))}><i className="fas fa-times"></i></button>}
                </>}
            </div>
        </div>
    );
}
 
export default PostItem;