import Box from "@mui/material/Box";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Delete from "../../components/buttons/Delete";
import Edit from "../../components/buttons/Edit";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DataTable from "../../components/dataTable/DataGrid";
import { LoaderContext } from "../../layout";
import { useContext, useState, useEffect } from "react";
import { getAllCategories } from "../../utils/apisRequest";

interface CategoryObject {
    id: number;
    name: string;
    description?: string;
    lastModified: string;
    synced: boolean;
}

function Category() {
    const navigate = useNavigate();

    const [dataCategory, setDataCategory] = useState(null);

    const isLoad = useContext(LoaderContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                isLoad?.setLoad(true);
                const Categorys: any = await getAllCategories();
                setTimeout(() => {
                    setDataCategory(Categorys);
                    isLoad?.setLoad(false);
                }, 700);
            } catch (error) {
                console.log("Error fetching data:", error);
                isLoad?.setLoad(false);
            }
        };
        fetchData();
    }, []);

    const columns: GridColDef<CategoryObject>[] = [
        {
            field: "name",
            headerName: "Name",
            width: 200,
        },
        {
            field: "description",
            headerName: "Description",
            width: 300,
        },
        {
            field: "lastModified",
            headerName: "Last Modified",
            width: 200,
            renderCell: ({ row }) => {
                return <> {row.lastModified.replace("T", " ").slice(0, 16)} </>;
            },
        },
        {
            field: "synced",
            headerName: "Synced",
            width: 110,
            renderCell: ({ row }) => {
                return (
                    <>
                        {row.synced ? (
                            <CheckCircleIcon sx={{ color: "#52b963" }} />
                        ) : (
                            <HighlightOffIcon sx={{ color: "#cc0000" }} />
                        )}
                    </>
                );
            },
        },
        {
            field: "Actions",
            headerName: "Actions",
            width: 120,
            renderCell: ({ row }) => {
                return (
                    <>
                        <GridActionsCellItem
                            onClick={() => {
                                navigate(`edit-categories/${row.id}`);
                            }}
                            icon={<Edit />}
                            label="Edit"
                            color="inherit"
                        />
                        <GridActionsCellItem
                            icon={<Delete />}
                            label="Delete"
                            color="inherit"
                        />
                    </>
                );
            },
        },
    ];

    return (
        <Box>
            {dataCategory !== null && (
                <DataTable
                    columns={columns}
                    rows={dataCategory}
                    buttonText="add category"
                    onClickAddButton={() => navigate("add-categories")}
                />
            )}
        </Box>
    );
}

export default Category;
