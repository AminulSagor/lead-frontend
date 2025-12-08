'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import TextareaField from '@/components/text-area';

const MembershipsAffiliationsCard = () => {
  const { control } = useFormContext();
  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Memberships & Affiliations
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-4 gap-4">
        <TextareaField
          control={control}
          name="clubs"
          label="Clubs"
          placeholder="Enter clubs"
        />
        <TextareaField
          control={control}
          name="alumniGroups"
          label="Alumni Groups"
          placeholder="Enter alumni groups"
        />
        <TextareaField
          control={control}
          name="professionalAssociations"
          label="Professional Associations"
          placeholder="Enter professional associations"
        />
        <TextareaField
          control={control}
          name="nonprofits"
          label="Nonprofits"
          placeholder="Enter nonprofits"
        />
        <TextareaField
          control={control}
          name="loyaltyPrograms"
          label="Loyalty Programs"
          placeholder="Enter loyalty programs"
        />
        <TextareaField
          control={control}
          name="volunteerActivities"
          label="Volunteer Activities"
          placeholder="Enter volunteer activities"
        />
      </CardContent>
    </Card>
  );
};

export default MembershipsAffiliationsCard;
