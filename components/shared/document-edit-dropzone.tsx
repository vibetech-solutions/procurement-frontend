import React, { useState } from "react";
import { Dropzone } from "@mantine/dropzone";
import { Group, Text, Button } from "@mantine/core";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react";
import { uploadDocuments, fetchUser } from "@/lib/redux/features/auth/authSlice";
import { notifications } from "@mantine/notifications";
import { useAppDispatch } from "@/lib/redux/hooks";

interface DocumentEditDropzoneProps {
  documentKey: string;
  documentName: string;
  onCancel: () => void;
}

export const DocumentEditDropzone: React.FC<DocumentEditDropzoneProps> = ({
  documentKey,
  documentName,
  onCancel,
}) => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    try {
      await dispatch(uploadDocuments({ [documentKey]: selectedFile })).unwrap();
      notifications.show({
        title: "Success",
        message: `${documentName} updated successfully`,
        color: "green",
      });
      dispatch(fetchUser());
      onCancel();
    } catch (error: unknown) {
      let errorMessage = "Failed to update document";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === "object" && "errors" in error) {
        const errors = (error as { errors: Record<string, unknown> }).errors;
        const firstError = Object.values(errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String((error as { message: unknown }).message);
      }
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dropzone
        onDrop={handleFileUpload}
        accept={[
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "image/jpeg",
          "image/png",
        ]}
        maxSize={10 * 1024 ** 2}
      >
        <Group justify="center" gap="xl" style={{ minHeight: 80, pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload size={30} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={30} stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={30} stroke={1.5} />
          </Dropzone.Idle>
          <div>
            <Text size="sm" inline>
              {selectedFile ? selectedFile.name : `Upload new ${documentName}`}
            </Text>
            <Text size="xs" color="dimmed" inline mt={7}>
              PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB)
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Group justify="flex-end" mt="sm">
        <Button variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!selectedFile || loading} loading={loading}>
          Update Document
        </Button>
      </Group>
    </>
  );
};