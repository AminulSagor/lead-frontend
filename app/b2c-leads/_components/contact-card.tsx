import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputField from './input-field';
import { useFormContext } from 'react-hook-form';
import SelectField from './select-filed';

const ContactCard = () => {
  const { control } = useFormContext();
  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Contact & Communication
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-4">
        <InputField
          control={control}
          label="Primary Email"
          name="primaryEmail"
          placeholder="Enter primary email here"
        />
        <InputField
          control={control}
          label="Alternative Email"
          name="secondaryEmail"
          placeholder="Enter alternative email here"
        />
        <InputField
          control={control}
          label="Primary Phone"
          placeholder="Enter primary phone here"
          name="primaryPhone"
        />
        <InputField
          control={control}
          label="Alternative Phone"
          placeholder="Enter alternative phone here"
          name="secondaryPhone"
        />
        <InputField
          control={control}
          label="Whatsapp"
          placeholder="Enter whatsapp number here"
          name="whatsapp"
        />
        <InputField
          control={control}
          label="Telegram"
          placeholder="Enter telegram number here"
          name="telegram"
        />
        <InputField
          control={control}
          label="Wechat / Line / Others"
          placeholder="Enter wechat / line / others number here"
          name="wechat"
        />
        <SelectField
          control={control}
          name="prefferedContactMethod"
          label="Preferred Contact Method"
          placeholder="Select a contact method"
          options={[
            { label: 'Phone Call', value: 'phone' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'SMS', value: 'sms' },
            { label: 'Email', value: 'email' },
            { label: 'Messenger', value: 'messenger' },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default ContactCard;
