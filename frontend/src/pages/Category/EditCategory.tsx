import { useEffect, useState } from "react";
import Form from "../../components/form/Form";
import { useParams } from "react-router-dom";
import { LoaderContext } from "../../layout";
import { useContext } from "react";
import { getCategoryById, modifyCategory } from "../../utils/apisRequest";
import SnackBar from "../../components/tostify/SnackBar";
import BackButton from "../../components/backButton/BackButton";

function EditCategory() {
    const { id } = useParams();

    const isLoad = useContext(LoaderContext);
    const [toast, setToast] = useState({
        open: false,
        severity: "",
        message: "",
    });

    const [editData, setEditData] = useState({
        name: "",
        description: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                isLoad?.setLoad(true);
                const category: any = await getCategoryById(id);
                setTimeout(() => {
                    setEditData((prev) => ({
                        ...prev,
                        name: category.name,
                        description: category.description,
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
        e.preventDefault();
        try {
            if (!editData.name || !editData.description) {
                setToast({
                    open: true,
                    message: "الرجاء تعبئت جميع الحقول .",
                    severity: "error",
                });
            } else {
                const dataAdded = await modifyCategory(id, editData);
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
            require: true,
            value: editData.description,
        },
    ];

    return (
        <>
            <BackButton navigatePath="/categories" />
            <SnackBar
                open={toast.open}
                severity={toast.severity}
                setOpen={setToast}
                message={toast.message}
            />
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
