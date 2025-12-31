import { useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import { green } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";

import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../api/categoryApi";

import { CategoryForm } from "./categoryForm";
import { Category } from "../../../types/category";
import { AppDataGrid } from "../../../components/common/DataGrid";
import { DeleteConfirmDialog } from "../../../components/common/deleteDialog";
import { useSnackbar } from "../../../hooks/useSnackbar";

const CategoryList = () => {
  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize: 10,
    });
  const { showSnackbar } = useSnackbar();
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);

  const { data, isLoading } = useGetCategoriesQuery({
    pageNumber: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const onEdit = (row: Category) => {
    setSelected(row);
    setOpenForm(true);
  };

  const onDeleteClick = (row: Category) => {
    setSelected(row);
    setOpenDelete(true);
  };

  const handleSubmit = async (payload: Partial<Category>) => {
       if (payload.id) {
      await updateCategory(payload).unwrap();
       showSnackbar("Category updated successfully");
    } else {
      await createCategory(payload).unwrap();
       showSnackbar("Category added successfully");
    }
    setOpenForm(false);
  };

  const onConfirmDelete = async () => {
  if (!selected) return;
  try {
    await deleteCategory(selected.id).unwrap();
    setOpenDelete(false);
     showSnackbar("Category deleted successfully");
  } catch (err: any) {
    showSnackbar(err?.data?.message || "Delete failed", "error");
  }
};

  const columns: GridColDef<Category>[] = useMemo(
    () => [
       {
      field: "serial",
      headerName: "S.No",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          paginationModel.page * paginationModel.pageSize +
          params.api.getRowIndexRelativeToVisibleRows(params.id) +
          1
        );
      },
    },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "description", headerName: "Description", flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 120,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => onEdit(params.row)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDeleteClick(params.row)}
          />,
        ],
      },
    ],
    []
  );

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <h2>Categories</h2>
        <Icon
          sx={{ color: green[500], cursor: "pointer" }}
          onClick={() => {
            setSelected(null);
            setOpenForm(true);
          }}
        >
          add_circle
        </Icon>
      </Stack>

      <AppDataGrid
        rows={data?.data ?? []}
        columns={columns}
        loading={isLoading}
        rowCount={data?.totalCount ?? 0}
        paginationModel={paginationModel}
        onPaginationChange={setPaginationModel}
      />

      <CategoryForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        initialData={selected}
      />

      <DeleteConfirmDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onConfirmDelete}
        loading={isDeleting}
        title="Delete Category"
        description={`Are you sure you want to delete "${selected?.name}"?`}
      />
    </>
  );
};

export default CategoryList;