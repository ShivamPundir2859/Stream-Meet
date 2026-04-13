import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';

function App() {

  return (
    <AuthProvider>
      <div className='App'>
        <Router>
          <Routes>
            <Route path='' element={<LandingPage/>}/>
            <Route path='/auth' element={<Authentication />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App
