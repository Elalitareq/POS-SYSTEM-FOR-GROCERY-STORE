import Box from "@mui/material/Box";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Delete from "../../components/buttons/Delete";
import Edit from "../../components/buttons/Edit";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/dataTable/DataGrid";
import { useState, useEffect } from "react";
import { LoaderContext } from "../../layout";
import { useContext } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import { ROLES } from "../../utils/staticData";
import useApiRequests from "../../hooks/useApiRequests";

interface UserObject {
  userName: string;
  id: number;
  lastModified: string;
  password: string;
  role: string;
  synced: boolean;
}

function User() {
  const navigate = useNavigate();
  const { getAllUsers } = useApiRequests();
  const [dataUser, setDataUser] = useState(null);

  const isLoad = useContext(LoaderContext);

  const { isSuperAdmin, isEmployee } = useUserInfo();

  useEffect(() => {
    const fetchData = async () => {
      try {
        isLoad?.setLoad(true);
        const users: any = await getAllUsers();
        setTimeout(() => {
          setDataUser(users);
          isLoad?.setLoad(false);
        }, 500);
      } catch (error) {
        isLoad?.setLoad(false);
      }
    };
    fetchData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "userName",
      headerName: "اسم المستخدم",
      width: 200,
    },
    {
      field: "role",
      headerName: "الصلاحية",
      width: 150,
    },
    {
      field: "lastModified",
      headerName: "اخر تعديل",
      width: 200,
      renderCell: ({ row }: { row: UserObject }) => {
        return <> {row.lastModified.replace("T", " ").slice(0, 16)} </>;
      },
    },

    {
      field: "Actions",
      width: 120,
      type: "actions",
      getActions: ({ row }) => {
        const { role } = row;
        if (
          role === ROLES.SUPER_ADMIN ||
          isEmployee ||
          (role === ROLES.ADMIN && !isSuperAdmin)
        ) {
          return [];
        }

        return [
          <GridActionsCellItem
            onClick={() => {
              navigate(`edit-users/${row.id}`);
            }}
            icon={<Edit />}
            label="Edit"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <Box>
      {dataUser !== null && (
        <DataTable
          columns={columns}
          rows={dataUser}
          buttonText="اضافة مستخدم جديد"
          onClickAddButton={() => navigate("add-users")}
        />
      )}
    </Box>
  );
}

export default User;
