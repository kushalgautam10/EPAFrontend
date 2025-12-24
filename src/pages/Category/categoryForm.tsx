import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Category } from "../../types/category";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description ?? "");
    } else {
      setName("");
      setDescription("");
    }
  }, [initialData]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Edit Category" : "Create Category"}
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() =>
            onSubmit({
              id: initialData?.id,
              name,
              description,
            })
          }
        >
          {initialData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};