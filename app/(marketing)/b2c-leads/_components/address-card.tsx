'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputField from './input-field';
import SelectField from './select-filed';
import { useFormContext } from 'react-hook-form';
import { COUNTRY_LIST, TIMEZONE_LIST } from './data';

const AddressCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Address & Location
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-4 gap-4">
        {/* Country */}
        <SelectField
          control={control}
          name="country"
          label="Country"
          placeholder="Select country"
          options={COUNTRY_LIST}
        />

        {/* State / Province */}
        <InputField
          control={control}
          name="state"
          label="State / Province"
          placeholder="Enter state / province"
        />

        {/* City / District */}
        <InputField
          control={control}
          name="city"
          label="City / District"
          placeholder="Enter city / district"
        />

        {/* Sub-city / Locality / Upazilla */}
        <InputField
          control={control}
          name="subCity"
          label="Sub-city / Locality / Upazilla"
          placeholder="Enter sub-city / locality / upazilla"
        />

        {/* City Corporation / Pourashova */}
        <InputField
          control={control}
          name="cityCorporation"
          label="City Corporation / Pourashova"
          placeholder="Select city corporation"
        />

        {/* Street / Building / Unit */}
        <InputField
          control={control}
          name="street"
          label="Street / Building / Unit"
          placeholder="Enter street / building / unit"
        />

        {/* Postal Code */}
        <InputField
          control={control}
          name="postalCode"
          label="Postal Code"
          placeholder="Enter postal code"
        />

        {/* Time Zone */}
        <SelectField
          control={control}
          name="timeZone"
          label="Time Zone"
          placeholder="Select time zone"
          options={TIMEZONE_LIST}
        />
      </CardContent>
    </Card>
  );
};

export default AddressCard;
