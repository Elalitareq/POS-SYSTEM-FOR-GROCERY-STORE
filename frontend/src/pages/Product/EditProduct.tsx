import { useEffect, useState } from "react";
import Form from "../../components/form/Form";
import { useParams } from "react-router-dom";
import { LoaderContext } from "../../layout";
import { useContext } from "react";
// import { getProductById, modifyProduct } from "../../utils/apisRequest";
import { enqueueSnackbar } from "notistack";
import BackButton from "../../components/backButton/BackButton";
import useApiRequests from "../../hooks/useApiRequests";

function EditProduct() {
  let ID = useParams().id;

  const { getProductById, modifyProduct, getAllCategories } = useApiRequests();

  const isLoad = useContext(LoaderContext);

  const [categories, setCategories] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    description: "",
    sku: "",
    inventoryCount: "",
    regularPrice: "",
    salePrice: "",
    costPrice: "",
    wholesalePrice: "",
    categoryId: "",
    batches: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!categories) {
          isLoad?.setLoad(true);
        }

        const product: any = await getProductById(ID);
        const category: any = await getAllCategories();

        let i;
        for (i = 0; i < category.length; i++) {
          category[i]["title"] = category[i]["name"];
          category[i]["value"] = category[i]["id"];
          delete category[i]["name"];
          delete category[i]["id"];
        }
        setCategories(category);
        const { lastModified, Category, id, ...rest } = product;
        setEditData(rest);
        isLoad?.setLoad(false);
      } catch (error) {
        isLoad?.setLoad(false);
      }
    };
    fetchData();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      if (!editData) {
        enqueueSnackbar({
          message: "الرجاء تعبئت جميع الحقول .",
          variant: "error",
        });
      } else {
        const { batches, ...rest } = editData;
        const dataAdded = await modifyProduct(ID, rest);
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
        variant: "error",
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
      value: editData.description,
    },
    {
      label: "الرمز",
      name: "sku",
      inputType: "text",
      require: true,
      value: editData.sku,
    },
    {
      label: "فئة",
      name: "categoryId",
      inputType: "select",
      options: categories,
      selectedValue: editData.categoryId,
      require: true,
    },
    {
      label: "عدد الجردات",
      name: "inventoryCount",
      inputType: "number",
      require: true,
      value: editData.inventoryCount,
    },
    {
      label: "سعر العادي",
      name: "regularPrice",
      inputType: "number",
      require: true,
      value: editData.regularPrice,
    },
    {
      label: "سعر البيع",
      name: "salePrice",
      inputType: "number",
      require: true,
      value: editData.salePrice,
    },
    {
      label: "سعر الكلفة",
      name: "costPrice",
      inputType: "number",
      require: true,
      value: editData.costPrice,
    },
    {
      label: "سعر بالجملة",
      name: "wholesalePrice",
      inputType: "number",
      require: true,
      value: editData.wholesalePrice,
    },
  ];

  return (
    <>
      <BackButton />

      <Form
        fields={fields}
        setData={setEditData}
        textButtonSubmite="تعديل المنتج"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default EditProduct;
