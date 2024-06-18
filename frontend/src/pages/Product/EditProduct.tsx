import { useEffect, useState } from "react";
import Form from "../../components/form/Form";
import { useParams } from "react-router-dom";
import { LoaderContext } from "../../layout";
import { useContext } from "react";
// import { getProductById, modifyProduct } from "../../utils/apisRequest";
import SnackBar from "../../components/tostify/SnackBar";
import BackButton from "../../components/backButton/BackButton";
import {
    getAllCategories,
    getProductById,
    modifyProduct,
} from "../../utils/apisRequest";

function EditProduct() {
    let ID = useParams().id;

    const isLoad = useContext(LoaderContext);
    const [toast, setToast] = useState({
        open: false,
        severity: "",
        message: "",
    });

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
                const { synced, lastModified, Category, id, ...rest } = product;
                setEditData(rest);
                isLoad?.setLoad(false);
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
            if (!editData) {
                setToast({
                    open: true,
                    message: "الرجاء تعبئت جميع الحقول .",
                    severity: "error",
                });
            } else {
                const dataAdded = await modifyProduct(ID, editData);
                console.log(dataAdded);
                if (dataAdded) {
                    setToast({
                        open: true,
                        message: "تم التعديل بنجاح .",
                        severity: "success",
                    });
                }
            }
        } catch (error: any) {
            setToast({
                open: true,
                message: error.response.data.message,
                severity: "success",
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
            <BackButton navigatePath="/products" />
            <SnackBar
                open={toast.open}
                severity={toast.severity}
                setOpen={setToast}
                message={toast.message}
            />
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
