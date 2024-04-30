import { useState } from "react";
import Form from "../../components/form/Form";

function AddUser() {
    const [addData, setAddData] = useState({});
    console.log(addData);

    const fields = [
        {
            label: "Email",
            name: "email",
            inputType: "email",
            require: true,
        },
        {
            label: "Password",
            name: "password",
            inputType: "password",
            require: true,
        },
        {
            label: "Role",
            name: "role",
            inputType: "radio",
            options: ["SUPERADMIN", "ADMIN", "EMPLOYEE"],

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
            <Form
                fields={fields}
                setAddData={setAddData}
                textButtonSubmite="Add User"
            />
        </>
    );
}

export default AddUser;
