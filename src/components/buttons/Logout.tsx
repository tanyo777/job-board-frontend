import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <Button
      onClick={logoutHandler}
      variant="contained"
      sx={{ backgroundColor: "skyblue" }}
    >
      logout
    </Button>
  );
};

export default Logout;
