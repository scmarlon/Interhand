import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetUsersList } from "@/utils/queries";

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
  const handleLogin = async () => {
    if (username === "1" && password === "1") {
      localStorage.setItem("usuario", username);
      //Successful authentication
      setError("");
      router.push("/dashboard");
    } else {
      const users = await GetUsersList();
      users.map((user: any) => {
        if (user.userMail === username && user.password === password) {
          localStorage.setItem("usuario", username);
          router.push("/dashboard");
        }
      });
      // Authentication failed
      setError("Usuario o contraseña incorrectos");
    }
  };

  /* The `return` statement in the `LoginForm` component is rendering the JSX (JavaScript XML) code
  that represents the login form interface. Here's a breakdown of what the JSX code is doing: */
  return (
    <div className="container mx-auto">
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
