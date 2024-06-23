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
import { Button } from "@mui/material";
import Modal from "../../components/modal/Modal";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { enqueueSnackbar } from "notistack";
import useApiRequests from "../../hooks/useApiRequests";

interface ProductObject {
  id: number;
  name: string;
  description?: string;
  lastModified: string;
  synced: boolean;
  Category: any;
  totalProductCount?: number;
}

function Product() {
  const { getAllProduct, addBatch } = useApiRequests();
  const navigate = useNavigate();

  const { id }: number | any = useAuthUser();

  const [dataProduct, setDataProduct] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [headerOfTheModal, setHeaderOfTheModal] = useState("");

  const [batch, setBatch] = useState({
    userId: id,
  });

  const isLoad = useContext(LoaderContext);

  // fetch data with tostify

  useEffect(() => {
    const fetchData = async () => {
      if (!dataProduct) {
        isLoad?.setLoad(true);
      }
      getAllProduct()
        .then((res) => {
          setDataProduct(res);
          if (res) {
            isLoad?.setLoad(false);
          }
        })
        .catch((error) => {
          isLoad?.setLoad(false);
        });
    };
    fetchData();
  }, []);

  const columns: GridColDef<ProductObject>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "name",
      headerName: "اﻹسم",
      width: 150,
    },
    {
      field: "description",
      headerName: "وصف",
      width: 200,
    },
    {
      field: "sku",
      headerName: "الرمز",
      width: 100,
    },
    {
      field: "category",
      headerName: "فئة",
      width: 100,
      renderCell: ({ row }) => {
        return <> {row.Category.name} </>;
      },
    },
    {
      field: "inventoryCount",
      headerName: "عدد الجردات",
      width: 120,
    },
    {
      field: "regularPrice",
      headerName: "سعر العادي",
      width: 100,
    },
    {
      field: "salePrice",
      headerName: "سعر البيع",
      width: 100,
    },
    {
      field: "wholesalePrice",
      headerName: "سعر بالجملة",
      width: 120,
    },
    {
      field: "costPrice",
      headerName: "سعر الكلفة",
      width: 100,
    },
    {
      field: "lastModified",
      headerName: "تاريخ تعديل اﻷخير",
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
      width: 200,
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <>
            <GridActionsCellItem
              onClick={() => {
                navigate(`edit-products/${row.id}`);
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

            <Button
              sx={{ marginLeft: "15px" }}
              onClick={() => {
                handelOpenModal();
                setBatch((prev: any) => ({
                  ...prev,
                  productId: row.id,
                }));
                setHeaderOfTheModal(row.name);
              }}
            >
              زيادة كمية
            </Button>
          </>
        );
      },
    },
  ];

  // fields for the batch MODAL

  const fields = [
    {
      label: "الكمية",
      name: "quantity",
      inputType: "number",
      require: true,
    },
    {
      label: "سعر الكلفة",
      name: "costPrice",
      inputType: "number",
      require: true,
    },
    {
      label: "تاريخ اﻹدخال",
      name: "receivedDate",
      inputType: "datetime-local",
      require: true,
    },
    {
      label: "تاريخ اﻹنتهاء",
      name: "expiryDate",
      inputType: "datetime-local",
      require: true,
    },
  ];

  // handel submit of the Batch MOdall

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      if (Object.keys(batch).length < 4) {
        enqueueSnackbar({
          message: "الرجاء تعبئت جميع الحقول .",
          variant: "error",
        });
      } else {
        const dataAdded = await addBatch(batch);

        if (dataAdded) {
          enqueueSnackbar({
            message: "تم ﻹنشاءبنجاح .",
            variant: "success",
          });
          setBatch({
            userId: id,
          });
        }
      }
    } catch (error: any) {
      enqueueSnackbar({
        message: error.response.data.message,
        variant: "error",
      });
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setBatch({ userId: id });
  };
  const handelOpenModal = () => setOpenModal(true);

  return (
    <Box>
      <Modal
        openModel={openModal}
        fields={fields}
        onSubmit={handleSubmit}
        textButtonSubmite="زيادة الكمية"
        setData={setBatch}
        handleCloseModal={handleCloseModal}
        headerTextOfTheModal={`زيادة الكمية للمنتج ${headerOfTheModal}`}
      />

      {dataProduct !== null && (
        <DataTable
          columns={columns}
          rows={dataProduct}
          buttonText="زيادة منتج"
          onClickAddButton={() => navigate("add-products")}
        />
      )}
    </Box>
  );
}

export default Product;
