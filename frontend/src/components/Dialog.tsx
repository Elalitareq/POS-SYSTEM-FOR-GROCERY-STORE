import { styled } from "@mui/system";
import { Modal as BaseModal, Fade } from "@mui/material";
import { Box, Button } from "@mui/material";

interface ModalProps {
    openModel: boolean;
    setConfirmation?: (value: boolean) => void;
    textButtonSubmite?: string;
    onClick?: (e: any) => any;
    bodyModal?: string;
    handleCloseModal: () => void;
    headerTextOfTheModal?: string;
}

const StyledGridContainer = styled(Box)`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
`;

function Dialog({
    openModel,
    handleCloseModal,
    onClick,
    bodyModal,
    textButtonSubmite,
    headerTextOfTheModal,
}: ModalProps) {
    return (
        <div>
            <BaseModal
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModel}
                onClose={handleCloseModal}
                closeAfterTransition
            >
                <Fade in={openModel}>
                    <Box
                        component="form"
                        sx={{
                            padding: "20px",
                            width: "380px",
                            background: "white",
                            borderRadius: "10px",
                        }}
                    >
                        <Box
                            sx={{
                                color: "primary.main",
                                paddingY: "1rem",
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                            }}
                        >
                            {headerTextOfTheModal}
                        </Box>{" "}
                        {bodyModal}
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                gap: "20px",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                onClick={onClick}
                                variant="contained"
                                sx={{ marginTop: "20px", p: 1 }}
                                type="submit"
                            >
                                أوافق
                            </Button>
                            <Button
                                onClick={handleCloseModal}
                                variant="outlined"
                                sx={{ marginTop: "20px", p: 1 }}
                            >
                                لا أوافق
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </BaseModal>
        </div>
    );
}

export default Dialog;
