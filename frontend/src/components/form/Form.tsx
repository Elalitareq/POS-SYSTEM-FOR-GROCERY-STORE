import {
    Box,
    Button,
    Checkbox,
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
    setAddData?: any;
    textButtonSubmite: string;
}

interface Fields {
    label: string;
    name: string;
    inputType: string;
    placeHolder?: string;
    selectedValue?: string;
    options?: any;
    require?: boolean;
}

function Form({ fields, setAddData, textButtonSubmite }: FieldsProps) {
    function handleChangeData(e: any) {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            setAddData((previous: any) => ({
                ...previous,
                [name]: file,
            }));
        } else {
            setAddData((previous: any) => ({
                ...previous,
                [name]: value,
            }));
        }
    }

    function inputMapping() {
        return fields.map((field, index) => {
            if (field.inputType === "text") {
                return (
                    <div key={index}>
                        <FormLabel>{field.label}</FormLabel>
                        <TextField
                            onChange={(e) => handleChangeData(e)}
                            type={field.inputType}
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
            if (field.inputType === "number") {
                return (
                    <div key={index}>
                        <FormLabel>{field.label}</FormLabel>
                        <TextField
                            onChange={(e) => handleChangeData(e)}
                            type={field.inputType}
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
            if (field.inputType === "date") {
                return (
                    <div key={index}>
                        <FormLabel>{field.label}</FormLabel>
                        <TextField
                            onChange={(e) => handleChangeData(e)}
                            type={field.inputType}
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
                            onChange={(e) => handleChangeData(e)}
                            type={field.inputType}
                            name={field.name}
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
                    <FormGroup key={index}>
                        <FormLabel>{field.label}</FormLabel>
                        {!field.options && (
                            <Checkbox
                                name={field.name}
                                onChange={(e) => handleChangeData(e)}
                                sx={{ width: "max-content" }}
                            />
                        )}
                        {field.options?.map((option: any, index: number) => (
                            <FormControlLabel
                                onChange={(e) => handleChangeData(e)}
                                name={field.name}
                                key={index}
                                control={<Checkbox />}
                                label={option}
                            />
                        ))}
                    </FormGroup>
                );
            }
            if (field.inputType === "radio") {
                return (
                    <FormGroup key={index}>
                        <FormLabel>{field.label}</FormLabel>
                        <RadioGroup
                            onChange={(e) => handleChangeData(e)}
                            defaultValue={field.options[0]}
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
                    <FormGroup key={index}>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                            value={field.selectedValue}
                            onChange={(e) => handleChangeData(e)}
                            name={field.name}
                        >
                            {field.options?.map(
                                (option: any, index: number) => (
                                    <MenuItem key={index} value={option}>
                                        {option}{" "}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormGroup>
                );
            }

            // Remember to handle other types of input fields if needed
            return null;
        });
    }

    return (
        <form style={{ padding: 10 }}>
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
                >{textButtonSubmite}</Button>
            </Box>
        </form>
    );
}

export default Form;
