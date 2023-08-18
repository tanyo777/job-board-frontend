import { NavLink } from "react-router-dom";

const RegisterPage = (): JSX.Element => {
  return (
    <div>
      <input placeholder="Firstname..." />
      <input placeholder="Lastname..." />
      <input placeholder="Email..." />
      <input placeholder="Password..." />
      <input placeholder="Confirm password..." />
      <button>register</button>
      <NavLink to="/">login</NavLink>
    </div>
  );
};

export default RegisterPage;
