import Box from "@mui/material/Box";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Delete from "../../components/buttons/Delete";
import Edit from "../../components/buttons/Edit";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/dataTable/DataGrid";

const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function Category() {
    const navigate = useNavigate();

    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: "id", headerName: "ID", align: "right", width: 90 },
        {
            field: "firstName",
            headerName: "First name",
            width: 150,
            align: "right",
        },
        {
            field: "lastName",
            headerName: "Last name",
            width: 150,
            align: "right",

        },
        {
            field: "age",
            align: "right",
            headerName: "Age",
            width: 110,
        },
        {
            field: "fullName",
            headerName: "Full name",
            align: "right",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 160,
            valueGetter: (value, row) =>
                `${row.firstName || ""} ${row.lastName || ""}`,
        },
        {
            field: "Actions",
            headerName: "Actions",
            width: 160,
            align: "center",
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
            <DataTable
                columns={columns}
                rows={rows}
                buttonText="add category"
                onClickAddButton={() => navigate("add-categories")}
            />
        </Box>  
    );
}

export default Category;
