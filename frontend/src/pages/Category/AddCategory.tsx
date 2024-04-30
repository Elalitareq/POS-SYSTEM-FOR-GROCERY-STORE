import { useState } from "react";
import Form from "../../components/form/Form";
function AddCategory() {
    const [addData, setAddData] = useState({});
    console.log(addData);

    const fields = [
        {
            label: "Name",
            name: "name",
            inputType: "text",
            require: true,
        },
        { label: "Age", name: "age", inputType: "number", require: true },
        {
            label: "Is student",
            name: "IsStudent",
            inputType: "checkbox",
            options: ["Male", "Female", "Other"],

            require: false,
        },
        {
            label: "Gender",

            name: "gender",
            inputType: "radio",
            options: ["Male", "Female", "Other"],
            require: true,
        },
        {
            label: "Country",
            selectedValue: "USA",
            name: "country",
            inputType: "select",
            options: ["USA", "Canada", "UK", "Australia"],
            require: false,
        },
        {
            label: "Date",
            name: "date",
            inputType: "date",
            require: true,
        },
        {
            label: "file/image",
            name: "image",
            inputType: "file",
            require: true,
        },
    ];

    return (
        <>
            {" "}
            <Form fields={fields} setAddData={setAddData}  textButtonSubmite="Add Category"/>
        </>
    );
}

export default AddCategory;
