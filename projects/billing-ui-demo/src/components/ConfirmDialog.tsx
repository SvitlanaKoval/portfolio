import { Modal } from "./Modal";

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onCancel}
      footer={
        <>
          <button className="ghost" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="danger" onClick={onConfirm}>
            {confirmText}
          </button>
        </>
      }
    >
      <p style={{ margin: 0 }}>{message}</p>
    </Modal>
  );
}
