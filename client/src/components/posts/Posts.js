import React, { useEffect } from 'react';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner'
import { useDispatch, useSelector } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = () => {
    const dispatch = useDispatch()
    const { posts, loading } = useSelector(state => state.post)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    return loading ? <Spinner /> : (
        <section className='container'>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
            <PostForm />
            <div className="posts">
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </section>
    )
}
 
export default Posts;