'use client';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useFieldArray, useFormContext } from 'react-hook-form';
import InputField from './input-field';
import TextareaField from '@/components/text-area';
import { Button } from '@/components/ui/button';
import { PlusIcon, X } from 'lucide-react';
import { B2CProfileSchemaType } from './b2c-create-form-schema';
import toast from 'react-hot-toast';

const SocialCivicCard = () => {
  const { control } = useFormContext<B2CProfileSchemaType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'civicActivities',
  });

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">
          Social & Civic Activities
        </CardTitle>
        <CardAction>
          <Button
            type="button"
            size="sm"
            className="cursor-pointer"
            onClick={() => {
              toast.success('New Civic Activity added');
              append({
                organizations: '',
                role: '',
                activities: '',
              });
            }}
          >
            <PlusIcon className="w-4 h-4 " />
          </Button>
        </CardAction>
      </CardHeader>

      {fields.length === 0 && (
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground text-center">
            Add social and civic activities.
          </p>
        </CardContent>
      )}

      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-200 rounded-md p-4 relative bg-gray-50"
          >
            {/* Remove Button */}
            <button
              type="button"
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300 ease-in-out hover:cursor-pointer"
              onClick={() => {
                remove(index);
                toast.error('Civic Activity removed');
              }}
            >
              <X className="h-4 w-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                control={control}
                name={`civicActivities.${index}.organizations`}
                label="Organizations / Groups"
                placeholder="Enter organizations or groups"
              />

              <InputField
                control={control}
                name={`civicActivities.${index}.role`}
                label="Role / Position"
                placeholder="Enter role or position"
              />

              <InputField
                control={control}
                name={`civicActivities.${index}.activities`}
                label="Activities"
                placeholder="Enter activities"
              />
            </div>
          </div>
        ))}

        <TextareaField
          control={control}
          name="civicEngagement"
          label="Civic Engagement"
          placeholder="Describe your civic engagement"
        />

        <TextareaField
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
