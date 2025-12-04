'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import SelectField from './select-filed';
import { HOBBIES_LIST } from './data';
import InputField from './input-field';

const InterestsCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Interests, Lifestyle & Preferences
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">
        <SelectField
          control={control}
          name="interests"
          label="Interests / Hobbies *"
          placeholder="Select your hobby"
          options={HOBBIES_LIST}
        />
        <InputField
          control={control}
          name="lifestylePreferences"
          label="Lifestyle Preferences"
          placeholder="Enter your lifestyle preferences (optional)"
        />
      </CardContent>
    </Card>
  );
};

export default InterestsCard;
