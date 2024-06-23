import { useState } from "react";
import Form from "../../components/form/Form";
import BackButton from "../../components/backButton/BackButton";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import useApiRequests from "../../hooks/useApiRequests";

function AddCategory() {
  const [addData, setAddData] = useState({
    name: "",
    description: "",
  });
  const { addCategory } = useApiRequests();
  const navigate = useNavigate();
  const fields = [
    {
      label: "اﻹسم",
      name: "name",
      inputType: "text",
      require: true,
    },
    {
      label: "وصف",
      name: "description",
      inputType: "text",
      require: true,
    },
  ];

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      if (!addData.name || !addData.description) {
        enqueueSnackbar({
          message: "الرجاء تعبئت جميع الحقول .",
          variant: "error",
        });
      } else {
        const dataAdded = await addCategory(addData);
        if (dataAdded) {
          enqueueSnackbar({
            message: "تم اﻹنشاء بنجاح .",
            variant: "success",
          });
          navigate(-1);
        }
      }
    } catch (error: any) {
      enqueueSnackbar({
        message: error.response.data.message,
        variant: "success",
      });
    }
  }

  return (
    <>
      <BackButton />{" "}
      <Form
        fields={fields}
        setData={setAddData}
        textButtonSubmite="Add Category"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default AddCategory;
