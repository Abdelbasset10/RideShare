import { useAuth } from "../hooks/auth/useAuth";

const Login = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
      login({
        username: 'kminchelle',
        password: '0lelplR',
    });

    
  };

  return (
    <div>
      <h1>Login</h1>
      <button className="px-3 py-1.5 bg-red-400 rounded-xl text-white" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;