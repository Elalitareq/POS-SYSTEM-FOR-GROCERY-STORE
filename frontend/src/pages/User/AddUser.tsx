import { useState } from "react";
import Form from "../../components/form/Form";
import { addUser } from "../../utils/apisRequest";
import Snackbar from "../../components/tostify/SnackBar";
import BackButton from "../../components/backButton/BackButton";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function AddUser() {
    const Auth = useAuthHeader();
    const [addData, setAddData] = useState({
        email: null,
        password: null,
        password2: null,
        role: "EMPLOYEE",
    });
    const [toast, setToast] = useState({
        open: false,
        severity: "",
        message: "",
    });

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            if (!addData.email || !addData.password || !addData.password2) {
                setToast({
                    open: true,
                    message: "الرجاء تعبئت جميع الحقول .",
                    severity: "error",
                });
            } else if (addData.password !== addData.password2) {
                setToast({
                    open: true,
                    message: "الرجاء التأكد من جيمع كلمات المرور .",
                    severity: "error",
                });
            } else {
                const dataAdded = await addUser(addData, Auth);
                if (dataAdded.status === 403) {
                    setToast({
                        open: true,
                        message: "ليس مسموح لك باﻹضافة .",
                        severity: "info",
                    });
                } else {
                    setToast({
                        open: true,
                        message: "تم ﻹنشاءبنجاح .",
                        severity: "success",
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

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
            <BackButton navigatePath="/users" />{" "}
            <Snackbar
                open={toast.open}
                severity={toast.severity}
                setOpen={setToast}
                message={toast.message}
            />
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
