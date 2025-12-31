import Swal from "sweetalert2";

export const successAlert = (title: string) =>
  Swal.fire({
    icon: "success",
    title,
    timer: 1500,
    showConfirmButton: false,
  });

export const errorAlert = (message: string) =>
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });

export const confirmDeleteAlert = async () => {
  const result = await Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: "This action cannot be undone",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Delete",
  });

  return result.isConfirmed;
};