import { DeleteOutline } from "@mui/icons-material";
import { Box } from "@mui/material";

// interface DeleteProps {
//     onClick: () => void;
// }

function Delete() {
    return (
        <Box  sx={{ color: "gray" }}>
            <DeleteOutline />
        </Box>
    );
}

export default Delete;
