import './App.css'
import Register from './pages/Register'
import Login from './pages/LOgin'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AuthGuard from './auth/AuthGuard'
import Dashboard from './pages/Dashboard'

const DefaultRoute = () => {
  const loginData = JSON.parse(localStorage.getItem('loginData'));
  if(loginData){
    return <Navigate to="/dashboard" replace/>
  }
  return <Navigate to="/login" replace/>
}

function App() {
  const router =createBrowserRouter([

    {
      path: "/",
      element: <DefaultRoute/>
    },
    {
      path: "/login",
      element:
        <AuthGuard required ={false}><Login /></AuthGuard>
    },
    {
      path: "/register",
      element:
        <AuthGuard required ={false}><Register /></AuthGuard>
    },
    {
      path: "/dashboard",
      element:
        <AuthGuard required ={true}><Dashboard /></AuthGuard>
    }
  ])

  return <RouterProvider router={router}/>
}

export default App
