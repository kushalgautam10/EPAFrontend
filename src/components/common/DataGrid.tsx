import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface Props<T extends GridValidRowModel>{
  rows: T[];
  columns: GridColDef<T>[];
  loading: boolean;
  rowCount: number;
  paginationModel: GridPaginationModel;
  onPaginationChange: (model: GridPaginationModel) => void;
}

export function AppDataGrid<T extends GridValidRowModel>({
  rows,
  columns,
  loading,
  rowCount,
  paginationModel,
  onPaginationChange,
}: Props<T>) {
  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationChange}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}