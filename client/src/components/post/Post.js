import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost} from '../../actions/post';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

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
            </section>
        )
    );
}
 
export default Post;