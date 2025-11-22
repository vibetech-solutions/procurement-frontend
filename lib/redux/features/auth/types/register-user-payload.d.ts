export interface RegisterPayload {
  role: "merchant" | "supplier";
  companyInfo: {
    name?: string;
    registration_number?: string;
    tax_id?: string;
    website?: string;
    year_establised?: string;
    description?: string;
    legal_name?: string;
    trading_name?: string;
    vat_tax_id?: string;
    country?: string;
    physical_address?: string;
    postal_address?: string;
    industry_codes?: string[];
    product_categories?: string[];
  };
  warehouseDetails?: {
    warehouse_name: string;
    warehouse_address: string;
    contact_phone: string;
  };
  financials?: {
    bank_name: string;
    bank_account_number: string;
    swift_bic: string;
    payment_terms: string;
  };
  documents?: {
    cert_of_incorporation: File | string;
    kra_pin_cert: File | string;
    tax_compliance_cert: File | string;
    cr12: File | string;
    bank_letter: File | string;
    supplier_code_of_conduct: File | string;
    commercial_assessment: File | string;
    vendor_verification: File | string;
    vat_certificate?: File | string;
    annual_returns?: File | string;
    professional_certs?: File | string;
    org_structure?: File | string;
  };
  accountDetails: {
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
  };
}
