import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputField from './input-field';
import { useFormContext } from 'react-hook-form';
import SelectField from './select-filed';
import { COUNTRY_LIST, GENDER_LIST } from './data';
const PersonalDetailsCard = () => {
  const { control } = useFormContext();
  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Identity & Personal Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-4">
        <InputField
          control={control}
          label="Full Name"
          name="fullName"
          placeholder="Enter full name here"
        />
        <InputField
          control={control}
          label="Nickname"
          name="nickname"
          placeholder="Enter nickname here"
        />
        <InputField
          control={control}
          label="Date of Birth"
          name="dob"
          type="date"
        />
        <SelectField
          control={control}
          name="nationality"
          label="Nationality"
          options={COUNTRY_LIST}
          placeholder="Select Nationality"
          className=""
        />
        <SelectField
          control={control}
          name="gender"
          label="Gender"
          options={GENDER_LIST}
          placeholder="Select Gender"
        />
      </CardContent>
    </Card>
  );
};

export default PersonalDetailsCard;
