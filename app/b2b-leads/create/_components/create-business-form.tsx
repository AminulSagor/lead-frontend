'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  BusinessProfileFormType,
  B2BProfileSchema,
} from './b2b-create-form-schema';
import { useCreateBusinessProfile } from '@/query/b2b/create-b2b-leads';
import Link from 'next/link';
import { ArrowLeftCircle } from 'lucide-react';

export default function CreateBusinessForm() {
  const form = useForm<BusinessProfileFormType>({
    resolver: zodResolver(B2BProfileSchema),
    defaultValues: {
      // business profile
      businessId: '',
      name: '',
      businessType: '',
      businessDescription: '',
      registrationNumber: '',
      taxId: '',
      establishedDate: '',
      status: '',
      // industry classifications
      primaryIndustry: '',
      niche: '',
      subNiche: '',
      // services
      serviceName: '',
      category: '',
      subCategory: '',
      serviceDescription: '',
      pricingModel: 'Hourly',
      rate: '',
      currency: 'USD',
      serviceAvailability: 'Online',
      onlineService: 'Yes',
      // location
      street: '',
      subCity: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Bangladesh',
      // business info
      businessPhone: '',
      secondaryPhone: '',
      email: '',
      supportEmail: '',
      website: '',
      // key contact
      keyContactName: '',
      keyContactPosition: '',
      keyContactDepartment: '',
      keyContactPhone: '',
      keyContactEmail: '',
      keyContactLinkedIn: '',
      // online presence
      opFacebook: '',
      opInstagram: '',
      opLinkedin: '',
      opTwitter: '',
      opYoutube: '',
      opTiktok: '',
      opGoogleBusiness: '',
      opDirectoryListings: '',
      // operations
      operationsOpeningHours: '',
      operationsTimeZone: '',
      operationsEmployees: '',
      operationsTools: '',
      operationsCertifications: '',
      // financial information
      fnPaymentMethods: '',
      fnBillingAddress: '',
      fnInvoiceContact: '',
      fnPrimaryCurrency: '',
      fnPaymentTerms: '',
      // legal information
      legalLicenses: '',
      legalPermits: '',
      legalInsurance: '',
      legalComplianceCertificates: '',
      // marketing information
      marketingTargetAudience: '',
      marketingValueProposition: '',
      marketingMainCompetitors: '',
      marketingKeywords: '',
      // meta data
      metaTags: '',
      metaNotes: '',
      metaDateAdded: '',
      metaLastUpdated: '',
    },
  });

  // Example: dynamic options
  const industryOptions = ['IT', 'Healthcare', 'Education'];
  const nicheOptions: Record<string, string[]> = {
    IT: ['Web Development', 'Mobile Apps', 'AI/ML'],
    Healthcare: ['Hospitals', 'Pharma', 'Diagnostics'],
    Education: ['Schools', 'Colleges', 'Online Courses'],
  };
  const subNicheOptions: Record<string, string[]> = {
    'Web Development': ['Frontend', 'Backend', 'Full Stack'],
    'Mobile Apps': ['iOS', 'Android', 'Cross-platform'],
    'AI/ML': ['NLP', 'Computer Vision', 'Data Science'],
    Hospitals: ['General', 'Specialty'],
    Pharma: ['OTC', 'Prescription'],
    Diagnostics: ['Labs', 'Imaging'],
    Schools: ['Primary', 'Secondary'],
    Colleges: ['Engineering', 'Arts', 'Science'],
    'Online Courses': ['Tech', 'Business', 'Design'],
  };

  // industry vars
  const primary = form.watch('primaryIndustry');
  const niche = form.watch('niche');

  // service vars
  const pricingModels = ['Hourly', 'Fixed', 'Tiered', 'Subscription'];
  const availabilityOptions = ['Online', 'On-Site', 'Hybrid'];
  const currencyOptions = ['USD', 'EUR', 'GBP', 'BDT'];

  // location
  const countries = ['Bangladesh', 'USA', 'UK', 'India', 'Canada', 'Australia'];

  const { mutate, isPending } = useCreateBusinessProfile();

  function onSubmit(values: BusinessProfileFormType) {
    console.log('FORM DATA:', values);
    mutate(values, {
      onSuccess: (data) => {
        console.log('DATA:', data);
        alert('Business Profile Created Successfully');
      },
      onError: (error) => {
        console.log('ERROR:', error);
        alert('Business Profile Creation Failed');
      },
    });
  }

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Business Profile
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  {/* Business ID */}
                  <FormField
                    control={form.control}
                    name="businessId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Business or Trade Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Business Type */}
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type *</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="llc">LLC</SelectItem>
                              <SelectItem value="corp">Corporation</SelectItem>
                              <SelectItem value="sole">
                                Sole Proprietorship
                              </SelectItem>
                              <SelectItem value="partner">
                                Partnership
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Registration Number */}
                  <FormField
                    control={form.control}
                    name="registrationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tax ID */}
                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Established Date */}
                  <FormField
                    control={form.control}
                    name="establishedDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Founded</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status *</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="suspended">
                                Suspended
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="businessDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brief Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a short introduction..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* ===========================
              2. INDUSTRY CLASSIFICATION
          =========================== */}
            <Card className="border border-gray-200 shadow-none">
              <CardHeader>
                <CardTitle>Industry Classification</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                {/* Primary Industry */}
                <FormField
                  control={form.control}
                  name="primaryIndustry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Industry *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Primary Industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industryOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Niche */}
                <FormField
                  control={form.control}
                  name="niche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niche *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!primary}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Niche" />
                          </SelectTrigger>
                          <SelectContent>
                            {primary &&
                              nicheOptions[primary]?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sub-niche */}
                <FormField
                  control={form.control}
                  name="subNiche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub-niche *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!niche}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Sub-niche" />
                          </SelectTrigger>
                          <SelectContent>
                            {niche &&
                              subNicheOptions[niche]?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* service */}
            <Card className="border border-gray-200 shadow-none">
              <CardHeader>
                <CardTitle>Service Overview</CardTitle>
              </CardHeader>
              <CardContent className=" grid grid-cols-4 gap-4">
                {/* Service Name */}
                <FormField
                  control={form.control}
                  name="serviceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter service name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sub-category */}
                <FormField
                  control={form.control}
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub-category</FormLabel>
                      <FormControl>
                        <Input placeholder="Optional" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="serviceDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Optional description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pricing Model */}
                <FormField
                  control={form.control}
                  name="pricingModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pricing Model *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select pricing model" />
                          </SelectTrigger>
                          <SelectContent>
                            {pricingModels.map((model) => (
                              <SelectItem key={model} value={model}>
                                {model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter rate" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            {currencyOptions.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serviceAvailability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Availability *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            {availabilityOptions.map((a) => (
                              <SelectItem key={a} value={a}>
                                {a}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="onlineService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Online or Remote Service *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Yes/No" />
                          </SelectTrigger>
                          <SelectContent>
                            {['Yes', 'No'].map((o) => (
                              <SelectItem key={o} value={o}>
                                {o}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* location */}
            <Card className="border border-gray-200 shadow-none">
              <CardHeader>
                <CardTitle>Office Address</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-4 gap-4">
                {/* Street */}
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sub City / Locality / Upazilla */}
                <FormField
                  control={form.control}
                  name="subCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub City / Locality / Upazilla</FormLabel>
                      <FormControl>
                        <Input placeholder="Optional" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City / District */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City / District *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city/district" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* State / Province */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State / Province *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter state/province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Postal Code */}
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Optional" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* contact info */}
            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className=" grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="businessPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 555 555 5555" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secondaryPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Optional" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supportEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Support Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="support@company.com (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* key contact */}
            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle>Key Contact</CardTitle>
              </CardHeader>
              <CardContent className=" grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="keyContactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keyContactPosition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position / Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Manager (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keyContactDepartment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Marketing (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keyContactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 555 555 5555" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keyContactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="contact@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keyContactLinkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* online presence */}
            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle>Online Presence</CardTitle>
              </CardHeader>
              <CardContent className=" grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="opFacebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://opFacebook.com/yourpage"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="opInstagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://opInstagram.com/yourprofile"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="opLinkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://opLinkedin.com/company/yourbrand"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="opTwitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>X / Twitter</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://opTwitter.com/yourprofile"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="opYoutube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://opYoutube.com/@yourchannel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="opTiktok"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TikTok</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://opTiktok.com/@yourprofile"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="opGoogleBusiness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Business Profile</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Google Business URL (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="opDirectoryListings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Directory Listings</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Yelp, Trustpilot, etc. (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* operations */}
            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle>Operations</CardTitle>
              </CardHeader>
              <CardContent className=" grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="operationsOpeningHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operating Hours</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mon–Fri, 9am–6pm (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="operationsTimeZone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Zone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="GMT+6, PST, EST, etc. (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="operationsEmployees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Employees</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="50, 200+, etc. (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="operationsTools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tools / Technologies Used</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Slack, Jira, AWS, etc. (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="operationsCertifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certifications</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ISO, PCI DSS, etc. (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent className=" grid grid-cols-4 gap-4">
                {/* Payment Methods */}
                <FormField
                  control={form.control}
                  name="fnPaymentMethods"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Methods Accepted</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Visa, Mastercard, PayPal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Billing Address */}
                <FormField
                  control={form.control}
                  name="fnBillingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter billing address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Invoice Contact */}
                <FormField
                  control={form.control}
                  name="fnInvoiceContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Contact</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Person responsible for invoicing"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Primary Currency */}
                <FormField
                  control={form.control}
                  name="fnPrimaryCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Currency</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. USD, EUR, BDT" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Payment Terms */}
                <FormField
                  control={form.control}
                  name="fnPaymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Terms</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Net 30, Net 15" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle>Legal Information</CardTitle>
              </CardHeader>
              <CardContent className=" grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="legalLicenses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Licenses</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="List of licenses (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="legalPermits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Permits</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="List of permits (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="legalInsurance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insurance details (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="legalComplianceCertificates"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compliance Certificates</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Certificates (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/*  marketing information */}
            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle> Marketing Information</CardTitle>
              </CardHeader>
              <CardContent className=" grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="marketingTargetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describe your audience"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketingValueProposition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value Proposition</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your value proposition"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketingMainCompetitors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Competitors</FormLabel>
                      <FormControl>
                        <Input placeholder="List main competitors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketingKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords (SEO / Industry Terms)</FormLabel>
                      <FormControl>
                        <Input placeholder="SEO keywords" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* meta data */}
            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className=" grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="metaTags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter tags (comma separated)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Input placeholder="Any notes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDateAdded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Added</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaLastUpdated"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Updated</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              className="w-full py-6 text-base"
              disabled={isPending}
            >
              {isPending ? 'Saving...' : 'Save Business Profile'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
