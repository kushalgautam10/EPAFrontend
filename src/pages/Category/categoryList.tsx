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
} from "../../api/categoryApi";

import { Category } from "../../types/category";
import { AppDataGrid } from "../Common/DataGrid";
import { DeleteConfirmDialog } from "../Common/deleteDialog";
import { CategoryForm } from "./categoryForm";

const CategoryList = () => {
  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize: 10,
    });

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
    } else {
      await createCategory(payload).unwrap();
    }
    setOpenForm(false);
  };

  const onConfirmDelete = async () => {
    if (!selected) return;
    await deleteCategory(selected.id).unwrap();
    setOpenDelete(false);
  };

  const columns: GridColDef<Category>[] = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 80 },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "description", headerName: "Description", flex: 1 },
      {
        field: "actions",
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