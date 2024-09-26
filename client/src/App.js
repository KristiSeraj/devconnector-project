import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import NotFound from './components/layout/NotFound';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import DisplayProfiles from './components/profiles/DisplayProfiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
      <Provider store={store}>  
        <Router>
          <>
            <Navbar />
            <Alert />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profiles' element={<DisplayProfiles />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/dashboard' element={<PrivateRoute>
                <Dashboard />
              </PrivateRoute>} />
              <Route path='/create-profile' element={<PrivateRoute>
                <CreateProfile />
              </PrivateRoute>} />
              <Route path='/edit-profile' element={<PrivateRoute>
                <EditProfile />
              </PrivateRoute>} />
              <Route path='/add-experience' element={<PrivateRoute>
                <AddExperience />
              </PrivateRoute>} />
              <Route path='/add-education' element={<PrivateRoute>
                <AddEducation />
              </PrivateRoute>} />
              <Route path='/posts' element={<PrivateRoute>
                <Posts />
              </PrivateRoute>} />
              <Route path='/posts/:id' element={<PrivateRoute>
                <Post />
              </PrivateRoute>} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </>
        </Router>
      </Provider>
  )
}

export default App;
