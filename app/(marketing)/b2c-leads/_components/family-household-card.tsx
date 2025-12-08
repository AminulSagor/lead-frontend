'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import InputField from './input-field';
import SelectField from './select-filed';
import { MARITAL_STATUS_OPTIONS } from './data';
import TextareaField from '@/components/text-area';

const FamilyHouseholdCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Family & Household
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-5 gap-4">
        <SelectField
          control={control}
          name="maritalStatus"
          label="Marital Status *"
          placeholder="Select marital status"
          options={MARITAL_STATUS_OPTIONS}
        />
        <InputField
          control={control}
          name="partnerSpouse"
          label="Partner / Spouse"
          placeholder="Enter partner or spouse name"
        />
        <InputField
          control={control}
          name="childrenDependents"
          label="Children / Dependents"
          placeholder="Enter children or dependents"
        />
        <InputField
          control={control}
          name="householdSize"
          label="Household Size"
          placeholder="Enter household size"
        />
        <InputField
          control={control}
          name="guardianshipStatus"
          label="Guardianship Status"
          placeholder="Enter guardianship status"
        />
        <TextareaField
          control={control}
          name="householdIncome"
          label="Household Income *"
          placeholder="Enter household income"
        />
        <TextareaField
          control={control}
          name="familyMedicalHistory"
          label="Family Medical History"
          placeholder="Enter family medical history"
        />
      </CardContent>
    </Card>
  );
};

export default FamilyHouseholdCard;
