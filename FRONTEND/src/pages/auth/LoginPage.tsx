import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { authAPI } from '../../api/auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(email, password);

      // Verificar que la respuesta tenga la estructura esperada
      if (!response.data || !response.data.data || !response.data.data.user || !response.data.data.accessToken) {
        setError('Error en la respuesta del servidor. Inténtalo más tarde.');
        setLoading(false);
        return;
      }

      const { user, accessToken: token } = response.data.data;

      login(user, token);

      // Redirigir según el rol
      if (user?.role === 'ADMIN') {
        navigate('/admin/lessons');
      } else {
        navigate('/user/lessons');
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        // Traducir mensajes de error del backend
        if (typeof err.response.data.message === 'string') {
          if (err.response.data.message.includes('Invalid credentials')) {
            setError('Credenciales inválidas. Inténtalo de nuevo.');
          } else {
            setError(err.response.data.message);
          }
        } else {
          setError('Error en la solicitud. Verifica tus datos.');
        }
      } else if (err.response?.status === 401) {
        setError('Credenciales inválidas. Inténtalo de nuevo.');
      } else {
        setError('Error de conexión. Inténtalo más tarde.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-indigo-500 to-indigo-700 px-4">
  
  ```
  <div className="max-w-md w-full">
  
    {/* Card */}
    <div className="bg-white rounded-2xl shadow-xl p-8">
  
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">
          ListenUp English
        </h1>
        <p className="text-gray-500 mt-2">
          Aprende inglés de forma inteligente
        </p>
      </div>
  
      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
  
      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
  
        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            placeholder="tu@email.com"
          />
        </div>
  
        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Contraseña
          </label>
  
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10 transition"
              placeholder="••••••••"
            />
  
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-indigo-600"
            >
              👁
            </button>
          </div>
        </div>
  
        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 disabled:opacity-50 shadow-md"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
  
      </form>
  
      {/* Register */}
      <div className="text-center mt-6">
        <span className="text-gray-500 text-sm">
          ¿No tienes cuenta?
        </span>
        <a
          href="/register"
          className="ml-1 text-indigo-600 font-semibold hover:underline"
        >
          Regístrate
        </a>
      </div>
  
    </div>
  
    {/* Footer */}
    <p className="text-center text-indigo-100 text-sm mt-4">
      Improve your future learning English!
    </p>
  
  </div>
    </div>  
  );
};

export default LoginPage;