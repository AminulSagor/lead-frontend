'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import { Form } from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import {
  B2CProfileSchema,
  B2CProfileSchemaType,
} from './b2c-create-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from './input-field';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import SelectField from './select-filed';
import { COUNTRY_LIST, GENDER_LIST } from './data';

const B2CCreateForm = () => {
  const form = useForm<B2CProfileSchemaType>({
    resolver: zodResolver(B2CProfileSchema),
    defaultValues: {
      // personal details
      fullName: '',
      nickname: '',
      dob: '',
      gender: '',
      nationality: '',
      // contact and communication
    },
  });

  const onSubmit = (data: B2CProfileSchemaType) => {
    console.log(data);
  };
  return (
    <div className="space-y-4">
      <div>
        <Button asChild>
          <Link href={'/b2b-leads'}>
            <ArrowLeftCircle />
            Back
          </Link>
        </Button>
      </div>
      <div className=" mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Identity & Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                <InputField
                  control={form.control}
                  label="Full Name"
                  name="fullName"
                  placeholder="Enter full name here"
                />
                <InputField
                  control={form.control}
                  label="Nickname"
                  name="nickname"
                  placeholder="Enter nickname here"
                />
                <InputField
                  control={form.control}
                  label="Date of Birth"
                  name="dob"
                  type="date"
                />
                <SelectField
                  control={form.control}
                  name="nationality"
                  label="Nationality"
                  options={COUNTRY_LIST}
                  placeholder="Select Nationality"
                  className=""
                />
                <SelectField
                  control={form.control}
                  name="gender"
                  label="Gender"
                  options={GENDER_LIST}
                  placeholder="Select Gender"
                />
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Contact & Communication*
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                <InputField
                  control={form.control}
                  label="Full Name"
                  name="fullName"
                  placeholder="Enter full name here"
                />
                <InputField
                  control={form.control}
                  label="Nickname"
                  name="nickname"
                  placeholder="Enter nickname here"
                />
                <InputField
                  control={form.control}
                  label="Date of Birth"
                  name="dob"
                  type="date"
                />
                <SelectField
                  control={form.control}
                  name="nationality"
                  label="Nationality"
                  options={COUNTRY_LIST}
                  placeholder="Select Nationality"
                  className=""
                />
                <SelectField
                  control={form.control}
                  name="gender"
                  label="Gender"
                  options={GENDER_LIST}
                  placeholder="Select Gender"
                />
              </CardContent>
            </Card>
            <Button type="submit" size={'sm'}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default B2CCreateForm;
