
import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { authAPI } from '../../api/auth';

const RegisterPage: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);
    setError('');

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    if (password.length > 20) {
      setError('La contraseña debe tener máximo 20 caracteres');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {

      const response = await authAPI.register(email, password);

      if (!response.data?.data?.user || !response.data?.data?.accessToken) {
        setError('Error en la respuesta del servidor');
        setLoading(false);
        return;
      }

      const { user, accessToken } = response.data.data;

      login(user, accessToken);

      setSuccess(true);

      setTimeout(() => {
        navigate('/user/lessons');
      }, 1500);

    } catch (err: any) {

      if (err.response?.data?.message?.includes('already exists')) {
        setError('Ya existe un usuario con este correo');
      } else {
        setError('Error al registrarse');
      }

      console.error(err);

    } finally {
      setLoading(false);
    }

  };

  if (success) {
    return (

      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-blue-50">

        <div className="bg-white p-10 rounded-xl shadow-lg text-center">

          <div className="text-5xl mb-4">🎉</div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Registro exitoso
          </h2>

          <p className="text-gray-600">
            Redirigiendo a tus lecciones...
          </p>

        </div>

      </div>

    );
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-blue-50 px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">

        {/* logo / title */}

        <div className="text-center mb-6">

          <h1 className="text-3xl font-bold text-indigo-600 mb-2">
            ListenUp English
          </h1>

          <p className="text-gray-600">
            Crea tu cuenta para comenzar
          </p>

        </div>

        {/* error */}

        {error && (

          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>

        )}

        {/* form */}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* email */}

          <input
            type="email"
            required
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              px-4 py-3
              border border-gray-300
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
              transition
            "
          />

          {/* password */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {

                const value = e.target.value;

                setPassword(value);

                if (value.length > 0 && value.length < 6)
                  setPasswordError('Mínimo 6 caracteres');
                else if (value.length > 20)
                  setPasswordError('Máximo 20 caracteres');
                else
                  setPasswordError('');

              }}
              className={`
                w-full px-4 py-3 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition
                ${passwordError ? "border-red-400" : "border-gray-300"}
              `}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              👁
            </button>

          </div>

          {passwordError && (
            <div className="text-red-500 text-sm">
              {passwordError}
            </div>
          )}

          {/* confirm password */}

          <div className="relative">

            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="
                w-full px-4 py-3 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition
              "
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              👁
            </button>

          </div>

          {/* button */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3
              bg-indigo-600
              text-white
              font-semibold
              rounded-lg
              hover:bg-indigo-700
              active:scale-[0.98]
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

        </form>

        {/* login link */}

        <div className="text-center mt-6 text-sm text-gray-600">

          ¿Ya tienes cuenta?

          <Link
            to="/login"
            className="text-indigo-600 font-semibold ml-1 hover:underline"
          >
            Inicia sesión
          </Link>

        </div>

      </div>

    </div>

  );

};

export default RegisterPage;