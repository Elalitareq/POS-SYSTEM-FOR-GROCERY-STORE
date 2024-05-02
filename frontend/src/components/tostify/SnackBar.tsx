import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface SnakBarProps {
    open: boolean;
    setOpen: any;
    message: string;
    severity?: any;
}


export default function CustomizedSnackbars({
    open,
    setOpen,
    message,
    severity,
}: SnakBarProps) {
    // const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setOpen((prev: any) => ({ ...prev, open: false }));
        }, 6000);
    }, [open]);

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                autoHideDuration={6000}
            >
                <Alert
                    severity={severity || "success"}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
