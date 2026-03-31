// Main App Component - Root of the application
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/index.css';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import FitnessPage from './pages/FitnessPage';
import NutritionPage from './pages/NutritionPage';
import PeriodPage from './pages/PeriodPage';
import ChatbotPage from './pages/ChatbotPage';
import SkinAnalysisPage from './pages/SkinAnalysisPage';
import ProfilePage from './pages/ProfilePage';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Layout Component for authenticated pages
const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return children;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/signup" element={<Layout><SignupPage /></Layout>} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/fitness"
            element={
              <ProtectedRoute>
                <Layout><FitnessPage /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nutrition"
            element={
              <ProtectedRoute>
                <Layout><NutritionPage /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/period"
            element={
              <ProtectedRoute>
                <Layout><PeriodPage /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <Layout><ChatbotPage /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/skin-analysis"
            element={
              <ProtectedRoute>
                <Layout><SkinAnalysisPage /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout><ProfilePage /></Layout>
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
