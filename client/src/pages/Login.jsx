import { hash } from "bcryptjs";
import { useAuth } from "../hooks/auth/useAuth";

const Login = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
     hash("password123",2).then((hash) => {
      login({
        email: "ramzi.issiakhem@gmail.com",
        password: hash,
      });  
    });

    
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
