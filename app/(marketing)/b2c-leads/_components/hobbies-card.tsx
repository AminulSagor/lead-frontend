'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Controller, useFormContext } from 'react-hook-form';
import SelectField from './select-filed';
import { HOBBIES_LIST } from './data';
import InputField from './input-field';
import { B2CProfileSchemaType } from './b2c-create-form-schema';
import { FormLabel } from '@/components/ui/form';
import { AdvancedSelector } from '@/components/advance-selector';

const InterestsCard = () => {
  const { control } = useFormContext<B2CProfileSchemaType>();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Interests, Lifestyle & Preferences
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="interests"
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <FormLabel>Interests</FormLabel>
              <AdvancedSelector
                multi
                onChange={field.onChange}
                value={field.value}
                placeholder="Select your hobby"
                presets={HOBBIES_LIST.map((hobby) => hobby.label)}
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
          name="lifestylePreferences"
          label="Lifestyle Preferences"
          placeholder="Enter your lifestyle preferences (optional)"
        />
      </CardContent>
    </Card>
  );
};

export default InterestsCard;
