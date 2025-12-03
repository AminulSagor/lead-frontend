'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import InputField from './input-field';

const LegalGovernmentCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Legal & Government
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-4 gap-4">
        <InputField
          control={control}
          name="nationalId"
          label="National ID"
          placeholder="Enter national ID"
        />
        <InputField
          control={control}
          name="passport"
          label="Passport"
          placeholder="Enter passport number"
        />
        <InputField
          control={control}
          name="driversLicense"
          label="Driver’s License"
          placeholder="Enter driver’s license number"
        />
        <InputField
          control={control}
          name="visaWorkPermit"
          label="Visa / Work Permit"
          placeholder="Enter visa or work permit details"
        />
        <InputField
          control={control}
          name="criminalBackground"
          label="Criminal Background"
          placeholder="Enter criminal background information"
        />
        <InputField
          control={control}
          name="courtRecords"
          label="Court Records"
          placeholder="Enter court records details"
        />
        <InputField
          control={control}
          name="contractsSigned"
          label="Contracts Signed"
          placeholder="Enter contracts signed"
        />
        <InputField
          control={control}
          name="consentRecords"
          label="Consent Records"
          placeholder="Enter consent records"
        />
        <InputField
          control={control}
          name="taxIdentificationNumber"
          label="Tax Identification Number"
          placeholder="Enter tax identification number"
        />
      </CardContent>
    </Card>
  );
};

export default LegalGovernmentCard;
