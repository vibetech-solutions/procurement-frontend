"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Stepper,
  Group,
  TextInput,
  Textarea,
  NumberInput,
  PasswordInput,
  Box,
  Modal,
  Tabs,
  Select,
  MultiSelect,

  Checkbox,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import {
  IconBuilding,
  IconFileText,
  IconWorld,
  IconMapPin,
  IconPhone,
  IconMail,
  IconLock,
  IconTruck,

} from "@tabler/icons-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { register } from "@/lib/redux/features/auth/authSlice";
import { RegisterPayload } from "@/lib/redux/features/auth/types/register-user-payload";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import clientaxiosinstance from "@/lib/services/clientaxiosinstance";

export default function Registration() {
  const [activeTab, setActiveTab] = useState<string | null>("company");
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [taxId, setTaxId] = useState("");
  const [website, setWebsite] = useState("");
  const [yearEstablished, setYearEstablished] = useState<string | number>("");
  const [description, setDescription] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [supplierLegalName, setSupplierLegalName] = useState("");
  const [tradingName, setTradingName] = useState("");
  const [supplierRegistrationNumber, setSupplierRegistrationNumber] =
    useState("");
  const [supplierVatTaxId, setSupplierVatTaxId] = useState("");
  const [country, setCountry] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [industryCodes, setIndustryCodes] = useState("");
  const [productCategories, setProductCategories] = useState<string[]>([]);

  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [swiftBic, setSwiftBic] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataProcessingConsent, setDataProcessingConsent] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [gdprModalOpen, setGdprModalOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();



  useEffect(() => {
    const formData = {
      companyName,
      registrationNumber,
      taxId,
      website,
      yearEstablished,
      description,
      warehouseName,
      warehouseAddress,
      contactPhone,
      supplierLegalName,
      tradingName,
      supplierRegistrationNumber,
      supplierVatTaxId,
      country,
      physicalAddress,
      postalAddress,
      industryCodes,
      productCategories,
      bankName,
      bankAccountNumber,
      swiftBic,
      paymentTerms,
      email,
      phone,
    };
    localStorage.setItem("registrationForm", JSON.stringify(formData));
  }, [
    companyName,
    registrationNumber,
    taxId,
    website,
    yearEstablished,
    description,
    warehouseName,
    warehouseAddress,
    contactPhone,
    supplierLegalName,
    tradingName,
    supplierRegistrationNumber,
    supplierVatTaxId,
    country,
    physicalAddress,
    postalAddress,
    industryCodes,
    productCategories,
    bankName,
    bankAccountNumber,
    swiftBic,
    paymentTerms,
    email,
    phone,
  ]);

  // Restore form data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("registrationForm");
    if (saved) {
      const data = JSON.parse(saved);
      setCompanyName(data.companyName || "");
      setRegistrationNumber(data.registrationNumber || "");
      setTaxId(data.taxId || "");
      setWebsite(data.website || "");
      setYearEstablished(data.yearEstablished || "");
      setDescription(data.description || "");
      setWarehouseName(data.warehouseName || "");
      setWarehouseAddress(data.warehouseAddress || "");
      setContactPhone(data.contactPhone || "");
      setSupplierLegalName(data.supplierLegalName || "");
      setTradingName(data.tradingName || "");
      setSupplierRegistrationNumber(data.supplierRegistrationNumber || "");
      setSupplierVatTaxId(data.supplierVatTaxId || "");
      setCountry(data.country || "");
      setPhysicalAddress(data.physicalAddress || "");
      setPostalAddress(data.postalAddress || "");
      setIndustryCodes(data.industryCodes || "");
      setProductCategories(data.productCategories || []);
      setBankName(data.bankName || "");
      setBankAccountNumber(data.bankAccountNumber || "");
      setSwiftBic(data.swiftBic || "");
      setPaymentTerms(data.paymentTerms || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
    }
  }, []);

  // Reset inputs when switching tabs
  useEffect(() => {
    setActive(0);
    setCompanyName("");
    setRegistrationNumber("");
    setTaxId("");
    setWebsite("");
    setYearEstablished("");
    setDescription("");
    setWarehouseName("");
    setWarehouseAddress("");
    setContactPhone("");
    setSupplierLegalName("");
    setTradingName("");
    setSupplierRegistrationNumber("");
    setSupplierVatTaxId("");
    setCountry("");
    setPhysicalAddress("");
    setPostalAddress("");
    setIndustryCodes("");
    setProductCategories([]);
    setBankName("");
    setBankAccountNumber("");
    setSwiftBic("");
    setPaymentTerms("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setTermsAccepted(false);
    setDataProcessingConsent(false);
  }, [activeTab]);

  const validateStep = (step: number) => {
    if (activeTab === "company") {
      switch (step) {
        case 0:
          return (
            companyName.trim() !== "" &&
            registrationNumber.trim() !== "" &&
            taxId.trim() !== ""
          );
        case 1:
          return (
            warehouseName.trim() !== "" &&
            warehouseAddress.trim() !== "" &&
            contactPhone.trim() !== ""
          );
        case 2:
          return (
            email.trim() !== "" &&
            phone.trim() !== "" &&
            password.trim() !== "" &&
            confirmPassword.trim() !== "" &&
            password === confirmPassword
          );
        default:
          return false;
      }
    } else {
      switch (step) {
        case 0:
          return (
            supplierLegalName.trim() !== "" &&
            supplierRegistrationNumber.trim() !== "" &&
            supplierVatTaxId.trim() !== "" &&
            country.trim() !== "" &&
            physicalAddress.trim() !== ""
          );
        case 1:
          return (
            email.trim() !== "" &&
            phone.trim() !== "" &&
            password.trim() !== "" &&
            confirmPassword.trim() !== "" &&
            password === confirmPassword &&
            bankName.trim() !== "" &&
            bankAccountNumber.trim() !== "" &&
            termsAccepted &&
            dataProcessingConsent
          );
        default:
          return false;
      }
    }
  };

  const nextStep = () => {
    if (validateStep(active)) {
      setActive((current) => (current < 2 ? current + 1 : current));
    } else {
      setErrorMessage("Please fill in all required fields before proceeding.");
      setErrorModalOpen(true);
    }
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async () => {
    if (validateStep(1)) {
      setLoading(true);
      const companyRegData = {
        role: "merchant",
        companyInfo: {
          name: companyName,
          registration_number: registrationNumber,
          tax_id: taxId,
          website,
          year_establised: yearEstablished,
          description,
        },
        warehouseDetails: {
          warehouse_name: warehouseName,
          warehouse_address: warehouseAddress,
          contact_phone: contactPhone,
        },
        accountDetails: {
          email,
          phone,
          password,
          password_confirmation: confirmPassword,
        },
      } as const;

      const supplierRegData = new FormData();

      // Role
      supplierRegData.append("role", "supplier");

      // Company Info
      supplierRegData.append("companyInfo[name]", supplierLegalName);
      supplierRegData.append("companyInfo[trading_name]", tradingName);
      supplierRegData.append(
        "companyInfo[registration_number]",
        supplierRegistrationNumber
      );
      supplierRegData.append("companyInfo[tax_id]", supplierVatTaxId);
      supplierRegData.append("companyInfo[website]", "");
      supplierRegData.append("companyInfo[year_establised]", "");
      supplierRegData.append("companyInfo[description]", "");

      // Financials
      supplierRegData.append("financials[bank_name]", bankName);
      supplierRegData.append(
        "financials[bank_account_number]",
        bankAccountNumber
      );
      supplierRegData.append("financials[swift_bic]", swiftBic);
      supplierRegData.append("financials[payment_terms]", paymentTerms);

      supplierRegData.append("accountDetails[email]", email);
      supplierRegData.append("accountDetails[phone]", phone);
      supplierRegData.append("accountDetails[password]", password);
      supplierRegData.append(
        "accountDetails[password_confirmation]",
        confirmPassword
      );

      let finalData = null;
      if (activeTab === "company") {
        finalData = companyRegData as RegisterPayload;
      } else {
        finalData = supplierRegData;
      }

      try {
        await clientaxiosinstance.get("/sanctum/csrf-cookie");

        if (activeTab === "company") {
          await dispatch(register(finalData as RegisterPayload)).unwrap();
        } else {
          // Direct API call for supplier registration with FormData
          await clientaxiosinstance.post("/register", finalData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        localStorage.removeItem("registrationForm");
        router.push("/");
        setLoading(false);
      } catch (error: unknown) {
        let errorMessage = "Registration failed";
        
        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } };
          if (axiosError.response?.data?.errors) {
            const errors = axiosError.response.data.errors;
            const errorMessages = Object.entries(errors)
              .map(([field, messages]) => {
                const fieldName = field.replace(/\./g, ' ').replace(/([A-Z])/g, ' $1').toLowerCase();
                return `${fieldName}: ${Array.isArray(messages) ? messages[0] : messages}`;
              })
              .join('\n');
            errorMessage = errorMessages;
          } else if (axiosError.response?.data?.message) {
            errorMessage = axiosError.response.data.message;
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        notifications.show({
          title: "Error",
          message: errorMessage,
          color: "red",
          autoClose: 5000,
          withCloseButton: true,
          icon: <IconBuilding size={16} />,
          position: "bottom-right",
        });
        setLoading(false);
      }
    } else {
      setErrorMessage(
        "Please fill in all required fields and ensure passwords match."
      );
      setErrorModalOpen(true);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor:
          "light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))",
        padding: "40px 0",
      }}
    >
      <Box style={{ position: "absolute", top: 20, right: 20 }}>
        <ThemeToggle />
      </Box>
      <Container size={800}>
        <Stack gap="lg">
          <div style={{ textAlign: "center" }}>
            <Title order={1} mb="xs" c="dimmed">
              Create Your Account
            </Title>
            <Text c="dimmed" size="sm">
              Register as a company or supplier to start using ProcurementHub
            </Text>
          </div>

          <Paper withBorder shadow="md" p={30} radius="md">
            <Tabs value={activeTab} onChange={setActiveTab} mb="xl">
              <Tabs.List grow>
                <Tabs.Tab
                  value="company"
                  leftSection={<IconBuilding size={16} />}
                >
                  Company Registration
                </Tabs.Tab>
                <Tabs.Tab
                  value="supplier"
                  leftSection={<IconTruck size={16} />}
                >
                  Supplier Registration
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="company" mt="xl">
                <Stepper active={active} size="sm">
                  <Stepper.Step
                    label="Company Info"
                    description="Basic details"
                    c="dimmed"
                  >
                    <Stack gap="md" mt="xl">
                      <TextInput
                        c="dimmed"
                        label="Company Name"
                        placeholder="Acme Corporation"
                        leftSection={<IconBuilding size={16} />}
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />

                      <Group grow>
                        <TextInput
                          c="dimmed"
                          label="Company Registration Number"
                          placeholder="12345678"
                          leftSection={<IconFileText size={16} />}
                          required
                          value={registrationNumber}
                          onChange={(e) =>
                            setRegistrationNumber(e.target.value)
                          }
                        />

                        <TextInput
                          c="dimmed"
                          label="Tax ID / VAT Number"
                          placeholder="XX-XXXXXXX"
                          leftSection={<IconFileText size={16} />}
                          required
                          value={taxId}
                          onChange={(e) => setTaxId(e.target.value)}
                        />
                      </Group>

                      <Group grow>
                        <TextInput
                          c="dimmed"
                          label="Company Website"
                          placeholder="https://www.company.com"
                          leftSection={<IconWorld size={16} />}
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                        />

                        <NumberInput
                          c="dimmed"
                          label="Year Established"
                          placeholder="2020"
                          min={1800}
                          max={new Date().getFullYear()}
                          value={yearEstablished}
                          onChange={setYearEstablished}
                        />
                      </Group>

                      <Textarea
                        c="dimmed"
                        label="Company Description"
                        placeholder="Brief description of your company..."
                        minRows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Stack>
                  </Stepper.Step>

                  <Stepper.Step
                    label="Warehouse Details"
                    description="Warehouse info"
                    c="dimmed"
                  >
                    <Stack gap="md" mt="xl">
                      <TextInput
                        c="dimmed"
                        label="Warehouse Name"
                        placeholder="Main Warehouse"
                        leftSection={<IconBuilding size={16} />}
                        required
                        value={warehouseName}
                        onChange={(e) => setWarehouseName(e.target.value)}
                      />

                      <TextInput
                        label="Warehouse Address"
                        c="dimmed"
                        placeholder="123 Warehouse Street"
                        leftSection={<IconMapPin size={16} />}
                        required
                        value={warehouseAddress}
                        onChange={(e) => setWarehouseAddress(e.target.value)}
                      />

                      <TextInput
                        c="dimmed"
                        label="Contact Phone"
                        placeholder="+1 (555) 123-4567"
                        leftSection={<IconPhone size={16} />}
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                      />
                    </Stack>
                  </Stepper.Step>

                  <Stepper.Step
                    label="Account Details"
                    description="Login credentials"
                    c="dimmed"
                  >
                    <Stack gap="md" mt="xl">
                      <TextInput
                        c="dimmed"
                        label="Email Address"
                        placeholder="admin@company.com"
                        leftSection={<IconMail size={16} />}
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <TextInput
                        c="dimmed"
                        label="Phone Number"
                        placeholder="+254 712 345 678"
                        leftSection={<IconPhone size={16} />}
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />

                      <PasswordInput
                        c="dimmed"
                        label="Password"
                        placeholder="Enter your password"
                        leftSection={<IconLock size={16} />}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <PasswordInput
                        c="dimmed"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        leftSection={<IconLock size={16} />}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={
                          confirmPassword && password !== confirmPassword
                            ? "Passwords do not match"
                            : null
                        }
                      />
                    </Stack>
                  </Stepper.Step>

                  <Stepper.Completed>
                    <Stack gap="md" mt="xl" align="center">
                      <Title order={3} c="var(--mantine-color-text)">
                        Registration Complete!
                      </Title>
                      <Text c="dimmed" ta="center">
                        Your company registration has been submitted. You will
                        receive a confirmation email once your account is
                        approved.
                      </Text>
                      <Button mt="md">Go to Login</Button>
                    </Stack>
                  </Stepper.Completed>
                </Stepper>

                <Group justify="space-between" mt="xl">
                  <Button
                    variant="default"
                    onClick={prevStep}
                    disabled={active === 0 || active === 3}
                  >
                    Back
                  </Button>
                  {active < 2 ? (
                    <Button onClick={nextStep}>Next Step</Button>
                  ) : active === 2 ? (
                    <Button onClick={handleSubmit} loading={loading}>
                      Submit Registration
                    </Button>
                  ) : null}
                </Group>
              </Tabs.Panel>

              <Tabs.Panel value="supplier" mt="xl">
                <Stepper active={active} size="sm">
                  <Stepper.Step
                    label="Company & Contact Info"
                    description="Basic details"
                    c="dimmed"
                  >
                    <Stack gap="md" mt="xl">
                      <Title order={4} c="dimmed">
                        Company Information
                      </Title>
                      <Group grow>
                        <TextInput
                          c="dimmed"
                          label="Company Legal Name"
                          placeholder="ABC Supplies Ltd"
                          leftSection={<IconBuilding size={16} />}
                          required
                          value={supplierLegalName}
                          onChange={(e) => setSupplierLegalName(e.target.value)}
                        />
                        <TextInput
                          c="dimmed"
                          label="Trading Name (Optional)"
                          placeholder="ABC Supplies"
                          value={tradingName}
                          onChange={(e) => setTradingName(e.target.value)}
                        />
                      </Group>

                      <Group grow>
                        <TextInput
                          c="dimmed"
                          label="Registration Number / Business ID"
                          placeholder="12345678"
                          leftSection={<IconFileText size={16} />}
                          required
                          value={supplierRegistrationNumber}
                          onChange={(e) =>
                            setSupplierRegistrationNumber(e.target.value)
                          }
                        />
                        <TextInput
                          c="dimmed"
                          label="VAT / Tax ID"
                          placeholder="XX-XXXXXXX"
                          leftSection={<IconFileText size={16} />}
                          required
                          value={supplierVatTaxId}
                          onChange={(e) => setSupplierVatTaxId(e.target.value)}
                        />
                      </Group>

                      <Group grow>
                        <Select
                          c="dimmed"
                          label="Country"
                          placeholder="Select country"
                          required
                          value={country}
                          onChange={(value) => setCountry(value || "")}
                          data={[
                            "Kenya",
                            "Uganda",
                            "Tanzania",
                            "Rwanda",
                            "Other",
                          ]}
                        />
                        <TextInput
                          c="dimmed"
                          label="Industry / SIC / NAICS Codes"
                          placeholder="Manufacturing, IT, etc."
                          value={industryCodes}
                          onChange={(e) => setIndustryCodes(e.target.value)}
                        />
                      </Group>

                      <TextInput
                        c="dimmed"
                        label="Physical Address"
                        placeholder="123 Business Street, City"
                        leftSection={<IconMapPin size={16} />}
                        required
                        value={physicalAddress}
                        onChange={(e) => setPhysicalAddress(e.target.value)}
                      />

                      <TextInput
                        c="dimmed"
                        label="Postal Address (Optional)"
                        placeholder="P.O. Box 123, City"
                        leftSection={<IconMapPin size={16} />}
                        value={postalAddress}
                        onChange={(e) => setPostalAddress(e.target.value)}
                      />

                      <MultiSelect
                        c="dimmed"
                        label="Product / Service Categories"
                        placeholder="Select categories"
                        value={productCategories}
                        onChange={setProductCategories}
                        data={[
                          "Office Supplies",
                          "IT Equipment",
                          "Furniture",
                          "Cleaning Supplies",
                          "Catering",
                          "Construction Materials",
                          "Professional Services",
                          "Other",
                        ]}
                      />
                    </Stack>
                  </Stepper.Step>

                  <Stepper.Step
                    label="Account & Financial Details"
                    description="Login, payment & terms"
                    c="dimmed"
                  >
                    <Stack gap="md" mt="xl">
                      <Title order={4} c="dimmed">
                        Account Details
                      </Title>
                      <Group grow>
                        <TextInput
                          c="dimmed"
                          label="Email Address (Username)"
                          placeholder="admin@supplier.com"
                          leftSection={<IconMail size={16} />}
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextInput
                          c="dimmed"
                          label="Phone Number"
                          placeholder="+254 712 345 678"
                          leftSection={<IconPhone size={16} />}
                          required
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Group>

                      <Group grow>
                        <PasswordInput
                          c="dimmed"
                          label="Password"
                          placeholder="Enter your password"
                          leftSection={<IconLock size={16} />}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <PasswordInput
                          c="dimmed"
                          label="Confirm Password"
                          placeholder="Confirm your password"
                          leftSection={<IconLock size={16} />}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          error={
                            confirmPassword && password !== confirmPassword
                              ? "Passwords do not match"
                              : null
                          }
                        />
                      </Group>

                      <Title order={4} c="dimmed" mt="lg">
                        Financial Details
                      </Title>
                      <Group grow>
                        <TextInput
                          c="dimmed"
                          label="Bank Name"
                          placeholder="ABC Bank"
                          required
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                        />
                        <TextInput
                          c="dimmed"
                          label="Bank Account Number / IBAN"
                          placeholder="1234567890"
                          required
                          value={bankAccountNumber}
                          onChange={(e) => setBankAccountNumber(e.target.value)}
                        />
                      </Group>

                      <TextInput
                        c="dimmed"
                        label="SWIFT/BIC (Optional)"
                        placeholder="ABCDKENA"
                        value={swiftBic}
                        onChange={(e) => setSwiftBic(e.target.value)}
                      />

                      <Title order={4} c="dimmed" mt="lg">
                        Payment Terms (Optional)
                      </Title>
                      <RichTextEditor
                        editor={useEditor({
                          extensions: [
                            StarterKit,
                            Underline,
                            Superscript,
                            SubScript,
                            Highlight,
                            TextAlign.configure({
                              types: ["heading", "paragraph"],
                            }),
                          ],
                          content: paymentTerms || "<p></p>",
                          immediatelyRender: false,
                          onUpdate: ({ editor }) => {
                            setPaymentTerms(editor.getHTML());
                          },
                        })}
                      >
                        <RichTextEditor.Toolbar sticky stickyOffset={60}>
                          <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Bold />
                            <RichTextEditor.Italic />
                            <RichTextEditor.Underline />
                            <RichTextEditor.Strikethrough />
                            <RichTextEditor.ClearFormatting />
                            <RichTextEditor.Highlight />
                            <RichTextEditor.Code />
                          </RichTextEditor.ControlsGroup>

                          <RichTextEditor.ControlsGroup>
                            <RichTextEditor.H1 />
                            <RichTextEditor.H2 />
                            <RichTextEditor.H3 />
                            <RichTextEditor.H4 />
                          </RichTextEditor.ControlsGroup>

                          <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Blockquote />
                            <RichTextEditor.Hr />
                            <RichTextEditor.BulletList />
                            <RichTextEditor.OrderedList />
                            <RichTextEditor.Subscript />
                            <RichTextEditor.Superscript />
                          </RichTextEditor.ControlsGroup>

                          <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Link />
                            <RichTextEditor.Unlink />
                          </RichTextEditor.ControlsGroup>

                          <RichTextEditor.ControlsGroup>
                            <RichTextEditor.AlignLeft />
                            <RichTextEditor.AlignCenter />
                            <RichTextEditor.AlignJustify />
                            <RichTextEditor.AlignRight />
                          </RichTextEditor.ControlsGroup>
                        </RichTextEditor.Toolbar>
                        <RichTextEditor.Content
                          style={{ minHeight: "150px" }}
                        />
                      </RichTextEditor>

                      <Title order={4} c="dimmed" mt="lg">
                        Agreements
                      </Title>
                      <Checkbox
                        c="dimmed"
                        label={
                          <Text>
                            I accept the{" "}
                            <Text
                              component="span"
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              c="blue"
                              onClick={() => setTermsModalOpen(true)}
                            >
                              Supplier Terms & Conditions
                            </Text>
                          </Text>
                        }
                        required
                        checked={termsAccepted}
                        onChange={(event) =>
                          setTermsAccepted(event.currentTarget.checked)
                        }
                      />
                      <Checkbox
                        c="dimmed"
                        label={
                          <Text>
                            I consent to{" "}
                            <Text
                              component="span"
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              c="blue"
                              onClick={() => setGdprModalOpen(true)}
                            >
                              data processing (GDPR compliance)
                            </Text>
                          </Text>
                        }
                        required
                        checked={dataProcessingConsent}
                        onChange={(event) =>
                          setDataProcessingConsent(event.currentTarget.checked)
                        }
                      />
                    </Stack>
                  </Stepper.Step>

                  <Stepper.Completed>
                    <Stack gap="md" mt="xl" align="center">
                      <Title order={3} c="var(--mantine-color-text)">
                        Registration Complete!
                      </Title>
                      <Text c="dimmed" ta="center">
                        Your supplier registration has been submitted. You will
                        receive a confirmation email once your account is
                        approved.
                      </Text>
                      <Button mt="md">Go to Login</Button>
                    </Stack>
                  </Stepper.Completed>
                </Stepper>

                <Group justify="space-between" mt="xl">
                  <Button
                    variant="default"
                    onClick={prevStep}
                    disabled={active === 0 || active === 2}
                  >
                    Back
                  </Button>
                  {active < 1 ? (
                    <Button onClick={nextStep}>Next Step</Button>
                  ) : active === 1 ? (
                    <Button onClick={handleSubmit} loading={loading}>
                      Submit Registration
                    </Button>
                  ) : null}
                </Group>
              </Tabs.Panel>
            </Tabs>

            <Text size="sm" c="dimmed" ta="center" mt="xl">
              Already have an account?{" "}
              <Link
                href={"/auth/login"}
                style={{ cursor: "pointer" }}
                className="text-blue-500"
              >
                Sign in
              </Link>
            </Text>
          </Paper>
        </Stack>
      </Container>

      <Modal
        opened={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Validation Error"
        centered
      >
        <Stack gap="md">
          <Text>{errorMessage}</Text>
          <Group justify="flex-end">
            <Button onClick={() => setErrorModalOpen(false)}>OK</Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="Supplier Terms & Conditions"
        size="lg"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            <strong>1. General Terms</strong>
            <br />
            By registering as a supplier, you agree to provide accurate
            information and maintain compliance with all applicable laws and
            regulations.
          </Text>
          <Text size="sm">
            <strong>2. Quality Standards</strong>
            <br />
            All products and services must meet the specified quality standards
            and be delivered within agreed timelines.
          </Text>
          <Text size="sm">
            <strong>3. Payment Terms</strong>
            <br />
            Payments will be processed according to the agreed payment terms.
            Late deliveries may result in payment delays.
          </Text>
          <Text size="sm">
            <strong>4. Compliance</strong>
            <br />
            Suppliers must maintain all required certifications and comply with
            local regulations including tax obligations.
          </Text>
          <Group justify="flex-end">
            <Button variant="outline" onClick={() => setTermsModalOpen(false)}>
              Close
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={gdprModalOpen}
        onClose={() => setGdprModalOpen(false)}
        title="Data Processing Consent (GDPR)"
        size="lg"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            <strong>Data Collection</strong>
            <br />
            We collect and process your personal and business information to
            facilitate supplier registration and ongoing business relationships.
          </Text>
          <Text size="sm">
            <strong>Data Usage</strong>
            <br />
            Your data will be used for verification, communication, payment
            processing, and compliance purposes.
          </Text>
          <Text size="sm">
            <strong>Data Sharing</strong>
            <br />
            We may share your information with authorized personnel and
            third-party services necessary for business operations.
          </Text>
          <Text size="sm">
            <strong>Your Rights</strong>
            <br />
            You have the right to access, modify, or delete your personal data.
            Contact us for any data-related requests.
          </Text>
          <Group justify="flex-end">
            <Button variant="outline" onClick={() => setGdprModalOpen(false)}>
              Close
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}
