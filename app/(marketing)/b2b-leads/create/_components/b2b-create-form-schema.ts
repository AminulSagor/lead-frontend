import z from 'zod';
const phoneRegex = /^\+?[0-9\s\-().]{7,20}$/;
export const B2BProfileSchema = z.object({
  // business profile
  businessId: z.string().optional(),
  name: z.string().min(2, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  businessDescription: z.string().optional(),
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  establishedDate: z.string().optional(),
  status: z.string().min(1, 'Status is required'),
  // industry classifications
  primaryIndustry: z.string().min(1, 'Primary Industry is required'),
  niche: z.string().min(1, 'Niche is required'),
  subNiche: z.string().min(1, 'Sub-niche is required'),
  // services
  serviceName: z.string().min(1, 'Service Name is required'),
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().optional(),
  serviceDescription: z.string().optional(),
  pricingModel: z.enum(['Hourly', 'Fixed', 'Tiered', 'Subscription']),
  rate: z.string().min(1, 'Rate is required'),
  currency: z.string().min(1, 'Currency is required'),
  serviceAvailability: z.enum(['Online', 'On-Site', 'Hybrid']),
  onlineService: z.enum(['Yes', 'No']),
  // location
  street: z.string().optional(),
  subCity: z.string().optional(),
  city: z.string().min(1, 'City/District is required'),
  state: z.string().min(1, 'State/Province is required'),
  postalCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  // contact info
  businessPhone: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || phoneRegex.test(val), {
      message: 'Enter a valid phone number',
    }),

  secondaryPhone: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || phoneRegex.test(val), {
      message: 'Enter a valid phone number',
    }),

  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || /@/.test(val), {
      message: 'Enter a valid email',
    }),

  supportEmail: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || /@/.test(val), {
      message: 'Enter a valid support email',
    }),

  website: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || /^https?:\/\//.test(val) || /^www\./.test(val), {
      message:
        'Enter a valid website (include http:// or https:// or start with www.)',
    }),

  //
  keyContactName: z.string().trim().optional().or(z.literal('')),
  keyContactPosition: z.string().trim().optional().or(z.literal('')),
  keyContactDepartment: z.string().trim().optional().or(z.literal('')),
  keyContactPhone: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || phoneRegex.test(val), {
      message: 'Enter a valid phone number',
    }),
  keyContactEmail: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || /@/.test(val), {
      message: 'Enter a valid email address',
    }),
  keyContactLinkedIn: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || val.startsWith('http'), {
      message: 'LinkedIn URL must start with http/https',
    }),
  // online presence
  opFacebook: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || val.startsWith('http'), {
      message: 'Enter a valid URL (must start with http or https)',
    }),
  opInstagram: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || val.startsWith('http'), {
      message: 'Enter a valid URL (must start with http or https)',
    }),
  opLinkedin: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || val.startsWith('http'), {
      message: 'Enter a valid URL (must start with http or https)',
    }),
  opTwitter: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || val.startsWith('http'), {
      message: 'Enter a valid URL (must start with http or https)',
    }),
  opYoutube: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || val.startsWith('http'), {
      message: 'Enter a valid URL (must start with http or https)',
    }),
  opTiktok: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || val.startsWith('http'), {
      message: 'Enter a valid URL (must start with http or https)',
    }),
  opGoogleBusiness: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || val.startsWith('http'), {
      message: 'Enter a valid URL (must start with http or https)',
    }),
  opDirectoryListings: z.string().trim().optional().or(z.literal('')),
  // operations
  operationsOpeningHours: z.string().trim().optional().or(z.literal('')),
  operationsTimeZone: z.string().trim().optional().or(z.literal('')),
  operationsEmployees: z.string().trim().optional().or(z.literal('')),
  operationsTools: z.string().trim().optional().or(z.literal('')),
  operationsCertifications: z.string().trim().optional().or(z.literal('')),
  // financial information
  fnPaymentMethods: z.string().optional(),
  fnBillingAddress: z.string().optional(),
  fnInvoiceContact: z.string().optional(),
  fnPrimaryCurrency: z.string().optional(),
  fnPaymentTerms: z.string().optional(),
  // legal information
  legalLicenses: z.string().trim().optional().or(z.literal('')),
  legalPermits: z.string().trim().optional().or(z.literal('')),
  legalInsurance: z.string().trim().optional().or(z.literal('')),
  legalComplianceCertificates: z.string().trim().optional().or(z.literal('')),
  // marketing
  marketingTargetAudience: z.string().trim().optional().or(z.literal('')),
  marketingValueProposition: z.string().trim().optional().or(z.literal('')),
  marketingMainCompetitors: z.string().trim().optional().or(z.literal('')),
  marketingKeywords: z.string().trim().optional().or(z.literal('')),
  // meta data
  metaTags: z.string().trim().optional().or(z.literal('')),
  metaNotes: z.string().trim().optional().or(z.literal('')),
  metaDateAdded: z.string().trim().optional().or(z.literal('')),
  metaLastUpdated: z.string().trim().optional().or(z.literal('')),
});

export type BusinessProfileFormType = z.infer<typeof B2BProfileSchema>;
