import { Navigate } from "react-router-dom";

const Protected = ({ children }: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/"} replace />;
  } else {
    return children;
  }
};

export default Protected;
