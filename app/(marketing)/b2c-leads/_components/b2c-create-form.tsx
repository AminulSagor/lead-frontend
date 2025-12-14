"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import AddressCard from "./address-card";
import {
  B2CProfileSchema,
  B2CProfileSchemaType,
} from "./b2c-create-form-schema";
import ContactCard from "./contact-card";
import PersonalDetailsCard from "./personal-details-card";
import ProfessionalDetailsCard from "./professional-details-card";
import SkillsCard from "./skills-card";
import CareerSummaryCard from "./career-summary-card";
import EducationCard from "./education-card";
import PersonalWebCard from "./personal-web-card";
import InterestsCard from "./hobbies-card";
import SocialCivicCard from "./social-civic-card";
import FamilyHouseholdCard from "./family-household-card";
import HealthMedicalCard from "./health-medical-card";
import FinancialInformationCard from "./financial-info-card";
import LegalGovernmentCard from "./legal-govt-card";
import MembershipsAffiliationsCard from "./membership-affiliation-card";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AttachmentCard from "../../b2b-leads/create/_components/attachment-card";

const B2CCreateForm = () => {
  const router = useRouter();
  const form = useForm<B2CProfileSchemaType>({
    resolver: zodResolver(B2CProfileSchema),
    defaultValues: {
      // personal details
      fullName: "",
      nickname: "",
      dob: "",
      gender: "male",
      nationality: "",
      // contact and communication
      primaryEmail: "",
      secondaryEmail: "",
      primaryPhone: "",
      secondaryPhone: "",
      whatsapp: "",
      telegram: "",
      wechat: "",
      prefferedContactMethod: "phone",
      // location
      city: "",
      cityCorporation: "",
      country: "",
      postalCode: "",
      state: "",
      street: "",
      subCity: "",
      timeZone: "",
      // professional details
      currentJobTitle: "",
      company: "",
      workType: undefined,
      workModel: undefined,
      primaryIndustry: "",
      industrySubsector: "",
      coreResponsibilities: "",
      keyTools: "",
      // skills
      primarySkills: "",
      secondarySkills: "",
      technicalTools: "",
      topSoftSkills: "",
      professionalCertifications: "",
      licenses: "",
      credentials: "",
      // career summary
      totalExperience: "",
      careerHighlight: "",
      // education
      highestDegree: "",
      degreesEarned: "",
      institutions: "",
      fieldsOfStudy: "",
      graduationDates: "",
      gpa: "",
      academicHonors: "",
      publications: "",
      researchAreas: "",
      thesisTitle: "",
      academicIds: "",
      // personal web presence
      personalWebsite: "",
      portfolio: "",
      blog: "",
      onlineResume: "",
      othersWeb: "",
      // interest / hobbies
      interests: [],
      lifestylePreferences: "",
      // social / civic activities
      civicActivities: [{ activities: "", organizations: "", role: "" }],
      civicEngagement: "",
      policyInterests: "",
      // family / household
      maritalStatus: "",
      partnerSpouse: "",
      childrenDependents: "",
      householdSize: "",
      householdIncome: "",
      familyMedicalHistory: "",
      guardianshipStatus: "",
      // health / medical records
      heightWeightBMI: "",
      allergies: "",
      chronicIllnesses: "",
      disabilities: "",
      diagnoses: "",
      medications: "",
      surgeries: "",
      vaccinationRecords: "",
      medicalDevices: "",
      healthInsurance: "",
      // financial info
      salary: {
        salaryCurrency: "",
        salaryAmount: "",
      },
      totalIncome: {
        totalAmount: "",
        totalCurrency: "",
      },
      assets: "",
      incomeHistory: "",
      savings: "",
      investments: "",
      cryptocurrency: "",
      loans: "",
      debts: "",
      bankAccounts: "",
      creditScore: "",
      transactionHistory: "",
      insurancePolicies: "",
      // legal and govt
      nationalId: "",
      passport: "",
      driversLicense: "",
      visaWorkPermit: "",
      criminalBackground: "",
      courtRecords: "",
      contractsSigned: "",
      consentRecords: "",
      taxIdentificationNumber: "",
      // membership and affiliation
      clubs: "",
      alumniGroups: "",
      professionalAssociations: "",
      nonprofits: "",
      loyaltyPrograms: "",
      volunteerActivities: "",
      // attachment
    },
  });

  const onSubmit = async (data: B2CProfileSchemaType) => {
    try {
      const res = await fetch(`/api/b2c-leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error(data.message);
        return;
      }

      const result = await res.json();
      toast.success("B2C Profile Created Successfully!");
      router.push("/b2c-leads");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="space-y-4">
      <div>
        <Button asChild>
          <Link href={"/b2c-leads"}>
            <ArrowLeftCircle />
            Back
          </Link>
        </Button>
      </div>
      <div className="mx-auto">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <PersonalDetailsCard />
            <ContactCard />
            <AddressCard />
            <ProfessionalDetailsCard />
            <SkillsCard />
            <CareerSummaryCard />
            <EducationCard />
            <PersonalWebCard />
            <InterestsCard />
            <SocialCivicCard />
            <FamilyHouseholdCard />
            <HealthMedicalCard />
            <FinancialInformationCard />
            <LegalGovernmentCard />
            <MembershipsAffiliationsCard />
            <Button type="submit" size={"sm"}>
              Submit
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default B2CCreateForm;
