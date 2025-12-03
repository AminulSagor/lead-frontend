'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import InputField from './input-field';
import SelectField from './select-filed';
import { WORK_TYPE_OPTIONS, WORK_MODEL_OPTIONS, INDUSTRY_LIST } from './data';

const ProfessionalDetailsCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Job, Career & Professional Details
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-4">
        {/* Current Employment */}
        <InputField
          control={control}
          name="currentJobTitle"
          label="Current Job Title"
          placeholder="Enter your current job title"
        />
        <InputField
          control={control}
          name="company"
          label="Company / Organization"
          placeholder="Enter company or organization"
        />
        <SelectField
          control={control}
          name="workType"
          label="Work Type"
          placeholder="Select work type"
          options={WORK_TYPE_OPTIONS}
        />
        <SelectField
          control={control}
          name="workModel"
          label="Work Model"
          placeholder="Select work model"
          options={WORK_MODEL_OPTIONS}
        />

        {/* Industry Classification */}
        <SelectField
          control={control}
          name="primaryIndustry"
          label="Primary Industry"
          placeholder="Select primary industry"
          options={INDUSTRY_LIST}
        />
        <InputField
          control={control}
          name="industrySubsector"
          label="Industry Subsector / Niche "
          placeholder="E.g., FinTech – Payments"
        />

        {/* Job Scope */}
        <InputField
          control={control}
          name="coreResponsibilities"
          label="Core Responsibilities"
          placeholder="Enter core responsibilities"
        />
        <InputField
          control={control}
          name="keyTools"
          label="Key Tools / Platforms Used"
          placeholder="Enter key tools / platforms used"
        />
      </CardContent>
    </Card>
  );
};

export default ProfessionalDetailsCard;
