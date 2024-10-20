import React from "react";
import { Button, ButtonProps } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

import { useDeleteSudokuGameMutation, useDeleteUserMutation } from "../graphql";
import { showSuccessNotification } from "../utils/showNotification";

interface Props {
  id?: string;
  onCompleted: () => void;
  type: "user" | "sudokuGame";
}

const DeleteButton: React.FC<Props & ButtonProps> = ({
  id,
  onCompleted,
  type,
  ...buttonProps
}) => {
  const handleCompleted = () => {
    showSuccessNotification(`Deleted ${type} successfully`);
    onCompleted();
  };

  const [deleteUser, userResp] = useDeleteUserMutation({
    onCompleted: handleCompleted,
  });
  const [deleteSudokuGame, sudokuGameResp] = useDeleteSudokuGameMutation({
    onCompleted: handleCompleted,
  });

  const handleDelete = () => {
    if (!id) return;
    if (type === "user") {
      deleteUser({ variables: { id } });
    } else if (type === "sudokuGame") {
      deleteSudokuGame({ variables: { id } });
    }
  };

  const openModal = () => {
    modals.openConfirmModal({
      title: "Are you sure?",
      children: "This action cannot be undone",
      onConfirm: handleDelete,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
    });
  };

  const loading = userResp.loading || sudokuGameResp.loading;

  return (
    <Button
      disabled={!id}
      color="red"
      onClick={openModal}
      loading={loading}
      rightSection={<IconTrash />}
      {...buttonProps}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
