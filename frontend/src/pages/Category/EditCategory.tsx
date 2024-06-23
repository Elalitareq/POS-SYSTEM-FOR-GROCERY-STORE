import { useEffect, useState } from "react";
import Form from "../../components/form/Form";
import { useParams } from "react-router-dom";
import { LoaderContext } from "../../layout";
import { useContext } from "react";
import { enqueueSnackbar } from "notistack";
import BackButton from "../../components/backButton/BackButton";
import useApiRequests from "../../hooks/useApiRequests";

function EditCategory() {
  const { getCategoryById, modifyCategory } = useApiRequests();
  const { id } = useParams();

  const isLoad = useContext(LoaderContext);

  const [editData, setEditData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        isLoad?.setLoad(true);
        const category: any = await getCategoryById(id);
        setEditData((prev) => ({
          ...prev,
          name: category.name,
          description: category.description,
        }));
        isLoad?.setLoad(false);
      } catch (error) {
        isLoad?.setLoad(false);
      }
    };
    fetchData();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    e.preventDefault();
    try {
      if (!editData.name || !editData.description) {
        enqueueSnackbar({
          message: "الرجاء تعبئت جميع الحقول .",
          variant: "error",
        });
      } else {
        const dataAdded = await modifyCategory(id, editData);
        if (dataAdded) {
          enqueueSnackbar({
            message: "تم التعديل بنجاح .",
            variant: "success",
          });
        }
      }
    } catch (error: any) {
      enqueueSnackbar({
        message: error.response.data.message,
        variant: "success",
      });
    }
  }

  const fields = [
    {
      label: "اﻹسم",
      name: "name",
      inputType: "text",
      require: true,
      value: editData.name,
    },
    {
      label: "وصف",
      name: "description",
      inputType: "text",
      require: true,
      value: editData.description,
    },
  ];

  return (
    <>
      <BackButton />

      <Form
        fields={fields}
        setData={setEditData}
        textButtonSubmite="تعديل مستخدم"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default EditCategory;
