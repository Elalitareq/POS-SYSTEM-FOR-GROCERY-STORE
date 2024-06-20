import { useEffect, useState } from "react";
import Form from "../../components/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderContext } from "../../layout";
import { useContext } from "react";
import { getUserById, modifyUser } from "../../utils/apisRequest";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import BackButton from "../../components/backButton/BackButton";
import { enqueueSnackbar } from "notistack";

function EditUser() {
  const { id } = useParams();

  const isLoad = useContext(LoaderContext);
  const Auth = useAuthHeader();

  const [editData, setEditData] = useState({
    userName: "",
    password: null,
    password2: null,
    role: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        isLoad?.setLoad(true);
        const users: any = await getUserById(id);
        setTimeout(() => {
          setEditData((prev) => ({
            ...prev,
            userName: users.userName,
            role: users.role,
          }));
          isLoad?.setLoad(false);
        }, 500);
      } catch (error) {
        console.log("Error fetching data:", error);
        isLoad?.setLoad(false);
      }
    };
    fetchData();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const usersModifyed = await modifyUser(id, editData, Auth);
      if (usersModifyed.status === 403) {
        enqueueSnackbar({
          message: "ليس مسموح لك بالتعديل .",
          variant: "info",
        });
      } else {
        enqueueSnackbar({
          message: "تم التعديل بنجاح .",
          variant: "success",
        });
        navigate(-1);
      }
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar({
        message: error.response.data.message,
        variant: "error",
      });
    }
  }

  const fields = [
    {
      label: "البريد الالكتروني",
      name: "userName",
      inputType: "userName",
      require: true,
      value: editData.userName,
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
      selectedValue: editData.role,
      require: false,
    },
  ];

  return (
    <>
      <BackButton />

      <div
        style={{
          font: "10px",
          color: "#d21e1e",
          margin: "10px 0 10px 0",
        }}
      >
        {" "}
        ألرجاء ادخال الكلمة المرور القدية في حال عدم التغير .
      </div>
      <Form
        fields={fields}
        setData={setEditData}
        textButtonSubmite="تعديل مستخدم"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default EditUser;
