import { useState } from "react";
import Form from "../../components/form/Form";
import BackButton from "../../components/backButton/BackButton";
import Snackbar from "../../components/tostify/SnackBar";
import { addCategory } from "../../utils/apisRequest";
function AddCategory() {
    const [addData, setAddData] = useState({
        name: "",
        description: "",
    });

    const [toast, setToast] = useState({
        open: false,
        severity: "",
        message: "",
    });

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
                setToast({
                    open: true,
                    message: "الرجاء تعبئت جميع الحقول .",
                    severity: "error",
                });
            } else {
                const dataAdded = await addCategory(addData);
                if (dataAdded) {
                    setToast({
                        open: true,
                        message: "تم ﻹنشاءبنجاح .",
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

    return (
        <>
            <BackButton navigatePath="/categories" />{" "}
            <Snackbar
                open={toast.open}
                severity={toast.severity}
                setOpen={setToast}
                message={toast.message}
            />{" "}
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
