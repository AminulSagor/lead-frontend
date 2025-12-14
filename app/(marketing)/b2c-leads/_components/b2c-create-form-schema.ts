import z from "zod";
const phoneRegex = /^[0-9+\-()\s]{6,20}$/;

export const civicActivitiesSchema = z.object({
  organizations: z.string().min(1, "Organizations / Groups is required"),
  role: z.string().optional(),
  activities: z.string().optional(),
});
export const B2CProfileSchema = z.object({
  // personal details
  fullName: z.string().min(2, "Full name is required"),
  nickname: z.string().or(z.literal("")).optional(),
  nationality: z.string().min(1, "Nationality is required"),
  dob: z.string().or(z.literal("")).optional(),
  gender: z.enum(["male", "female", "other"]).or(z.literal("")),
  // contact and communications
  primaryEmail: z
    .string()
    .email("Enter a valid email address")
    .or(z.literal(""))
    .optional(),
  secondaryEmail: z
    .string()
    .email("Enter a valid email address")
    .or(z.literal(""))
    .optional(),

  primaryPhone: z
    .string()
    .regex(phoneRegex, "Enter a valid phone number")
    .or(z.literal(""))
    .optional(),

  secondaryPhone: z
    .string()
    .regex(phoneRegex, "Enter a valid phone number")
    .or(z.literal(""))
    .optional(),

  whatsapp: z
    .string()
    .regex(phoneRegex, "Enter a valid phone number")
    .or(z.literal(""))
    .optional(),

  telegram: z
    .string()
    .regex(phoneRegex, "Enter a valid phone number")
    .or(z.literal(""))
    .optional(),

  wechat: z.string().or(z.literal("")).optional(),

  prefferedContactMethod: z
    .enum(["phone", "whatsapp", "sms", "email", "messenger"])
    .or(z.literal(""))
    .optional(),

  // location:
  country: z.string().min(1, "Country is required"),
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
    .enum(["fullTime", "partTime", "contract", "freelance"])
    .optional(),
  workModel: z.enum(["onsite", "hybrid", "remote"]).optional(),
  primaryIndustry: z.string().min(1, "Primary Industry is required"),
  industrySubsector: z
    .string()
    .min(1, "Industry Subsector / Niche is required"),
  coreResponsibilities: z.string().optional(),
  keyTools: z.string().optional(),

  //  Skills
  primarySkills: z.string().min(1, "Primary Skills is required"),
  secondarySkills: z.string().min(1, "Secondary Skills is required"),
  technicalTools: z.string().optional(),
  topSoftSkills: z.string().optional(),
  professionalCertifications: z.string().optional(),
  licenses: z.string().optional(),
  credentials: z.string().optional(),
  // career summary
  totalExperience: z
    .string()
    .min(1, "Total Years of Experience is required")
    .regex(/^\d+$/, "Enter a valid number"),
  careerHighlight: z.string().optional(),
  // education
  highestDegree: z.string().min(1, "Highest Degree is required"),
  degreesEarned: z.string().optional(),
  institutions: z.string().optional(),
  fieldsOfStudy: z.string().optional(),
  graduationDates: z.string().optional(),
  gpa: z.string().optional(),
  academicHonors: z.string().optional(),
  publications: z.string().optional(),
  researchAreas: z.string().optional(),
  thesisTitle: z.string().optional(),
  academicIds: z.string().optional(),
  // personal web presence
  personalWebsite: z
    .string()
    .url("Enter a valid URL")
    .or(z.literal(""))
    .optional(),
  portfolio: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
  blog: z.url("Enter a valid URL").or(z.literal("")).optional(),
  onlineResume: z.url("Enter a valid URL").or(z.literal("")).optional(),
  othersWeb: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
  // hobbies
  interests: z.array(z.string()).optional(),
  lifestylePreferences: z.string().optional(),
  // social / civic activities
  civicActivities: z.array(civicActivitiesSchema).optional(),
  civicEngagement: z.string().optional(),
  policyInterests: z.string().optional(),
  // family / household
  maritalStatus: z.string().min(1, "Marital Status is required"),
  partnerSpouse: z.string().optional(),
  childrenDependents: z.string().optional(),
  householdSize: z.string().optional(),
  householdIncome: z.string().min(1, "Household Income is required"),
  familyMedicalHistory: z.string().optional(),
  guardianshipStatus: z.string().optional(),
  // health / medical reports
  heightWeightBMI: z.string().optional(),
  allergies: z.string().optional(),
  chronicIllnesses: z.string().optional(),
  disabilities: z.string().optional(),
  diagnoses: z.string().optional(),
  medications: z.string().optional(),
  surgeries: z.string().optional(),
  vaccinationRecords: z.string().optional(),
  medicalDevices: z.string().optional(),
  healthInsurance: z.string().optional(),

  // financial info
  salary: z.object({
    salaryCurrency: z.string().optional(),
    salaryAmount: z.string().optional(),
  }),
  totalIncome: z.object({
    totalCurrency: z.string().optional(),
    totalAmount: z.string().optional(),
  }),
  assets: z.string().optional(),
  incomeHistory: z.string().optional(),
  savings: z.string().optional(),
  investments: z.string().optional(),
  cryptocurrency: z.string().optional(),
  loans: z.string().optional(),
  debts: z.string().optional(),
  bankAccounts: z.string().optional(),
  creditScore: z.string().optional(),
  transactionHistory: z.string().optional(),
  insurancePolicies: z.string().optional(),
  // legal and government
  nationalId: z.string().optional(),
  passport: z.string().optional(),
  driversLicense: z.string().optional(),
  visaWorkPermit: z.string().optional(),
  criminalBackground: z.string().optional(),
  courtRecords: z.string().optional(),
  contractsSigned: z.string().optional(),
  consentRecords: z.string().optional(),
  taxIdentificationNumber: z.string().optional(),
  // memberships and affiliations
  clubs: z.string().optional(),
  alumniGroups: z.string().optional(),
  professionalAssociations: z.string().optional(),
  nonprofits: z.string().optional(),
  loyaltyPrograms: z.string().optional(),
  volunteerActivities: z.string().optional(),
});

export type B2CProfileSchemaType = z.infer<typeof B2CProfileSchema>;
