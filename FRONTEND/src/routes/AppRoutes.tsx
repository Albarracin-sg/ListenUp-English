import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import LessonsPage from '../pages/user/LessonsPage';
import LessonDetailPage from '../pages/user/LessonDetailPage';
import ProgressPage from '../pages/user/ProgressPage';
import VocabularyPage from '../pages/user/VocabularyPage';
import AdminLessonsPage from '../pages/admin/AdminLessonsPage';
import CreateLessonPage from '../pages/admin/CreateLessonPage';
import EditLessonPage from '../pages/admin/EditLessonPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Navigate to="/user/lessons" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas protegidas para usuarios */}
      <Route 
        path="/user/lessons" 
        element={
          <ProtectedRoute>
            <LessonsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/lessons/:id" 
        element={
          <ProtectedRoute>
            <LessonDetailPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/progress" 
        element={
          <ProtectedRoute>
            <ProgressPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/vocabulary" 
        element={
          <ProtectedRoute>
            <VocabularyPage />
          </ProtectedRoute>
        } 
      />

      {/* Rutas protegidas para administradores */}
      <Route 
        path="/admin/lessons" 
        element={
          <AdminRoute>
            <AdminLessonsPage />
          </AdminRoute>
        } 
      />
      <Route 
        path="/admin/lessons/create" 
        element={
          <AdminRoute>
            <CreateLessonPage />
          </AdminRoute>
        } 
      />
      <Route 
        path="/admin/lessons/:id/edit" 
        element={
          <AdminRoute>
            <EditLessonPage />
          </AdminRoute>
        } 
      />

      {/* Ruta 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
