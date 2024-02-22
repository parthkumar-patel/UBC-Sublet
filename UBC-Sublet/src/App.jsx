import Navbar from './components/Nav';
// import Auth from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';
import Account from './pages/Account';
import Home from './pages/Home';
import Signin from './pages/SignIn';
import './App.css'

export default function App() {
  return (
      // <div className="app--container"> 
      //     <Auth />
      // </div>
      <div>
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
    </div>
  )
}