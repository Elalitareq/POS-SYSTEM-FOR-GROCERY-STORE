import { useState } from "react";
import Form from "../../components/form/Form";
import BackButton from "../../components/backButton/BackButton";
import { addProduct, getAllCategories } from "../../utils/apisRequest";
import { LoaderContext } from "../../layout";
import { useContext, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { enqueueSnackbar } from "notistack";

function AddProduct() {
  const { id }: number | any = useAuthUser();

  const [product, setproduct] = useState({
    categoryId: "",
    userId: id,
  });

  const [batch, setBatch] = useState({
    userId: id,
  });

  const isLoad = useContext(LoaderContext);

  const [categories, setCategories] = useState(null);
  console.log(categories);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!categories) {
          isLoad?.setLoad(true);
        }

        const category: any = await getAllCategories();
        let i;
        for (i = 0; i < category.length; i++) {
          category[i]["title"] = category[i]["name"];
          category[i]["value"] = category[i]["id"];
          delete category[i]["name"];
          delete category[i]["id"];
        }
        setCategories(category);

        isLoad?.setLoad(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        isLoad?.setLoad(false);
      }
    };
    fetchData();
  }, []);

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
    },
    {
      label: "الرمز",
      name: "sku",
      inputType: "text",
      require: true,
    },
    {
      label: "فئة",
      name: "categoryId",
      inputType: "select",
      require: true,
      options: categories,
    },
    {
      label: "عدد الجردات",
      name: "inventoryCount",
      inputType: "number",
      require: true,
    },
    {
      label: "سعر العادي",
      name: "regularPrice",
      inputType: "number",
      require: true,
    },
    {
      label: "سعر البيع",
      name: "salePrice",
      inputType: "number",
      require: true,
    },
    {
      label: "سعر الكلفة",
      name: "costPrice",
      inputType: "number",
      require: true,
    },
    {
      label: "سعر بالجملة",
      name: "wholesalePrice",
      inputType: "number",
      require: true,
    },
  ];

  const fields2 = [
    {
      label: "الكمية",
      name: "quantity",
      inputType: "number",
      require: true,
    },
    {
      label: "سعر الكلفة",
      name: "costPrice",
      inputType: "number",
      require: true,
    },
    {
      label: "تاريخ اﻹدخال",
      name: "receivedDate",
      inputType: "datetime-local",
      require: true,
    },
    {
      label: "تاريخ اﻹنتهاء",
      name: "expiryDate",
      inputType: "datetime-local",
      require: true,
    },
  ];

  // receivedDate DateTime
  // expiryDate   DateTime
  // quantity     Int
  // costPrice    Float

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      if (Object.keys(product).length < 9 || Object.keys(batch).length < 4) {
        enqueueSnackbar({
          message: "الرجاء تعبئت جميع الحقول .",
          variant: "error",
        });
      } else {
        const dataAdded = await addProduct({
          productData: { ...product, categoryID: product.categoryId },
          batches: [batch],
        });

        if (dataAdded) {
          enqueueSnackbar({
            message: "تم ﻹنشاءبنجاح .",
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

  return (
    <>
      <BackButton />{" "}
      <Form fields={fields} setData={setproduct} isButtonShow={false} />
      <div> الكمية</div>
      <Form
        fields={fields2}
        setData={setBatch}
        textButtonSubmite="إنشاء منتج"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default AddProduct;
