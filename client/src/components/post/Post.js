import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost} from '../../actions/post';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = () => {
    const { post, loading } = useSelector(state => state.post)
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id))
    }, [dispatch, id])
    return (
        loading || post === null ? <Spinner /> : (
            <section className='container'>
                <Link to='/posts' className='btn btn-light'>Back to Posts</Link>
                <PostItem showActions={false} post={post}/>
                <CommentForm postId={post._id} />
                <div className='comments'>
                    {post.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} postId={post._id} />
                    ))}
                </div>
            </section>
        )
    );
}
 
export default Post;