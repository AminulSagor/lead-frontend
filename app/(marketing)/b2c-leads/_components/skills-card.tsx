'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import TextareaField from '@/components/text-area';

const SkillsCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Skills & Certifications
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-4 gap-4">
        {/* 5.1 Skills */}
        <TextareaField
          control={control}
          name="primarySkills"
          label="Primary Skills *"
          placeholder="Enter primary skills"
        />
        <TextareaField
          control={control}
          name="secondarySkills"
          label="Secondary Skills *"
          placeholder="Enter secondary skills"
        />
        <TextareaField
          control={control}
          name="technicalTools"
          label="Technical Tools / Software"
          placeholder="Enter technical tools or software"
        />
        <TextareaField
          control={control}
          name="topSoftSkills"
          label="Top Soft Skills"
          placeholder="Enter top soft skills"
        />

        {/* 5.2 Certifications & Licenses */}
        <TextareaField
          control={control}
          name="professionalCertifications"
          label="Professional Certifications"
          placeholder="Enter professional certifications"
        />
        <TextareaField
          control={control}
          name="licenses"
          label="Licenses"
          placeholder="Enter licenses"
        />
        <TextareaField
          control={control}
          name="credentials"
          label="Credentials"
          placeholder="Enter credentials"
        />
      </CardContent>
    </Card>
  );
};

export default SkillsCard;
