import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

interface DataProps {
  rows: object[];
  columns: any;
  buttonText: string;
  onClickAddButton: any;
}

function DataTable({ rows, columns, buttonText, onClickAddButton }: DataProps) {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          sx={{ margin: "8px", marginRight: "0" }}
          onClick={onClickAddButton}
        >
          {buttonText}
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
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
    </Box>
  );
}

export default DataTable;
