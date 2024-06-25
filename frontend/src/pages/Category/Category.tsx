import Box from "@mui/material/Box";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Delete from "../../components/buttons/Delete";
import Edit from "../../components/buttons/Edit";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/dataTable/DataGrid";
import { LoaderContext } from "../../layout";
import { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import useApiRequests from "../../hooks/useApiRequests";
import Dialog from "../../components/Dialog";
import { enqueueSnackbar } from "notistack";

interface CategoryObject {
    id: number;
    name: string;
    description?: string;
    lastModified: string;
}

function Category() {
    const navigate = useNavigate();
    const { getAllCategories, deleteCategory } = useApiRequests();

    const [dataCategory, setDataCategory] = useState<CategoryObject[] | null>(
        null
    );

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null
    );

    const isLoad = useContext(LoaderContext);

    useEffect(() => {
        const fetchData = async () => {
            isLoad?.setLoad(true);
            getAllCategories()
                .then((res) => {
                    setDataCategory(res);
                    isLoad?.setLoad(false);
                })
                .catch((error) => {
                    isLoad?.setLoad(false);
                });
        };
        fetchData();
    }, []);

    const columns: GridColDef<CategoryObject>[] = [
        {
            field: "name",
            headerName: "الاسم",
            width: 200,
        },
        {
            field: "description",
            headerName: "شرح",
            width: 300,
        },
        {
            field: "lastModified",
            headerName: "اخر تعديل",
            width: 200,
            renderCell: ({ row }) => {
                return <> {row.lastModified.replace("T", " ").slice(0, 16)} </>;
            },
        },
        {
            field: "Actions",
            type: "actions",
            width: 120,
            getActions: ({ row }: { row: CategoryObject }) => [
                <GridActionsCellItem
                    onClick={() => {
                        navigate(`edit-categories/${row.id}`);
                    }}
                    icon={<Edit />}
                    label="Edit"
                    color="inherit"
                />,
                <GridActionsCellItem
                    onClick={() => handleDeleteCategory(row.id)}
                    icon={<Delete />}
                    label="Delete"
                    color="inherit"
                />,
            ],
        },
    ];

    function handleDeleteCategory(id: number) {
        setSelectedCategoryId(id);
        setOpenDialog(true);
    }

    const handleConfirmationDelete = async (e: any) => {
        e.preventDefault();
        if (selectedCategoryId !== null) {
            try {
                await deleteCategory(selectedCategoryId);
                enqueueSnackbar({
                    message: "تم حذف الصنف بنجاح.",
                    variant: "success",
                });
                setDataCategory(
                    dataCategory?.filter(
                        (category) => category.id !== selectedCategoryId
                    ) || null
                );
            } catch (error) {
                enqueueSnackbar({
                    message: "حدث خطأ أثناء حذف الصنف.",
                    variant: "error",
                });
            } finally {
                setOpenDialog(false);
                setSelectedCategoryId(null);
            }
        }
    };

    return (
        <Box>
            <Dialog
                openModel={openDialog}
                handleCloseModal={() => setOpenDialog(false)}
                onClick={handleConfirmationDelete}
                bodyModal="هل أنت متأكد من أنك تريد حذف هذا الصنف؟"
            />
            {dataCategory !== null && (
                <DataTable
                    columns={columns}
                    rows={dataCategory}
                    buttonText="إضافة صنف"
                    onClickAddButton={() => navigate("add-categories")}
                />
            )}
        </Box>
    );
}

export default Category;
