import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

interface DataProps {
    rows: object[];
    columns: any;
    buttonText: string;
    onClickAddButton:any
}

function DataTable({ rows, columns, buttonText ,onClickAddButton }: DataProps) {
    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant="contained" sx={{ margin: "8px" }} onClick={onClickAddButton}>
                    {buttonText}
                </Button>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
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
