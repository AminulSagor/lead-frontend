import mongoose, { Schema, Document } from 'mongoose';

export interface IBusinessProfile extends Document {
  businessId?: string;
  name: string;
  businessType: string;
  description?: string;
  registrationNumber?: string;
  taxId?: string;
  establishedDate?: string;
  status: string;
  primaryIndustry: string;
  niche: string;
  subNiche: string;
  serviceName: string;
  category: string;
  subCategory?: string;
  serviceDescription?: string;
  pricingModel: 'Hourly' | 'Fixed' | 'Tiered' | 'Subscription';
  rate: string;
  currency: string;
  serviceAvailability: 'Online' | 'On-Site' | 'Hybrid';
  onlineService: 'Yes' | 'No';
  street?: string;
  subCity?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  businessPhone?: string;
  secondaryPhone?: string;
  email?: string;
  supportEmail?: string;
  website?: string;
  keyContactName?: string;
  keyContactPosition?: string;
  keyContactDepartment?: string;
  keyContactPhone?: string;
  keyContactEmail?: string;
  keyContactLinkedIn?: string;
  opFacebook?: string;
  opInstagram?: string;
  opLinkedin?: string;
  opTwitter?: string;
  opYoutube?: string;
  opTiktok?: string;
  opGoogleBusiness?: string;
  opDirectoryListings?: string;
  operationsOpeningHours?: string;
  operationsTimeZone?: string;
  operationsEmployees?: string;
  operationsTools?: string;
  operationsCertifications?: string;
  fnPaymentMethods?: string;
  fnBillingAddress?: string;
  fnInvoiceContact?: string;
  fnPrimaryCurrency?: string;
  fnPaymentTerms?: string;
  legalLicenses?: string;
  legalPermits?: string;
  legalInsurance?: string;
  legalComplianceCertificates?: string;
  marketingTargetAudience?: string;
  marketingValueProposition?: string;
  marketingMainCompetitors?: string;
  marketingKeywords?: string;
  metaTags?: string;
  metaNotes?: string;
  metaDateAdded?: string;
  metaLastUpdated?: string;
}

const BusinessProfileSchema: Schema = new Schema(
  {
    businessId: { type: String },
    name: { type: String, required: true },
    businessType: { type: String, required: true },
    description: { type: String },
    registrationNumber: { type: String },
    taxId: { type: String },
    establishedDate: { type: String },
    status: { type: String, required: true },
    primaryIndustry: { type: String, required: true },
    niche: { type: String, required: true },
    subNiche: { type: String, required: true },
    serviceName: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    serviceDescription: { type: String },
    pricingModel: {
      type: String,
      enum: ['Hourly', 'Fixed', 'Tiered', 'Subscription'],
      required: true,
    },
    rate: { type: String, required: true },
    currency: { type: String, required: true },
    serviceAvailability: {
      type: String,
      enum: ['Online', 'On-Site', 'Hybrid'],
      required: true,
    },
    onlineService: { type: String, enum: ['Yes', 'No'], required: true },
    street: { type: String },
    subCity: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String },
    country: { type: String, required: true },
    businessPhone: { type: String },
    secondaryPhone: { type: String },
    email: { type: String },
    supportEmail: { type: String },
    website: { type: String },
    keyContactName: { type: String },
    keyContactPosition: { type: String },
    keyContactDepartment: { type: String },
    keyContactPhone: { type: String },
    keyContactEmail: { type: String },
    keyContactLinkedIn: { type: String },
    opFacebook: { type: String },
    opInstagram: { type: String },
    opLinkedin: { type: String },
    opTwitter: { type: String },
    opYoutube: { type: String },
    opTiktok: { type: String },
    opGoogleBusiness: { type: String },
    opDirectoryListings: { type: String },
    operationsOpeningHours: { type: String },
    operationsTimeZone: { type: String },
    operationsEmployees: { type: String },
    operationsTools: { type: String },
    operationsCertifications: { type: String },
    fnPaymentMethods: { type: String },
    fnBillingAddress: { type: String },
    fnInvoiceContact: { type: String },
    fnPrimaryCurrency: { type: String },
    fnPaymentTerms: { type: String },
    legalLicenses: { type: String },
    legalPermits: { type: String },
    legalInsurance: { type: String },
    legalComplianceCertificates: { type: String },
    marketingTargetAudience: { type: String },
    marketingValueProposition: { type: String },
    marketingMainCompetitors: { type: String },
    marketingKeywords: { type: String },
    metaTags: { type: String },
    metaNotes: { type: String },
    metaDateAdded: { type: String },
    metaLastUpdated: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IBusinessProfile>(
  'BusinessProfile',
  BusinessProfileSchema
);
