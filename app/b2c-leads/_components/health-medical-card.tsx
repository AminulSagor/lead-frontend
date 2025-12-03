'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import InputField from './input-field';

const HealthMedicalCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Health & Medical Information
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-4 gap-4">
        {/* Physical Health */}
        <InputField
          control={control}
          name="heightWeightBMI"
          label="Height / Weight / BMI"
          placeholder="Enter your height, weight, and BMI"
        />
        <InputField
          control={control}
          name="allergies"
          label="Allergies"
          placeholder="List any allergies"
        />
        <InputField
          control={control}
          name="chronicIllnesses"
          label="Chronic Illnesses"
          placeholder="Enter any chronic illnesses"
        />
        <InputField
          control={control}
          name="disabilities"
          label="Disabilities"
          placeholder="Enter any disabilities"
        />

        {/* Medical Records */}
        <InputField
          control={control}
          name="diagnoses"
          label="Diagnoses"
          placeholder="Enter diagnoses"
        />
        <InputField
          control={control}
          name="medications"
          label="Medications"
          placeholder="Enter medications"
        />
        <InputField
          control={control}
          name="surgeries"
          label="Surgeries"
          placeholder="Enter surgeries"
        />
        <InputField
          control={control}
          name="vaccinationRecords"
          label="Vaccination Records"
          placeholder="Enter vaccination records"
        />
        <InputField
          control={control}
          name="medicalDevices"
          label="Medical Devices"
          placeholder="Enter any medical devices used"
        />
        <InputField
          control={control}
          name="healthInsurance"
          label="Health Insurance"
          placeholder="Enter health insurance details"
        />
      </CardContent>
    </Card>
  );
};

export default HealthMedicalCard;
