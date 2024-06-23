import Box from "@mui/material/Box";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Delete from "../../components/buttons/Delete";
import Edit from "../../components/buttons/Edit";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/dataTable/DataGrid";
import { LoaderContext } from "../../layout";
import { useContext, useState, useEffect } from "react";
import useApiRequests from "../../hooks/useApiRequests";

interface CategoryObject {
  id: number;
  name: string;
  description?: string;
  lastModified: string;
}

function Category() {
  const navigate = useNavigate();
  const { getAllCategories } = useApiRequests();

  const [dataCategory, setDataCategory] = useState(null);

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
          icon={<Delete />}
          label="Delete"
          color="inherit"
        />,
      ],
    },
  ];

  return (
    <Box>
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
