'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Controller, useFormContext } from 'react-hook-form';
import InputField from './input-field';
import SelectField from './select-filed';
import { WORK_TYPE_OPTIONS, WORK_MODEL_OPTIONS, INDUSTRY_LIST } from './data';
import TextareaField from '@/components/text-area';
import { FormLabel } from '@/components/ui/form';
import { AdvancedSelector } from '@/components/advance-selector';
import { B2CProfileSchemaType } from './b2c-create-form-schema';

const ProfessionalDetailsCard = () => {
  const { control } = useFormContext<B2CProfileSchemaType>();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Job, Career & Professional Details
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-4 gap-4">
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

        <Controller
          control={control}
          name="primaryIndustry"
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <FormLabel>Primary Industry</FormLabel>
              <AdvancedSelector
                onChange={field.onChange}
                value={field.value}
                placeholder="Select primary industry"
                presets={INDUSTRY_LIST.map((opt) => opt.label)}
              />
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        <InputField
          control={control}
          name="industrySubsector"
          label="Industry Subsector / Niche "
          placeholder="E.g., FinTech – Payments"
        />

        <div className="col-span-4 grid grid-cols-2 gap-4">
          <TextareaField
            control={control}
            name="coreResponsibilities"
            label="Core Responsibilities"
            placeholder="Enter core responsibilities"
          />
          <TextareaField
            control={control}
            name="keyTools"
            label="Key Tools / Platforms Used"
            placeholder="Enter key tools / platforms used"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalDetailsCard;
