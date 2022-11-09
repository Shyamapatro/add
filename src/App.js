import {
  Login,
  Dashboard,
  AddPost,
  Section,
  Category,
  Users,
  Settings,
  Posts,
  EditPost
} from './Pages/Index'
import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import { useSelector } from 'react-redux';
import SelectBox from './test/selectBox';
import Helmet from 'react-helmet';


const App = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { data } = useSelector(state => state.settings);
  const { admin_title, favicon, description } = data;
  const { loading } = useLoadingWithRefresh();
  return loading ? (<div className='flex items-center justify-center h-screen'>Loading...</div>) : (
    <>
      <Helmet>
        <title>{admin_title}</title>
        <meta charset="utf-8" />
        <link rel="icon" href={favicon ? favicon : ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={description} />
        <link rel="apple-touch-icon" href={favicon ? favicon : ''} />
      </Helmet>
      <div>
        <Toaster position='top-right' />
      </div>
      <BrowserRouter>
        <Routes>
          {!isAuthenticated && <Route path="/" element={<Login />} />}
          {isAuthenticated && user.role === 'admin' && <Route path="/admin/dashboard" element={<Dashboard />} />}
          {isAuthenticated && user.role === 'admin' && <Route path="/admin/posts" element={<Posts />} />}
          {isAuthenticated && user.role === 'admin' && <Route path="/admin/add-post" element={<AddPost />} />}
          {isAuthenticated && user.role === 'admin' && <Route path="/admin/edit-post/:id" element={<EditPost />} />}
          {isAuthenticated && user.role === 'admin' && <Route path="/admin/sections" element={<Section />} />}
          {isAuthenticated && user.role === 'admin' && <Route path="/admin/categories" element={<Category />} />}
          {isAuthenticated && user.role === 'admin' && <Route path="/admin/users" element={<Users />} />}
          {isAuthenticated && user.role === 'admin' && <Route path="/admin/settings" element={<Settings />} />}
          <Route path="*" element={<Navigate to={isAuthenticated ? user.role === 'admin' ? "/admin/dashboard" : "/" : "/"} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
