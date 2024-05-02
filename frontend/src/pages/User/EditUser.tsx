import { useEffect, useState } from "react";
import Form from "../../components/form/Form";
import { useParams } from "react-router-dom";
import { LoaderContext } from "../../layout";
import { useContext } from "react";
import { getUserById, modifyUser } from "../../utils/apisRequest";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import SnackBar from "../../components/tostify/SnackBar";
import BackButton from "../../components/backButton/BackButton";

function EditUser() {
    const { id } = useParams();

    const isLoad = useContext(LoaderContext);
    const Auth = useAuthHeader();
    const [toast, setToast] = useState({
        open: false,
        severity: "",
        message: "",
    });

    const [editData, setEditData] = useState({
        email: "",
        password: null,
        password2: null,
        role: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                isLoad?.setLoad(true);
                const users: any = await getUserById(id);
                setTimeout(() => {
                    setEditData((prev) => ({
                        ...prev,
                        email: users.email,
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
            if (
                (!editData.password && !editData.password2) ||
                editData.password !== editData.password2
            ) {
                setToast({
                    open: true,
                    message:
                        " ألرجاء ادخال الكلمة المرور القدمية في حال عدم التغير .",
                    severity: "error",
                });
            } else {
                const usersModifyed = await modifyUser(id, editData, Auth);
                if (usersModifyed.status === 403) {
                    setToast({
                        open: true,
                        message: "ليس مسموح لك بالتعديل .",
                        severity: "info",
                    });
                } else {
                    setToast({
                        open: true,
                        message: "تم التعديل بنجاح .",
                        severity: "success",
                    });
                }
            }
        } catch (error: any) {
            console.log(error);
            setToast({
                open: true,
                message: error.response.data.message,
                severity: "error",
            });
        }
    }

    const fields = [
        {
            label: "البريد الالكتروني",
            name: "email",
            inputType: "email",
            require: true,
            value: editData.email,
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
            <BackButton navigatePath="/users" />
            <SnackBar
                open={toast.open}
                severity={toast.severity}
                setOpen={setToast}
                message={toast.message}
            />
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
