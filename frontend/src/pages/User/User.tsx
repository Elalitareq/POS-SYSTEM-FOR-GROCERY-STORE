import Box from "@mui/material/Box";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Delete from "../../components/buttons/Delete";
import Edit from "../../components/buttons/Edit";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/dataTable/DataGrid";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../utils/apisRequest";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { LoderContext } from "../../layout/layout";
import { useContext } from "react";

interface UserObject {
    email: string;
    id: number;
    lastModified: string;
    password: string;
    role: string;
    synced: boolean;
}

function User() {
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState(null);

    const Loader = useContext(LoderContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                Loader?.setLoader(true);
                const users: any = await getAllUsers();
                setTimeout(() => {
                    setDataUser(users);
                    Loader?.setLoader(false);
                }, 500);
            } catch (error) {
                console.log("Error fetching data:", error);
                Loader?.setLoader(false);
            }
        };
        fetchData();
    }, []);

    const columns: GridColDef<UserObject>[] = [
        { field: "id", headerName: "ID", align: "right", width: 90 },
        {
            field: "email",
            headerName: "Email",
            width: 150,
            align: "right",
        },
        {
            field: "role",
            headerName: "Role",
            width: 150,
            align: "right",
        },
        {
            field: "lastModified",
            align: "right",
            headerName: "Last Modified",
            width: 200,
            renderCell: ({ row }: { row: UserObject }) => {
                return <> {row.lastModified.replace("T", " ").slice(0, 16)} </>;
            },
        },
        {
            field: "synced",
            align: "right",
            headerName: "Synced",
            width: 110,
            renderCell: ({ row }: { row: UserObject }) => {
                return (
                    <>
                        {" "}
                        {row.synced ? (
                            <CheckCircleIcon sx={{ color: "#52b963" }} />
                        ) : (
                            <HighlightOffIcon sx={{ color: "#cc0000" }} />
                        )}{" "}
                    </>
                );
            },
        },
        {
            field: "Actions",
            headerName: "Actions",
            width: 120,
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <>
                        <GridActionsCellItem
                            onClick={() => {
                                navigate(`edit-users/${row.id}`);
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
    if (!dataUser) return <></>;
    return (
        <Box>
            <DataTable
                columns={columns}
                rows={dataUser}
                buttonText="add user"
                onClickAddButton={() => navigate("add-users")}
            />
        </Box>
    );
}

export default User;
