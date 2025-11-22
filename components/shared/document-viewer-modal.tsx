import { Modal } from "@mantine/core";

interface DocumentViewerModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export function DocumentViewerModal({ opened, onClose, title, url }: DocumentViewerModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size="xl"
    >
      <iframe
        src={url}
        width="100%"
        height="600px"
        style={{ border: 'none' }}
      />
    </Modal>
  );
}