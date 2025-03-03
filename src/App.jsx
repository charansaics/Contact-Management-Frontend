import LandingPage from './pages/LandingPage.jsx';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import EditContact from './pages/editcon.jsx';
import Home from './pages/Home.jsx';
import RegistrationPage from './pages/register.jsx';
import AddContactac from './pages/addContact.jsx';

function App() {
    const isAuthenticated = () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        return !!accessToken && !!refreshToken;
    };

    const ProtectedRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/" />;
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/edit" element={<ProtectedRoute><EditContact /></ProtectedRoute>} />
                <Route path="/add" element={<ProtectedRoute><AddContactac /></ProtectedRoute>} />
                <Route path="/register" element={<RegistrationPage />} />
            </Routes>
        </div>
    );
}

export default App;