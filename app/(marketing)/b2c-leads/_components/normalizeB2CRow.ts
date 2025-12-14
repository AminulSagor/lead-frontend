import { B2CProfileSchemaType } from "./b2c-create-form-schema";

function splitCSV(value?: unknown): string[] {
  if (!value || typeof value !== "string") return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function parseCivicActivities(row: Record<string, any>) {
  const organizations = splitCSV(row["civicActivities.organizations"]);
  const roles = splitCSV(row["civicActivities.role"]);
  const activities = splitCSV(row["civicActivities.activities"]);

  const maxLength = Math.max(
    organizations.length,
    roles.length,
    activities.length
  );

  if (maxLength === 0) return undefined;

  return Array.from({ length: maxLength })
    .map((_, i) => ({
      organizations: organizations[i] ?? "",
      role: roles[i] || undefined,
      activities: activities[i] || undefined,
    }))
    .filter((item) => item.organizations);
}

export function normalizeB2CRow(
  row: Record<string, any>
): B2CProfileSchemaType {
  return {
    // ---------- REQUIRED ----------
    fullName: row.fullName ?? "",
    nationality: row.nationality ?? "",
    country: row.country ?? "",
    primaryIndustry: row.primaryIndustry ?? "",
    industrySubsector: row.industrySubsector ?? "",
    primarySkills: row.primarySkills ?? "",
    secondarySkills: row.secondarySkills ?? "",
    totalExperience: row.totalExperience ?? "",
    highestDegree: row.highestDegree ?? "",
    maritalStatus: row.maritalStatus ?? "",
    householdIncome: row.householdIncome ?? "",

    // ---------- OPTIONAL SIMPLE ----------
    nickname: row.nickname || "",
    dob: row.dob || "",
    gender: row.gender || "",
    primaryEmail: row.primaryEmail || "",
    secondaryEmail: row.secondaryEmail || "",
    primaryPhone: row.primaryPhone || "",
    secondaryPhone: row.secondaryPhone || "",
    whatsapp: row.whatsapp || "",
    telegram: row.telegram || "",
    wechat: row.wechat || "",
    prefferedContactMethod: row.prefferedContactMethod || "",

    state: row.state,
    city: row.city,
    subCity: row.subCity,
    cityCorporation: row.cityCorporation,
    street: row.street,
    postalCode: row.postalCode,
    timeZone: row.timeZone,

    currentJobTitle: row.currentJobTitle,
    company: row.company,
    workType: row.workType,
    workModel: row.workModel,
    coreResponsibilities: row.coreResponsibilities,
    keyTools: row.keyTools,

    technicalTools: row.technicalTools,
    topSoftSkills: row.topSoftSkills,
    professionalCertifications: row.professionalCertifications,
    licenses: row.licenses,
    credentials: row.credentials,
    careerHighlight: row.careerHighlight,

    degreesEarned: row.degreesEarned,
    institutions: row.institutions,
    fieldsOfStudy: row.fieldsOfStudy,
    graduationDates: row.graduationDates,
    gpa: row.gpa,
    academicHonors: row.academicHonors,
    publications: row.publications,
    researchAreas: row.researchAreas,
    thesisTitle: row.thesisTitle,
    academicIds: row.academicIds,

    personalWebsite: row.personalWebsite || "",
    portfolio: row.portfolio || "",
    blog: row.blog || "",
    onlineResume: row.onlineResume || "",
    othersWeb: row.othersWeb || "",

    interests: splitCSV(row.interests),

    lifestylePreferences: row.lifestylePreferences,

    // ✅ ARRAY OF OBJECTS (YOUR MAIN QUESTION)
    civicActivities: parseCivicActivities(row),

    civicEngagement: row.civicEngagement,
    policyInterests: row.policyInterests,

    partnerSpouse: row.partnerSpouse,
    childrenDependents: row.childrenDependents,
    householdSize: row.householdSize,
    familyMedicalHistory: row.familyMedicalHistory,
    guardianshipStatus: row.guardianshipStatus,

    heightWeightBMI: row.heightWeightBMI,
    allergies: row.allergies,
    chronicIllnesses: row.chronicIllnesses,
    disabilities: row.disabilities,
    diagnoses: row.diagnoses,
    medications: row.medications,
    surgeries: row.surgeries,
    vaccinationRecords: row.vaccinationRecords,
    medicalDevices: row.medicalDevices,
    healthInsurance: row.healthInsurance,

    salary: {
      salaryCurrency: row["salary.salaryCurrency"],
      salaryAmount: row["salary.salaryAmount"],
    },

    totalIncome: {
      totalCurrency: row["totalIncome.totalCurrency"],
      totalAmount: row["totalIncome.totalAmount"],
    },

    assets: row.assets,
    incomeHistory: row.incomeHistory,
    savings: row.savings,
    investments: row.investments,
    cryptocurrency: row.cryptocurrency,
    loans: row.loans,
    debts: row.debts,
    bankAccounts: row.bankAccounts,
    creditScore: row.creditScore,
    transactionHistory: row.transactionHistory,
    insurancePolicies: row.insurancePolicies,

    nationalId: row.nationalId,
    passport: row.passport,
    driversLicense: row.driversLicense,
    visaWorkPermit: row.visaWorkPermit,
    criminalBackground: row.criminalBackground,
    courtRecords: row.courtRecords,
    contractsSigned: row.contractsSigned,
    consentRecords: row.consentRecords,
    taxIdentificationNumber: row.taxIdentificationNumber,

    clubs: row.clubs,
    alumniGroups: row.alumniGroups,
    professionalAssociations: row.professionalAssociations,
    nonprofits: row.nonprofits,
    loyaltyPrograms: row.loyaltyPrograms,
    volunteerActivities: row.volunteerActivities,
  };
}
