import { useNavigate } from "react-router-dom";

export const GoBackButton = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  };

  return <button onClick={goBackHandler}>go back</button>;
};
