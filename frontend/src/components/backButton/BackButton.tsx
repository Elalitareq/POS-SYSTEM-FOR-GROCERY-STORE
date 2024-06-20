import { ArrowForward } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Button onClick={goBack}>
      <ArrowForward color="primary" />
    </Button>
  );
}

export default BackButton;
