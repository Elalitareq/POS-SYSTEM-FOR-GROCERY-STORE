import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

interface DataProps {
    rows: object[];
    columns?: any;
    buttonText?: string;
    onClickAddButton?: any;
    disableColumnMenu?: boolean;
}

function DataTable({
    rows,
    columns,
    buttonText,
    onClickAddButton,
    disableColumnMenu,
}: DataProps) {
    return (
        <Box>
            {buttonText && (
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button
                        variant="contained"
                        sx={{ margin: "8px" }}
                        onClick={onClickAddButton}
                    >
                        {buttonText}
                    </Button>
                </Box>
            )}
            <DataGrid
                disableColumnMenu={disableColumnMenu}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default DataTable;
