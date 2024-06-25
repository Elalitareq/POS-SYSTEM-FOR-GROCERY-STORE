import Box from "@mui/material/Box";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Delete from "../../components/buttons/Delete";
import Edit from "../../components/buttons/Edit";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/dataTable/DataGrid";
import { LoaderContext } from "../../layout";
import { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import Modal from "../../components/modal/Modal";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { enqueueSnackbar } from "notistack";
import useApiRequests from "../../hooks/useApiRequests";
import Dialog from "../../components/Dialog";

interface ProductObject {
  id: number;
  name: string;
  description?: string;
  lastModified: string;
  Category: any;
  totalProductCount?: number;
  inventoryCount: number;
  soldCount: number;
}

function Product() {
  const { getAllProduct, addBatch, deleteProduct } = useApiRequests();
  const navigate = useNavigate();

  const { id }: number | any = useAuthUser();

  const [dataProduct, setDataProduct] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const [headerOfTheModal, setHeaderOfTheModal] = useState("");

  const [batch, setBatch] = useState({
    userId: id,
  });

  const isLoad = useContext(LoaderContext);

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
        return <> {row.Category?.name} </>;
      },
    },
    {
      field: "inventoryCount",
      headerName: "العدد الكلي",
      width: 120,
    },
    {
      field: "soldCount",
      headerName: "العدد المتبقي",
      width: 120,
      valueGetter: (_, row) => {
        return row.inventoryCount - row.soldCount;
      },
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
              onClick={() => handleDeleteProduct(row.id)}
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

  function handleDeleteProduct(id: number) {
    setSelectedProductId(id);
    setOpenDialog(true);
  }

  const handleConfirmationDelete = async (e: any) => {
    e.preventDefault();
    if (selectedProductId !== null) {
      try {
        await deleteProduct(selectedProductId);
        enqueueSnackbar({
          message: "تم حذف المنتج بنجاح.",
          variant: "success",
        });
        setDataProduct(
          dataProduct.filter(
            (product: ProductObject) => product.id !== selectedProductId
          )
        );
      } catch (error) {
        enqueueSnackbar({
          message: "حدث خطأ أثناء حذف المنتج.",
          variant: "error",
        });
      } finally {
        setOpenDialog(false);
        setSelectedProductId(null);
      }
    }
  };

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
      <Dialog
        openModel={openDialog}
        handleCloseModal={() => setOpenDialog(false)}
        onClick={(e: any) => {
          handleConfirmationDelete(e);
        }}
        bodyModal="هل أنت متأكد من أنك تريد حذف هذا المنتج؟"
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
