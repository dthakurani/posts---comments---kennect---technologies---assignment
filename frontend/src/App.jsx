import { lazy } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import AppLayout from './components/Layout';
import Fallback from './components/Fallback';

import 'antd/dist/reset.css';
import './App.css';
import Home from './pages/Home';

const Login = lazy(() => import('#/pages/Login'));
const Register = lazy(() => import('#/pages/Register'));

function App() {
  const navigate = useNavigate();

  return (
    <ErrorBoundary FallbackComponent={Fallback} onReset={() => navigate('/')}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
