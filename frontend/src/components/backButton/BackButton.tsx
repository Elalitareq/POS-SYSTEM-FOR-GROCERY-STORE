import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
    navigatePath: string;
}

function BackButton({ navigatePath }: BackButtonProps) {
    const navigate = useNavigate();
    return (
        <Button
            sx={{
                position: "absolute",
                top: "15px",
                right: "10px",
                zIndex: 10000,
            }}
            onClick={() => navigate(navigatePath)}
        >
            <ArrowBack sx={{ color: "white" }} />
        </Button>
    );
}

export default BackButton;
