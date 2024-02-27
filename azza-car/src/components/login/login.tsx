import React, { useState } from "react";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  //Variable hooks to set the data entered by the user
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  /**
   * The function `handleLogin` checks if the provided username and password are correct and redirects
   * to the dashboard if successful.
   */
  const handleLogin = () => {
    if (username === "1" && password === "1") {
      //Successful authentication
      setError("");
      router.push("/dashboard");
    } else {
      // Authentication failed
      setError("Usuario o contraseña incorrectos");
    }
  };

  /* The `return` statement in the `LoginForm` component is rendering the JSX (JavaScript XML) code
  that represents the login form interface. Here's a breakdown of what the JSX code is doing: */
  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="button" onClick={handleLogin}>
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
