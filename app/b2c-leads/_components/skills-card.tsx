'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import InputField from './input-field';
import SelectField from './select-filed';

const SkillsCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Skills & Certifications
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-4">
        {/* 5.1 Skills */}
        <InputField
          control={control}
          name="primarySkills"
          label="Primary Skills *"
          placeholder="Enter primary skills"
        />
        <InputField
          control={control}
          name="secondarySkills"
          label="Secondary Skills *"
          placeholder="Enter secondary skills"
        />
        <InputField
          control={control}
          name="technicalTools"
          label="Technical Tools / Software"
          placeholder="Enter technical tools or software"
        />
        <InputField
          control={control}
          name="topSoftSkills"
          label="Top Soft Skills"
          placeholder="Enter top soft skills"
        />

        {/* 5.2 Certifications & Licenses */}
        <InputField
          control={control}
          name="professionalCertifications"
          label="Professional Certifications"
          placeholder="Enter professional certifications"
        />
        <InputField
          control={control}
          name="licenses"
          label="Licenses"
          placeholder="Enter licenses"
        />
        <InputField
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
