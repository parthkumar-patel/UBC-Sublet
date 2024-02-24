import Navbar from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';
import Account from './pages/Account';
import Home from './pages/Home';
import Signin from './pages/SignIn';
import './App.css'

export default function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route
          path='/account'
          element={
            <Protected>
              <Account />
            </Protected>
          }
        />
      </Routes>
    </AuthContextProvider>
  )
}