import { useState } from "react";
import Form from "../../components/form/Form";

function AddUser() {
  const [addData, setAddData] = useState({
    email: "",
    password: "",
    password1: "",
    role: "EMPLOYEE",
  });
  console.log(addData);

  const fields = [
    {
      label: "البريد الالكتروني",
      name: "email",
      inputType: "email",
      require: true,
    },
    {
      label: "كلمة المرور",
      name: "password",
      inputType: "text",
      require: true,
    },
    {
      label: "تأكيد كلمة المرور",
      name: "password1",
      inputType: "text",
      require: true,
    },
    {
      label: "الصلاحية",
      name: "role",
      inputType: "select",
      options: [
        { title: "موظف", value: "EMPLOYEE" },
        { title: "مدير", value: "ADMIN" },
      ],

      require: false,
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
