'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import InputField from './input-field';

const CareerSummaryCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Career Summary</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">
        {/* Total Years of Experience */}
        <InputField
          control={control}
          name="totalExperience"
          label="Total Years of Experience *"
          placeholder="Enter total years of experience"
        />

        {/* Career Highlight */}
        <InputField
          control={control}
          name="careerHighlight"
          label="Career Highlight"
          placeholder="Enter a brief career highlight"
        />
      </CardContent>
    </Card>
  );
};

export default CareerSummaryCard;
