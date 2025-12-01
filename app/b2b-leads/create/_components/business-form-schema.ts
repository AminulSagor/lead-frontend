import z from 'zod';

export const BusinessProfileSchema = z.object({
  // business profile
  businessId: z.string().optional(),
  name: z.string().min(2, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  description: z.string().optional(),
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
});

export type BusinessProfileFormType = z.infer<typeof BusinessProfileSchema>;
