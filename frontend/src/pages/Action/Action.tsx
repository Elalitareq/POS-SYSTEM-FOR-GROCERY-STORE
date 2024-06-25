import { Box, Button, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/dataTable/DataGrid";
import { LoaderContext } from "../../layout";
import { useContext, useState, useEffect } from "react";
import useApiRequests from "../../hooks/useApiRequests";

const ExpandableCell = ({
    content,
    title,
    actionType,
}: {
    content: string;
    title: string;
    actionType: string;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const lineBreaks = (content || "").split("\n");
    const shouldExpand = lineBreaks.length > 1;
    const previewContent = shouldExpand
        ? lineBreaks.slice(0, 1).join("\n") + "..."
        : content;

    console.log(content);
    return (
        <Box sx={{ position: "relative" }}>
            {shouldExpand && (
                <Button
                    sx={{ position: "absolute", top: "2px", right: "2px" }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? "Collapse" : "Expand"}
                </Button>
            )}
            {title && (
                <Typography
                    mb={1}
                    color={actionType === "DELETE" ? "red" : "#00f700"}
                    fontWeight={"bold"}
                >
                    {title}
                </Typography>
            )}
            {(isExpanded || !shouldExpand
                ? content.split("\n")
                : previewContent.split("\n")
            ).map((line, index) => (
                <div key={index}>{line}</div>
            ))}
        </Box>
    );
};

interface ActionObject {
    id: number;
    name: string;
    user: { userName: string };
    title?: string;
    description?: { ar: string; en: string };
    actionType: string;
    lastModified: string;
}

function Action() {
    const { getAllAction } = useApiRequests();
    const navigate = useNavigate();

    const [dataAction, setDataAction] = useState<ActionObject[] | null>(null);

    const isLoad = useContext(LoaderContext);

    useEffect(() => {
        const fetchData = async () => {
            isLoad?.setLoad(true);
            try {
                const res = await getAllAction();
                setDataAction(
                    res.map((data: ActionObject) => {
                        const lineBreaks = (data.description?.ar || "").split(
                            "\n"
                        );
                        const shouldExpand = lineBreaks.length > 2;
                        return { ...data, isExpandable: shouldExpand };
                    })
                );
            } catch (error) {
                console.log("Error fetching data:", error);
            } finally {
                isLoad?.setLoad(false);
            }
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
                return (
                    <ExpandableCell
                        actionType={row?.actionType}
                        title={row?.title || ""}
                        content={row?.description?.ar || "no description"}
                    />
                );
            },
        },
        {
            field: "createdAt",
            headerName: "تاريخ",
            width: 200,
            renderCell: ({ row }) => {
                return <>{row.lastModified.replace("T", " ").slice(0, 16)}</>;
            },
        },
        // Uncomment and customize the Actions column if needed
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
                    isRowHeightDisabled
                    // Uncomment and customize the Add Button if needed
                    // buttonText="إضافة صنف"
                    // onClickAddButton={() => navigate("add-categories")}
                />
            )}
        </Box>
    );
}

export default Action;
