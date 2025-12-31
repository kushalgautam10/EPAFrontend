import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "./category.schema";
import { Category, CategoryFormValues } from "../../../types/category";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Category>) => void;
  initialData?: Category | null;
};

export const CategoryForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) => {
  const [apiError, setApiError] = useState<string | null>(null);

   const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });


const handleClose = () => {
  reset({
    name: "",
    description: "",
  });
  onClose();
};

  useEffect(() => {
  if (open) {
    if (initialData) {
      // While Editing 
      reset({
        name: initialData.name,
        description: initialData.description ?? "",
      });
    } else {
      // While CREATE MODE and  CLEAR FORM
      reset({
        name: "",
        description: "",
      });
    }
  }
}, [open, initialData, reset]);
   const submitHandler = async (data: CategoryFormValues) => {
    try {
      await onSubmit({ ...data, id: initialData?.id });
    } catch (err: any) {
      setApiError(err?.data?.message || "Something went wrong");
    }
  };

  return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Edit Category" : "Create Category"}
      </DialogTitle>

      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent>
          {apiError && <Alert severity="error">{apiError}</Alert>}

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Description"
            fullWidth
            margin="normal"
            {...register("description")}
             error={!!errors.description}
            helperText={errors.description?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {initialData ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};