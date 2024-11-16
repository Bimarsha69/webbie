import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import { User, Project } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching projects from an API
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockProjects: Project[] = [
          { id: 1, name: 'Project 1', code: '// Project 1 code' },
          { id: 2, name: 'Project 2', code: '// Project 2 code' },
          { id: 3, name: 'Project 3', code: '// Project 3 code' },
        ];
        setProjects(mockProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock login functionality
    setUser({ id: 1, name: 'John Doe', email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSaveCode = (projectId: number, code: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, code } : project
      )
    );
    alert('Code saved successfully!');
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-100">
          <Navigation isLoggedIn={!!user} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                user ? (
                  <Dashboard 
                    projects={projects} 
                    onSaveCode={handleSaveCode} 
                    isLoading={isLoading}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
