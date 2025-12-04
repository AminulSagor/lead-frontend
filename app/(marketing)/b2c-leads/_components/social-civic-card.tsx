'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import InputField from './input-field';

const SocialCivicCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Social & Civic Activities
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-4 gap-4">
        <InputField
          control={control}
          name="organizations"
          label="Organizations / Groups *"
          placeholder="Enter organizations or groups"
        />
        <InputField
          control={control}
          name="role"
          label="Role / Position"
          placeholder="Enter role or position"
        />
        <InputField
          control={control}
          name="activities"
          label="Activities"
          placeholder="Enter activities"
        />
        <InputField
          control={control}
          name="civicEngagement"
          label="Civic Engagement"
          placeholder="Enter civic engagement details"
        />
        <InputField
          control={control}
          name="policyInterests"
          label="Policy Interests (non-political identity)"
          placeholder="Enter policy interests"
        />
      </CardContent>
    </Card>
  );
};

export default SocialCivicCard;
