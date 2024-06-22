import { useState, useEffect, useContext, cloneElement } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import { addBill, getAllProduct } from "../../utils/apisRequest";
import { LoaderContext } from "../../layout";
import DataTable from "../../components/dataTable/DataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import {
    DeleteOutline,
    DeleteOutlineOutlined,
    LineAxis,
    PlusOne,
} from "@mui/icons-material";
import Delete from "../../components/buttons/Delete";

interface ProductObject {
    id: number;
    name: string;
    sku: string;
    description?: string;
    lastModified: string;
    synced: boolean;
    quantity: number;
    salePrice: number;
    category: any;
    action: any;
}

interface Product {
    id: number;
    name: string;
    sku: string;
    Category: any;
    quantity: number;
    salePrice: number;
}

export default function InteractiveList() {
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [dataProduct, setDataProduct] = useState([]);
    const [productSelected, setProductSelected] = useState<Product[]>([]);
    const [searchedProduct, setSearchedProduct] = useState("");

    const isLoad = useContext(LoaderContext);

    useEffect(() => {
        const fetchData = async () => {
            if (dataProduct.length === 0) {
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
                    console.log("Error fetching data:", error);
                    isLoad?.setLoad(false);
                });
        };
        fetchData();
    }, []);

    const handleIncrementQuantity = (row: any) => {
        const index = productSelected.findIndex(
            (product: Product) => product.sku === row.sku
        );
        const findInitialPrice: any = dataProduct.find(
            (product: ProductObject) => product.sku === row.sku
        );
        setProductSelected((prev) =>
            prev.map((product, i) =>
                i === index
                    ? {
                          ...product,
                          quantity: product.quantity + 1,
                          salePrice: parseFloat(
                              (
                                  product.salePrice + findInitialPrice.salePrice
                              ).toFixed(2)
                          ),
                      }
                    : product
            )
        );
    };

    const handleDecrementQuantity = (row: any) => {
        const index = productSelected.findIndex(
            (product: Product) => product.sku === row.sku
        );
        const findInitialPrice: any = dataProduct.find(
            (product: ProductObject) => product.sku === row.sku
        );
        setProductSelected((prev) =>
            prev.map((product, i) =>
                i === index
                    ? {
                          ...product,
                          quantity: Math.max(1, product.quantity - 1),
                          salePrice: Math.max(
                              findInitialPrice.salePrice,
                              parseFloat(
                                  (
                                      product.salePrice -
                                      findInitialPrice.salePrice
                                  ).toFixed(2)
                              )
                          ),
                      }
                    : product
            )
        );
    };

    function handelDeleteProduct(row: any) {
        if (row.sku) {
            const index = productSelected.findIndex(
                (product) => product.sku === row.sku
            );
            if (index !== -1) {
                const updatedArray = [
                    ...productSelected.slice(0, index),
                    ...productSelected.slice(index + 1),
                ];
                setProductSelected(updatedArray);
            }
        }
    }

    async function handelCashOut() {
        await addBill(productSelected).then(() => {
            setProductSelected([]);
        });
    }

    const columns: GridColDef<ProductObject>[] = [
        {
            field: "name",
            headerName: "اﻹسم",
            width: 150,
        },
        {
            field: "sku",
            headerName: "الرمز",
            width: 150,
        },
        {
            field: "category",
            headerName: "فئة",
            width: 100,
            renderCell: ({ row }) => {
                return <> {row.category.name} </>;
            },
        },
        {
            field: "quantity",
            headerName: "الكمية",
            width: 150,

            renderCell: ({ row }) => {
                return (
                    <div style={{ display: "flex", gap: "20px" }}>
                        {" "}
                        <div
                            style={{ fontSize: "20px", cursor: "pointer" }}
                            onClick={() => handleIncrementQuantity(row)}
                        >
                            +
                        </div>{" "}
                        <div> {row.quantity} </div>{" "}
                        <div
                            style={{ fontSize: "20px", cursor: "pointer" }}
                            onClick={() => handleDecrementQuantity(row)}
                        >
                            -
                        </div>{" "}
                    </div>
                );
            },
        },
        {
            field: "salePrice",
            headerName: "سعر البيع",
            width: 100,
        },
        {
            field: "action",
            headerName: "حذف",
            width: 150,
            renderCell: ({ row }) => (
                <div
                    onClick={() => handelDeleteProduct(row)}
                    style={{
                        cursor: "pointer",
                        width: "100%",
                        margin: "auto",
                    }}
                >
                    {" "}
                    <DeleteOutlineOutlined />
                </div>
            ),
        },
        // {
        //     field: "costPrice",
        //     headerName: "سعر الكلفة",
        //     width: 100,
        // },
    ];

    const handleSearchProduct = (
        products: Product[],
        searchedProduct: string
    ): Product[] => {
        const trimmedLowerSearchedInput = searchedProduct.trim().toLowerCase();

        if (trimmedLowerSearchedInput === "") {
            return products;
        }

        return products.filter(
            (product) =>
                product.name
                    .toLowerCase()
                    .includes(trimmedLowerSearchedInput) ||
                product.sku.toLowerCase().includes(trimmedLowerSearchedInput)
        );
    };

    const handleSelectedProduct = (product: Product) => {
        const { id, name, Category, sku, salePrice } = product;
        const index = productSelected.findIndex(
            (eachProduct) => eachProduct.sku === sku
        );
        if (index !== -1) {
            const updatedProduct = {
                ...productSelected[index],
                quantity: productSelected[index].quantity + 1,
                salePrice: parseFloat(
                    (
                        (productSelected[index].salePrice /
                            productSelected[index].quantity) *
                        (productSelected[index].quantity + 1)
                    ).toFixed(2)
                ),
            };

            setProductSelected((prev) => {
                const updatedProducts = [...prev];
                updatedProducts[index] = updatedProduct;
                return updatedProducts;
            });
        } else {
            const selected: any = {
                id: id,
                name: name,
                sku: sku,
                category: Category,
                salePrice: salePrice,
                quantity: 1,
            };
            setProductSelected((prev) => [...prev, selected]);
        }
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                maxWidth: "100%",
                minHeight: "calc(100vh - 120px)",
                display: " flex",
                gap: "20px",
            }}
        >
            <Grid sx={{ width: "calc(100% - 300px)" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        sx={{ mt: 2, mb: 2 }}
                        variant="h6"
                        component="div"
                    >
                        الفاتورة
                    </Typography>
                    <Button
                        onClick={() => handelCashOut()}
                        variant="contained"
                        sx={{ height: "max-content" }}
                    >
                        سحب الفاتورة
                    </Button>
                </Box>
                <DataTable columns={columns} rows={productSelected} />
            </Grid>
            <Grid container sx={{ width: "300px" }} spacing={2}>
                <Grid item sx={{ width: "300px" }}>
                    <Typography
                        sx={{ mt: 2, mb: 2 }}
                        variant="h6"
                        component="div"
                    >
                        منتجات
                    </Typography>

                    <TextField
                        sx={{ width: "100%" }}
                        id="standard-basic"
                        label="بحث"
                        variant="standard"
                        onChange={(e: any) =>
                            setSearchedProduct(e.target.value)
                        }
                    />

                    <List dense={dense}>
                        {handleSearchProduct(dataProduct, searchedProduct).map(
                            (product: any, index) => (
                                <ListItem
                                    sx={{ padding: "0" }}
                                    onClick={() =>
                                        handleSelectedProduct(product)
                                    }
                                >
                                    <ListItemText
                                        sx={{
                                            borderRadius: "3px",
                                            paddingY: "2px",
                                            paddingInline: "5px",
                                            cursor: "pointer",
                                            bgcolor: "#ededed",
                                        }}
                                        primary={product.name}
                                        secondary={
                                            secondary ? "Secondary text" : null
                                        }
                                    />
                                </ListItem>
                            )
                        )}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}
