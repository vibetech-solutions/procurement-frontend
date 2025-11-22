import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  Progress,
  Group,
  Button,

  Center,
  Box,
  Indicator,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react";
import {
  uploadDocuments,
  fetchUser,
} from "@/lib/redux/features/auth/authSlice";
import { notifications } from "@mantine/notifications";
import { useAppDispatch } from "@/lib/redux/hooks";

interface DocumentsNotUploadedProps {
  certificate_of_registration?: string | null;
  bank_letter?: string | null;
  code_of_conduct?: string | null;
  vendor_verification_form?: string | null;
  commercial_assessment_form?: string | null;
  vat_certificate?: string | null;
  annual_returns?: string | null;
  organisation_structure?: string | null;
}

const DocumentsNotUploaded: React.FC<DocumentsNotUploadedProps> = ({
  certificate_of_registration,
  bank_letter,
  code_of_conduct,
  vendor_verification_form,
  commercial_assessment_form,
  vat_certificate,
  annual_returns,
  organisation_structure,
}) => {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [pageLoading, setPageLoading] = useState(false);

  // Reset state when props change (page refresh)
  useEffect(() => {
    setCurrentStep(0);
    setUploadedFiles({});
  }, [
    certificate_of_registration,
    bank_letter,
    code_of_conduct,
    vendor_verification_form,
    commercial_assessment_form,
    vat_certificate,
    annual_returns,
    organisation_structure,
  ]);

  const documents = [
    {
      key: "certificate_of_registration",
      name: "Certificate of Registration",
      value: certificate_of_registration,
    },
    { key: "bank_letter", name: "Bank Letter", value: bank_letter },
    { key: "code_of_conduct", name: "Code of Conduct", value: code_of_conduct },
    {
      key: "vendor_verification_form",
      name: "Vendor Verification Form",
      value: vendor_verification_form,
    },
    {
      key: "commercial_assessment_form",
      name: "Commercial Assessment Form",
      value: commercial_assessment_form,
    },
    { key: "vat_certificate", name: "VAT Certificate", value: vat_certificate },
    { key: "annual_returns", name: "Annual Returns", value: annual_returns },
    {
      key: "organisation_structure",
      name: "Organisation Structure",
      value: organisation_structure,
    },
  ];

  const missingDocuments = documents.filter((doc) => {
    const isEmpty =
      !doc.value ||
      doc.value === null ||
      doc.value === undefined ||
      doc.value === "" ||
      (typeof doc.value === "object" && Object.keys(doc.value).length === 0);
    return isEmpty;
  });

  // FORCE all documents to be missing if missingDocuments is empty
  const actualMissingDocs =
    missingDocuments.length === 0 ? documents : missingDocuments;

  const handleFileUpload = (files: File[], docKey: string) => {
    if (files.length > 0) {
      setUploadedFiles((prev) => ({ ...prev, [docKey]: files[0] }));
    }
  };

  const nextStep = () => {
    if (currentStep < actualMissingDocs.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitDocuments = async () => {
    setPageLoading(true);
    try {
      await dispatch(uploadDocuments(uploadedFiles)).unwrap();

      notifications.show({
        title: "Success",
        message: "Documents uploaded successfully",
        color: "green",
      });
      // Refresh user data to update document status
      dispatch(fetchUser());
    } catch (error: unknown) {
      console.log("Full error object:", error);

      let errorMessage = "Failed to upload documents";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === "object" && "errors" in error) {
        const errors = (error as { errors: Record<string, unknown> }).errors;
        const firstError = Object.values(errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String((error as { message: unknown }).message);
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        autoClose: 5000,
        withCloseButton: true,
        position: "bottom-right",
      });
    } finally {
      setPageLoading(false);
    }
  };

  const currentDoc = actualMissingDocs[currentStep];
  const isLastStep = currentStep === actualMissingDocs.length - 1;
  const canProceed = currentDoc ? uploadedFiles[currentDoc.key] : false;

  return (
    <Container
      size="md"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Center w="100%">
        <Paper
          shadow="sm"
          p="xl"
          radius="md"
          style={{ width: "100%", maxWidth: 600 }}
        >
          <Box mb="xl">
            <Title order={2} mb="xs">
              Document Upload Required
            </Title>
            <Text color="dimmed">
              Please upload the following documents to access the system.
            </Text>
          </Box>

          <Box mb="xl">
            <Group justify="apart" mb="xs">
              <Text size="sm" fw={500}>
                Step {currentStep + 1} of {actualMissingDocs.length}
              </Text>
              <Group gap={4}>
                {actualMissingDocs.map((_, index) => (
                  <Indicator
                    key={index}
                    size={12}
                    color={index <= currentStep ? "blue" : "gray"}
                    processing={false}
                  />
                ))}
              </Group>
            </Group>
            <Progress
              value={((currentStep + 1) / actualMissingDocs.length) * 100}
              size="sm"
              radius="xl"
            />
          </Box>

          <Box mb="xl">
            <Title order={3} mb="lg">
              Upload {currentDoc?.name || "Document"}
            </Title>

            <Dropzone
              onDrop={(files) => handleFileUpload(files, currentDoc?.key || "")}
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
              <Group
                justify="center"
                gap="xl"
                style={{ minHeight: 120, pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload size={50} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size={50} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size={50} stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    {currentDoc && uploadedFiles[currentDoc.key]
                      ? "File Selected"
                      : "Click to upload"}
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    {currentDoc && uploadedFiles[currentDoc.key]
                      ? uploadedFiles[currentDoc.key].name
                      : "PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB)"}
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </Box>

          <Group justify="apart">
            <Button
              variant="default"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>

            {isLastStep ? (
              <Button
                onClick={submitDocuments}
                disabled={!canProceed || pageLoading}
                color="green"
                loading={pageLoading}
              >
                Submit Documents
              </Button>
            ) : (
              <Button onClick={nextStep} disabled={!canProceed}>
                Next
              </Button>
            )}
          </Group>
        </Paper>
      </Center>
    </Container>
  );
};

export default DocumentsNotUploaded;
