'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import InputField from './input-field';
import TextareaField from '@/components/text-area';
import { B2CProfileSchemaType } from './b2c-create-form-schema';

const PersonalWebCard = () => {
  const { control } = useFormContext<B2CProfileSchemaType>();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Personal Web & Digital Presence
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-4 gap-4">
        <InputField
          control={control}
          name="personalWebsite"
          label="Personal Website"
          placeholder="Enter personal website URL"
        />
        <InputField
          control={control}
          name="portfolio"
          label="Portfolio"
          placeholder="Enter portfolio URL"
        />
        <InputField
          control={control}
          name="blog"
          label="Blog"
          placeholder="Enter blog URL"
        />
        <InputField
          control={control}
          name="onlineResume"
          label="Online Resume"
          placeholder="Enter online resume URL"
        />

        <TextareaField
          control={control}
          name="othersWeb"
          label="Others"
          placeholder="Enter other digital presence URLs"
        />
      </CardContent>
    </Card>
  );
};

export default PersonalWebCard;
