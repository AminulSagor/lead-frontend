import { BusinessProfileFormType } from "@/app/(marketing)/b2b-leads/create/_components/b2b-create-form-schema";

function splitCSV(value?: unknown): string[] {
  if (!value || typeof value !== "string") return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function parseCSVtoArray(value?: unknown): string[] {
  if (!value || typeof value !== "string") return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

// Normalize array of objects for serviceOverview
function parseServiceOverview(row: Record<string, any>): any {
  // Expect CSV string columns like: "serviceOverview.serviceName", "serviceOverview.category", etc.
  // Each cell can be CSV string representing multiple services, e.g. "Service A,Service B"
  const serviceNames = splitCSV(row["serviceOverview.serviceName"]);
  const categories = splitCSV(row["serviceOverview.category"]);
  const subCategories = splitCSV(row["serviceOverview.subCategory"]);
  const descriptions = splitCSV(row["serviceOverview.serviceDescription"]);
  const pricingModels = splitCSV(row["serviceOverview.pricingModel"]);
  const rates = splitCSV(row["serviceOverview.rate"]);
  const currencies = splitCSV(row["serviceOverview.currency"]);
  const availabilities = splitCSV(row["serviceOverview.serviceAvailability"]);
  const onlineServices = splitCSV(row["serviceOverview.onlineService"]);

  const maxLength = Math.max(
    serviceNames.length,
    categories.length,
    subCategories.length,
    descriptions.length,
    pricingModels.length,
    rates.length,
    currencies.length,
    availabilities.length,
    onlineServices.length
  );

  if (maxLength === 0) return [];

  return Array.from({ length: maxLength })
    .map((_, i) => ({
      serviceName: serviceNames[i] ?? "",
      category: categories[i] ?? "",
      subCategory: subCategories[i] ?? "",
      serviceDescription: descriptions[i] ?? "",
      pricingModel:
        (pricingModels[
          i
        ] as BusinessProfileFormType["serviceOverview"][number]["pricingModel"]) ||
        "Hourly", // default fallback
      rate: rates[i] ?? "",
      currency: currencies[i] ?? "",
      serviceAvailability:
        (availabilities[
          i
        ] as BusinessProfileFormType["serviceOverview"][number]["serviceAvailability"]) ||
        "Online",
      onlineService:
        (onlineServices[
          i
        ] as BusinessProfileFormType["serviceOverview"][number]["onlineService"]) ||
        "No",
    }))
    .filter(
      (service) =>
        service.serviceName &&
        service.category &&
        service.rate &&
        service.currency
    );
}

// Normalize keyContacts array
function parseKeyContacts(
  row: Record<string, any>
): BusinessProfileFormType["keyContacts"] {
  // Expect CSV strings for key contacts fields
  const names = splitCSV(row["keyContacts.keyContactName"]);
  const positions = splitCSV(row["keyContacts.keyContactPosition"]);
  const departments = splitCSV(row["keyContacts.keyContactDepartment"]);
  const phones = splitCSV(row["keyContacts.keyContactPhone"]);
  const emails = splitCSV(row["keyContacts.keyContactEmail"]);
  const linkedIns = splitCSV(row["keyContacts.keyContactLinkedIn"]);

  const maxLength = Math.max(
    names.length,
    positions.length,
    departments.length,
    phones.length,
    emails.length,
    linkedIns.length
  );
  if (maxLength === 0) return [];

  return Array.from({ length: maxLength })
    .map((_, i) => ({
      keyContactName: names[i] ?? "",
      keyContactPosition: positions[i] ?? "",
      keyContactDepartment: departments[i] ?? "",
      keyContactPhone: phones[i] ?? "",
      keyContactEmail: emails[i] ?? "",
      keyContactLinkedIn: linkedIns[i] ?? "",
    }))
    .filter((contact) => contact.keyContactName); // filter out empty contacts
}

export function normalizeB2BRow(
  row: Record<string, any>
): BusinessProfileFormType {
  return {
    name: row.name ?? "",
    businessType: row.businessType ?? "",
    businessDescription: row.businessDescription ?? "",
    registrationNumber: row.registrationNumber ?? "",
    taxId: row.taxId ?? "",
    establishedDate: row.establishedDate ?? "",
    status: row.status ?? "",
    primaryIndustry: row.primaryIndustry ?? "",
    niche: row.niche ?? "",
    subNiche: row.subNiche ?? "",

    serviceOverview: parseServiceOverview(row),

    street: row.street ?? "",
    subCity: row.subCity ?? "",
    city: row.city ?? "",
    state: row.state ?? "",
    postalCode: row.postalCode ?? "",
    country: row.country ?? "",

    businessPhone: JSON.stringify(row.businessPhone) ?? "",
    secondaryPhone: JSON.stringify(row.secondaryPhone) ?? "",
    email: row.email ?? "",
    supportEmail: row.supportEmail ?? "",
    website: row.website ?? "",

    keyContacts: parseKeyContacts(row),

    opFacebook: row.opFacebook ?? "",
    opInstagram: row.opInstagram ?? "",
    opLinkedin: row.opLinkedin ?? "",
    opTwitter: row.opTwitter ?? "",
    opYoutube: row.opYoutube ?? "",
    opTiktok: row.opTiktok ?? "",
    opGoogleBusiness: row.opGoogleBusiness ?? "",
    opDirectoryListings: row.opDirectoryListings ?? "",

    operationsOpeningHours: row.operationsOpeningHours ?? "",
    operationsTimeZone: row.operationsTimeZone ?? "",
    operationsEmployees: row.operationsEmployees ?? "",
    operationsTools: row.operationsTools ?? "",
    operationsCertifications: row.operationsCertifications ?? "",

    fnPaymentMethods: row.fnPaymentMethods ?? "",
    fnBillingAddress: row.fnBillingAddress ?? "",
    fnInvoiceContact: row.fnInvoiceContact ?? "",
    fnPrimaryCurrency: row.fnPrimaryCurrency ?? "",
    fnPaymentTerms: row.fnPaymentTerms ?? "",

    legalLicenses: row.legalLicenses ?? "",
    legalPermits: row.legalPermits ?? "",
    legalInsurance: row.legalInsurance ?? "",
    legalComplianceCertificates: row.legalComplianceCertificates ?? "",

    marketingTargetAudience: row.marketingTargetAudience ?? "",
    marketingValueProposition: row.marketingValueProposition ?? "",
    marketingMainCompetitors: row.marketingMainCompetitors ?? "",
    marketingKeywords: row.marketingKeywords ?? "",

    metaTags: parseCSVtoArray(row.metaTags) ?? "",
    metaNotes: row.metaNotes ?? "",

    companyImgUrl: row.companyImgUrl ?? "",
  };
}
