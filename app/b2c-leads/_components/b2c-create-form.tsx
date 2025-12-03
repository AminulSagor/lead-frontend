'use client';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import AddressCard from './address-card';
import {
  B2CProfileSchema,
  B2CProfileSchemaType,
} from './b2c-create-form-schema';
import ContactCard from './contact-card';
import PersonalDetailsCard from './personal-details-card';
import ProfessionalDetailsCard from './professional-details-card';
import SkillsCard from './skills-card';
import CareerSummaryCard from './career-summary-card';
import EducationCard from './education-card';
import PersonalWebCard from './personal-web-card';
import InterestsCard from './hobbies-card';
import SocialCivicCard from './social-civic-card';
import FamilyHouseholdCard from './family-household-card';
import HealthMedicalCard from './health-medical-card';
import FinancialInformationCard from './financial-info-card';
import LegalGovernmentCard from './legal-govt-card';
import MembershipsAffiliationsCard from './membership-affiliation-card';

const B2CCreateForm = () => {
  const form = useForm<B2CProfileSchemaType>({
    resolver: zodResolver(B2CProfileSchema),
    defaultValues: {
      // personal details
      fullName: '',
      nickname: '',
      dob: '',
      gender: 'male',
      nationality: '',
      // contact and communication
      primaryEmail: '',
      secondaryEmail: '',
      primaryPhone: '',
      secondaryPhone: '',
      whatsapp: '',
      telegram: '',
      wechat: '',
      prefferedContactMethod: 'phone',
      // location
      city: '',
      cityCorporation: '',
      country: '',
      postalCode: '',
      state: '',
      street: '',
      subCity: '',
      timeZone: '',
      // professional details
      currentJobTitle: '',
      company: '',
      workType: undefined,
      workModel: undefined,
      primaryIndustry: '',
      industrySubsector: '',
      coreResponsibilities: '',
      keyTools: '',
      // skills
      primarySkills: '',
      secondarySkills: '',
      technicalTools: '',
      topSoftSkills: '',
      professionalCertifications: '',
      licenses: '',
      credentials: '',
      // career summary
      totalExperience: '',
      careerHighlight: '',
      // education
      highestDegree: '',
      degreesEarned: '',
      institutions: '',
      fieldsOfStudy: '',
      graduationDates: '',
      gpa: '',
      academicHonors: '',
      publications: '',
      researchAreas: '',
      thesisTitle: '',
      academicIds: '',
      // personal web presence
      personalWebsite: '',
      portfolio: '',
      blog: '',
      onlineResume: '',
      linktree: '',
      publicNotion: '',
      // interest / hobbies
      interests: '',
      lifestylePreferences: '',
      // social / civic activities
      organizations: '',
      role: '',
      activities: '',
      civicEngagement: '',
      policyInterests: '',
      // family / household
      maritalStatus: '',
      partnerSpouse: '',
      childrenDependents: '',
      householdSize: '',
      householdIncome: '',
      familyMedicalHistory: '',
      guardianshipStatus: '',
      // health / medical records
      heightWeightBMI: '',
      allergies: '',
      chronicIllnesses: '',
      disabilities: '',
      diagnoses: '',
      medications: '',
      surgeries: '',
      vaccinationRecords: '',
      medicalDevices: '',
      healthInsurance: '',
      // financial info
      salary: '',
      totalIncome: '',
      incomeHistory: '',
      savings: '',
      investments: '',
      cryptocurrency: '',
      loans: '',
      debts: '',
      bankAccounts: '',
      creditScore: '',
      transactionHistory: '',
      insurancePolicies: '',
      // legal and govt
      nationalId: '',
      passport: '',
      driversLicense: '',
      visaWorkPermit: '',
      criminalBackground: '',
      courtRecords: '',
      contractsSigned: '',
      consentRecords: '',
      taxIdentificationNumber: '',
      // membership and affiliation
      clubs: '',
      alumniGroups: '',
      professionalAssociations: '',
      nonprofits: '',
      loyaltyPrograms: '',
      volunteerActivities: '',
    },
  });

  const onSubmit = (data: B2CProfileSchemaType) => {
    console.log(data);
  };
  return (
    <div className="space-y-4">
      <div>
        <Button asChild>
          <Link href={'/b2b-leads'}>
            <ArrowLeftCircle />
            Back
          </Link>
        </Button>
      </div>
      <div className=" mx-auto">
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
            <Button type="submit" size={'sm'}>
              Submit
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default B2CCreateForm;
