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
import useApiRequests from "../../hooks/useApiRequests";

interface ActionObject {
  id: number;
  name: string;
  user: { userName: string };
  description?: { ar: string; en: string };
  actionType: string;
  lastModified: string;
}

function Action() {
  const { getAllAction } = useApiRequests();
  const navigate = useNavigate();

  const [dataAction, setDataAction] = useState(null);

  const isLoad = useContext(LoaderContext);

  useEffect(() => {
    const fetchData = async () => {
      isLoad?.setLoad(true);
      getAllAction()
        .then((res) => {
          setDataAction(res);
          isLoad?.setLoad(false);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
          isLoad?.setLoad(false);
        });
    };
    fetchData();
  }, []);

  const columns: GridColDef<ActionObject>[] = [
    {
      field: "user.userName",
      headerName: "اسم المستخدم",
      width: 200,
      valueGetter: (_, row) => row.user.userName,
    },

    {
      field: "description",
      headerName: "شرح",
      width: 500,
      renderCell: ({ row }) => {
        return <> {JSON.stringify(row.description?.ar)}</>;
      },
    },
    {
      field: "createdAt",
      headerName: "تاريخ",
      width: 200,
      renderCell: ({ row }) => {
        return <> {row.lastModified.replace("T", " ").slice(0, 16)} </>;
      },
    },
    // {
    //     field: "Actions",
    //     type: "actions",
    //     width: 120,
    //     getActions: ({ row }: { row: ActionObject }) => [
    //         <GridActionsCellItem
    //             onClick={() => {
    //                 navigate(`edit-categories/${row.id}`);
    //             }}
    //             icon={<Edit />}
    //             label="Edit"
    //             color="inherit"
    //         />,
    //         <GridActionsCellItem
    //             icon={<Delete />}
    //             label="Delete"
    //             color="inherit"
    //         />,
    //     ],
    // },
  ];

  return (
    <Box>
      {dataAction !== null && (
        <DataTable
          columns={columns}
          rows={dataAction}
          // buttonText="إضافة صنف"
          // onClickAddButton={() => navigate("add-categories")}
        />
      )}
    </Box>
  );
}

export default Action;
