import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { api } from "../../config/axios";

const LoginPage = (): JSX.Element => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ errors: [] });

  const navigate = useNavigate();

  const onFieldChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  const loginHandler = async () => {
    try {
      const {
        data: { token, email },
      } = await api.post("/api/auth/login", login);

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      navigate("/jobs");
    } catch (error: any) {
      const errors = error.response.data.errors;
      setErrors({ errors });
    }
  };

  return (
    <div>
      <input placeholder="Email..." name="email" onChange={onFieldChange} />
      <input
        placeholder="Password..."
        name="password"
        onChange={onFieldChange}
        type="password"
      />
      <button onClick={loginHandler}>login</button>

      {(errors as any).errors.map((error: string) => (
        <p style={{ color: "red" }}>{error}</p>
      ))}

      <NavLink to="/register">register</NavLink>
    </div>
  );
};

export default LoginPage;
