import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import { UserProvider } from "./Context/UserContext";
import { SettingsProvider } from "./Context/SettingsContext";
import { AuthProvider } from "./Context/AuthContext";

import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import ErrorBoundary from "./Components/ErrorBoundary";

import Login from "./Pages/Login";
import UsersList from "./Pages/UsersList";
import AddUser from "./Pages/AddUser";
import UserDetails from "./Pages/UserDetails";
import UserCharts from "./Pages/UserCharts";
import UserSettingsPage from "./Pages/Settings";
import NotFound from "./Pages/NotFound";
import Posts from "./Pages/Posts";
import PostsPerUser from "./Pages/PostsPerUser";
import PostsChart from "./Components/Charts/PostsChart";







function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ErrorBoundary> {/* ✅ Moved outside Router to catch routing errors */}
        <AuthProvider>
          <SettingsProvider>
            <UserProvider>
              <Router>
                <div className="min-h-screen bg-slate-50 font-sans antialiased">
                  <Navbar />
                  <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
<Route path="/posts" element={<Posts />} />
<Route path="/user-posts" element={<PostsPerUser />} />
<Route path="/posts-chart" element={<ProtectedRoute><PostsChart /></ProtectedRoute>} />            
            
                        {/* Protected Routes */}
                        <Route
                          path="/"
                          element={
                            <ProtectedRoute>
                              <UsersList />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/add-user"
                          element={
                            <ProtectedRoute>
                              <AddUser />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/user/:id"
                          element={
                            <ProtectedRoute>
                              <UserDetails />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/charts"
                          element={
                            <ProtectedRoute>
                              <UserCharts />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/settings"
                          element={
                            <ProtectedRoute>
                              <UserSettingsPage />
                            </ProtectedRoute>
                          }
                        />

                        {/* 404 Catch-all */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </main>
                </div>
              </Router>
            </UserProvider>
          </SettingsProvider>
        </AuthProvider>
      </ErrorBoundary>
    </I18nextProvider>
  );
}

export default App;