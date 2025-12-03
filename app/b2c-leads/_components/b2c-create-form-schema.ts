import z from 'zod';
const phoneRegex = /^[0-9+\-()\s]{6,20}$/;
export const B2CProfileSchema = z.object({
  // personal details
  fullName: z.string().min(2, 'Full name is required'),
  nickname: z.string().or(z.literal('')).optional(),
  nationality: z.string().min(1, 'Nationality is required'),
  dob: z.string().or(z.literal('')).optional(),
  gender: z.enum(['male', 'female', 'other']).or(z.literal('')),

  // contact and communications
  primaryEmail: z
    .string()
    .email('Enter a valid email address')
    .or(z.literal(''))
    .optional(),
  secondaryEmail: z
    .string()
    .email('Enter a valid email address')
    .or(z.literal(''))
    .optional(),

  primaryPhone: z
    .string()
    .regex(phoneRegex, 'Enter a valid phone number')
    .or(z.literal(''))
    .optional(),

  secondaryPhone: z
    .string()
    .regex(phoneRegex, 'Enter a valid phone number')
    .or(z.literal(''))
    .optional(),

  whatsapp: z
    .string()
    .regex(phoneRegex, 'Enter a valid phone number')
    .or(z.literal(''))
    .optional(),

  telegram: z
    .string()
    .regex(phoneRegex, 'Enter a valid phone number')
    .or(z.literal(''))
    .optional(),

  wechat: z.string().or(z.literal('')).optional(),

  prefferedContactMethod: z
    .enum(['phone', 'whatsapp', 'sms', 'email', 'messenger'])
    .or(z.literal(''))
    .optional(),

  // location:
  country: z.string().min(1, 'Country is required'),
  state: z.string().optional(),
  city: z.string().optional(),
  subCity: z.string().optional(),
  cityCorporation: z.string().optional(),
  street: z.string().optional(),
  postalCode: z.string().optional(),
  timeZone: z.string().optional(),

  // professional details
  currentJobTitle: z.string().optional(),
  company: z.string().optional(),
  workType: z
    .enum(['fullTime', 'partTime', 'contract', 'freelance'])
    .optional(),
  workModel: z.enum(['onsite', 'hybrid', 'remote']).optional(),
  primaryIndustry: z.string().min(1, 'Primary Industry is required'),
  industrySubsector: z
    .string()
    .min(1, 'Industry Subsector / Niche is required'),
  coreResponsibilities: z.string().optional(),
  keyTools: z.string().optional(),

  //  Skills
  primarySkills: z.string().min(1, 'Primary Skills is required'),
  secondarySkills: z.string().min(1, 'Secondary Skills is required'),
  technicalTools: z.string().optional(),
  topSoftSkills: z.string().optional(),
  professionalCertifications: z.string().optional(),
  licenses: z.string().optional(),
  credentials: z.string().optional(),
  // career summary
  totalExperience: z
    .string()
    .min(1, 'Total Years of Experience is required')
    .regex(/^\d+$/, 'Enter a valid number'),
  careerHighlight: z.string().optional(),
});

export type B2CProfileSchemaType = z.infer<typeof B2CProfileSchema>;
