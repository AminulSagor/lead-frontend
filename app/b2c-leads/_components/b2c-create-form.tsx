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
