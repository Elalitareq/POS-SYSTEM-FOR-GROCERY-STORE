import * as React from "react";
import { styled } from "@mui/system";
import { Modal as BaseModal, Fade } from "@mui/material";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Box,
    Button,
    TextField,
} from "@mui/material";

interface ModalProps {
    openModel: boolean;
    fields: Fields[];
    setData?: any;
    textButtonSubmite?: string;
    onSubmit?: any;
    handleCloseModal?: any;
    headerTextOfTheModal?: string;
}

interface Fields {
    label: string;
    name: string;
    inputType: string;
    placeHolder?: string;
    selectedValue?: any;
    options?: any;
    value?: any;
    require?: boolean;
}

const StyledGridContainer = styled(Box)`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
`;

export default function TransitionsModal({
    openModel,
    handleCloseModal,
    fields,
    setData,
    textButtonSubmite,
    onSubmit,
    headerTextOfTheModal,
}: ModalProps) {
    function handleChangeData(e: any) {
        const { name, value, files, type } = e.target;
        if (files) {
            const file = files[0];
            setData((previous: any) => ({
                ...previous,
                [name]: file,
            }));
        } else if (type === "number") {
            setData((previous: any) => ({
                ...previous,
                [name]: parseFloat(value),
            }));
        } else if (type === "datetime-local") {
            let dateFormat = value.split(" ");
            dateFormat.push(":00.213Z");
            let iso8601Date = dateFormat.join("");
            console.log(iso8601Date);
            setData((previous: any) => ({
                ...previous,
                [name]: iso8601Date,
            }));
        } else {
            setData((previous: any) => ({
                ...previous,
                [name]: value,
            }));
        }
    }

    function inputMapping() {
        return fields.map((field, index) => {
            if (
                ["text", "email", "password", "number"].includes(
                    field.inputType
                )
            ) {
                return (
                    <TextField
                        onChange={(e) => handleChangeData(e)}
                        type={field.inputType}
                        name={field.name}
                        value={field.value}
                        placeholder={field.placeHolder}
                        key={index}
                        id="outlined-basic"
                        variant="outlined"
                        sx={{ width: "100%" }}
                        label={field.label}
                        size="small"
                    />
                );
            }

            if (field.inputType === "datetime-local") {
                return (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "16px",
                        }}
                    >
                        <FormLabel>{field.label}</FormLabel>
                        <input
                            // size="small"
                            onChange={(e) => handleChangeData(e)}
                            type={field.inputType}
                            value={field.value}
                            name={field.name}
                            placeholder={field.placeHolder}
                            key={index}
                            id="outlined-basic"
                            // variant="outlined"
                            style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #bdbdbd",
                                borderRadius: "4px",
                                boxSizing: "border-box",
                                marginTop: "8px",
                                outline: "none",
                                fontFamily: "inherit",
                                fontSize: "inherit",
                                lineHeight: "inherit",
                            }}
                        />
                    </div>
                );
            }
            if (field.inputType === "date") {
                return (
                    <div>
                        <FormLabel>{field.label}</FormLabel>
                        <TextField
                            size="small"
                            onChange={(e) => handleChangeData(e)}
                            type={field.inputType}
                            value={field.value}
                            name={field.name}
                            placeholder={field.placeHolder}
                            key={index}
                            id="outlined-basic"
                            variant="outlined"
                        />
                    </div>
                );
            }
            if (field.inputType === "file") {
                return (
                    <div key={index}>
                        <FormLabel>{field.label}</FormLabel>
                        <TextField
                            size="small"
                            onChange={(e: any) => handleChangeData(e)}
                            type={field.inputType}
                            name={field.name}
                            // value={field.value}
                            key={index}
                            id="outlined-basic"
                            variant="outlined"
                            sx={{ width: "100%" }}
                        />
                    </div>
                );
            }
            if (field.inputType === "checkbox") {
                return (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                size="small"
                                name={field.name}
                                onChange={(e) => handleChangeData(e)}
                                sx={{ width: "max-content" }}
                            />
                        }
                        label={field.label}
                    />
                );
            }
            if (field.inputType === "radio") {
                return (
                    <FormGroup key={index}>
                        <FormLabel>{field.label}</FormLabel>
                        <RadioGroup
                            onChange={(e) => handleChangeData(e)}
                            defaultValue={field.options[0] || field.value}
                            name={field.name}
                        >
                            {field.options?.map(
                                (option: any, index: number) => (
                                    <FormControlLabel
                                        key={index}
                                        control={<Radio />}
                                        label={option}
                                        value={option}
                                    />
                                )
                            )}
                        </RadioGroup>
                    </FormGroup>
                );
            }
            if (field.inputType === "select") {
                return (
                    <FormControl key={index}>
                        <InputLabel size="small" id={field.label}>
                            {field.label}
                        </InputLabel>
                        <Select
                            size="small"
                            labelId={field.label}
                            value={field.selectedValue}
                            onChange={(e) => handleChangeData(e)}
                            name={field.name}
                            label={field.label}
                        >
                            {field.options?.map(
                                (
                                    option: { title: string; value: any },
                                    index: number
                                ) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.title}{" "}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                );
            }

            // Remember to handle other types of input fields if needed
            return null;
        });
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModel}
                onClose={handleCloseModal}
                closeAfterTransition
                // BackdropComponent={StyledBackdrop}
            >
                <Fade in={openModel}>
                    <Box
                        component="form"
                        sx={{
                            padding: "20px",
                            minWidth: "380px",
                            background: "white",
                            borderRadius: "10px",
                        }}
                        onSubmit={onSubmit}
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
                        <StyledGridContainer>
                            {inputMapping()}
                        </StyledGridContainer>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{ marginTop: "20px", p: 1.5 }}
                                type="submit"
                            >
                                {textButtonSubmite}
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

const blue = {
    200: "#99CCFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0066CC",
};

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// const StyledBackdrop = styled(Backdrop)`
//     background-color: rgb(0 0 0 / 0.5);
// `;

// const style = {
//     position: "absolute" as "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
// };

// const ModalContent = styled("div")(
//     ({ theme }) => `
//         font-family: "IBM Plex Sans", sans-serif;
//         font-weight: 500;
//         text-align: start;
//         position: relative;
//         display: flex;
//         flex-direction: column;
//         gap: 8px;
//         overflow: hidden;
//         background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//         border-radius: 8px;
//         border: 1px solid ${
//             theme.palette.mode === "dark" ? grey[700] : grey[200]
//         };
//         box-shadow: 0 4px 12px ${
//             theme.palette.mode === "dark"
//                 ? "rgb(0 0 0 / 0.5)"
//                 : "rgb(0 0 0 / 0.2)"
//         };
//         padding: 24px;
//         color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

//         & .modal-title {
//             margin: 0;
//             line-height: 1.5rem;
//             margin-bottom: 8px;
//         }

//         & .modal-description {
//             margin: 0;
//             line-height: 1.5rem;
//             font-weight: 400;
//             color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
//             margin-bottom: 4px;
//         }
//     `
// );

export const TriggerButton = styled(Button)(
    ({ theme }) => `
        font-family: "IBM Plex Sans", sans-serif;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 1.5;
        padding: 8px 16px;
        border-radius: 8px;
        transition: all 150ms ease;
        cursor: pointer;
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${
            theme.palette.mode === "dark" ? grey[700] : grey[200]
        };
        color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

        &:hover {
            background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
            border-color: ${
                theme.palette.mode === "dark" ? grey[600] : grey[300]
            };
        }

        &:active {
            background: ${
                theme.palette.mode === "dark" ? grey[700] : grey[100]
            };
        }

        &:focus-visible {
            box-shadow: 0 0 0 4px ${
                theme.palette.mode === "dark" ? blue[300] : blue[200]
            };
            outline: none;
        }
    `
);
