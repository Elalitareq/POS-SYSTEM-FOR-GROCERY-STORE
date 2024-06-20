import { useState } from "react";
import Form from "../../components/form/Form";
import { addUser } from "../../utils/apisRequest";
import BackButton from "../../components/backButton/BackButton";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

function AddUser() {
  const Auth = useAuthHeader();
  const [addData, setAddData] = useState({
    userName: "",
    password: "",
    password2: "",
    role: "EMPLOYEE",
  });

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      if (!addData.userName || !addData.password || !addData.password2) {
        enqueueSnackbar({
          message: "الرجاء تعبئت جميع الحقول .",
          variant: "error",
        });
      } else if (addData.password !== addData.password2) {
        enqueueSnackbar({
          message: "الرجاء التأكد من جيمع كلمات المرور .",
          variant: "error",
        });
      } else {
        const dataAdded = await addUser(addData, Auth);
        if (dataAdded.status === 403) {
          enqueueSnackbar({
            message: "ليس مسموح لك باﻹضافة .",
            variant: "info",
          });
        } else {
          enqueueSnackbar({
            message: "تم ﻹنشاء بنجاح .",
            variant: "success",
          });
          navigate(-1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fields = [
    {
      label: "اسم المستخدم",
      name: "userName",
      inputType: "userName",
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
      name: "password2",
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
      <BackButton />{" "}
      <Form
        fields={fields}
        setData={setAddData}
        textButtonSubmite="إضافة مستخدم"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default AddUser;
