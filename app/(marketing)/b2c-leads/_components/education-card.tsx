'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import InputField from './input-field';

const EducationCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Education & Academic
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-4 gap-4">
        <InputField
          control={control}
          name="highestDegree"
          label="Highest Degree *"
          placeholder="Enter highest degree"
        />
        <InputField
          control={control}
          name="degreesEarned"
          label="Degrees Earned"
          placeholder="Enter degrees earned"
        />
        <InputField
          control={control}
          name="institutions"
          label="Institutions"
          placeholder="Enter institutions attended"
        />
        <InputField
          control={control}
          name="fieldsOfStudy"
          label="Fields of Study"
          placeholder="Enter fields of study"
        />
        <InputField
          control={control}
          name="graduationDates"
          label="Graduation Dates"
          placeholder="Enter graduation dates"
        />
        <InputField
          control={control}
          name="gpa"
          label="GPA"
          placeholder="Enter GPA"
        />
        <InputField
          control={control}
          name="academicHonors"
          label="Academic Honors / Awards"
          placeholder="Enter academic honors / awards"
        />

        <InputField
          control={control}
          name="publications"
          label="Publications"
          placeholder="Enter publications"
        />
        <InputField
          control={control}
          name="researchAreas"
          label="Research Areas"
          placeholder="Enter research areas"
        />
        <InputField
          control={control}
          name="thesisTitle"
          label="Thesis / Dissertation Title"
          placeholder="Enter thesis/dissertation title"
        />
        <InputField
          control={control}
          name="academicIds"
          label="Academic IDs (ORCID / ResearchGate / Google Scholar)"
          placeholder="Enter academic IDs"
        />
      </CardContent>
    </Card>
  );
};

export default EducationCard;
