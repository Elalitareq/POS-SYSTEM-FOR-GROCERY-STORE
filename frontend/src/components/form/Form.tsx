import {
    Box,
    Button,
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
    TextField,
} from "@mui/material";
import styled from "styled-components";
import { devices } from "../../components/styled/responisve.styled";

const StyledGridContainer = styled(Box)`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    @media ${devices.laptop} {
        grid-template-columns: 1fr 1fr;
    }
    @media ${devices.laptopL} {
        grid-template-columns: 1fr 1fr;
    }
    @media ${devices.desktop} {
        grid-template-columns: 1fr 1fr;
    }
`;

interface FieldsProps {
    fields: Fields[];
    setData?: any;
    textButtonSubmite: string;
    onSubmit?: any;
}

interface Fields {
    label: string;
    name: string;
    inputType: string;
    placeHolder?: string;
    selectedValue?: string;
    options?: any;
    value?: any;
    require?: boolean;
}

function Form({ fields, setData, textButtonSubmite, onSubmit }: FieldsProps) {
    function handleChangeData(e: any) {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            setData((previous: any) => ({
                ...previous,
                [name]: file,
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

            if (field.inputType === "date") {
                return (
                    <div key={index}>
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
                            sx={{ width: "100%" }}
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
                            onChange={(e) => handleChangeData(e)}
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
        <Box component="form" sx={{ padding: "10px" }} onSubmit={onSubmit}>
            <Box sx={{ minHeight: "600px" }}>
                <StyledGridContainer>{inputMapping()}</StyledGridContainer>
            </Box>
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
    );
}

export default Form;
