import { lazy } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import AppLayout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Fallback from './components/Fallback';

import 'antd/dist/reset.css';
import './App.css';
import Home from './pages/Home';
import { useAuth } from './context/AuthProvider';

const Login = lazy(() => import('#/pages/Login'));
const Register = lazy(() => import('#/pages/Register'));
const PostDetails = lazy(() => import('#/pages/PostDetails'));
const CreatePost = lazy(() => import('#/pages/CreatePost'));
const Posts = lazy(() => import('#/pages/Posts'));

function App() {
  const navigate = useNavigate();
  const {
    auth: { accessToken }
  } = useAuth();
  const isLoggedIn = Boolean(accessToken);

  return (
    <ErrorBoundary FallbackComponent={Fallback} onReset={() => navigate('/')}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='posts'>
            <Route index element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Posts />} />} />
            <Route
              path=':postId'
              element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<PostDetails />} />}
            />
          </Route>
          <Route
            path='createPost'
            element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<CreatePost />} />}
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
