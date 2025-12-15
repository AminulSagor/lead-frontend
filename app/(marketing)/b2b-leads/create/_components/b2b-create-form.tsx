"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { AdvancedSelector } from "@/components/advance-selector";
import InputField from "@/components/input-field";
import TextareaField from "@/components/text-area";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftCircle, Plus, PlusIcon, X } from "lucide-react";
import Link from "next/link";
import {
  B2BProfileSchema,
  BusinessProfileFormType,
} from "./b2b-create-form-schema";
import { createB2BLead } from "@/actions/createB2BLead";
import { usePathname, useRouter } from "next/navigation";
import AttachmentCard from "./attachment-card";
import { updateB2BLead } from "@/actions/updateB2BLead";

export type B2BCreateFormProps = {
  initialData?: BusinessProfileFormType & {
    businessId?: string;
  };
};

export default function B2BCreateForm({ initialData }: B2BCreateFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<BusinessProfileFormType>({
    resolver: zodResolver(B2BProfileSchema),
    defaultValues: initialData || {
      // business profile
      name: "",
      businessType: "",
      businessDescription: "",
      registrationNumber: "",
      taxId: "",
      establishedDate: "",
      status: "",
      // industry classifications
      primaryIndustry: "",
      niche: "",
      subNiche: "",
      // services
      serviceOverview: [
        {
          category: "",
          subCategory: "",
          serviceDescription: "",
          pricingModel: "Hourly",
          rate: "",
          currency: "USD",
          serviceAvailability: "Online",
          onlineService: "Yes",
          serviceName: "",
        },
      ],
      // location
      street: "",
      subCity: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Bangladesh",
      // business info
      businessPhone: "",
      secondaryPhone: "",
      email: "",
      supportEmail: "",
      website: "",
      // key contact
      keyContacts: [
        {
          keyContactName: "",
          keyContactPosition: "",
          keyContactDepartment: "",
          keyContactPhone: "",
          keyContactEmail: "",
          keyContactLinkedIn: "",
        },
      ],
      // online presence
      opFacebook: "",
      opInstagram: "",
      opLinkedin: "",
      opTwitter: "",
      opYoutube: "",
      opTiktok: "",
      opGoogleBusiness: "",
      opDirectoryListings: "",
      // operations
      operationsOpeningHours: "",
      operationsTimeZone: "",
      operationsEmployees: "",
      operationsTools: "",
      operationsCertifications: "",
      // financial information
      fnPaymentMethods: "",
      fnBillingAddress: "",
      fnInvoiceContact: "",
      fnPrimaryCurrency: "",
      fnPaymentTerms: "",
      // legal information
      legalLicenses: "",
      legalPermits: "",
      legalInsurance: "",
      legalComplianceCertificates: "",
      // marketing information
      marketingTargetAudience: "",
      marketingValueProposition: "",
      marketingMainCompetitors: "",
      marketingKeywords: "",
      // meta data
      metaTags: [],
      metaNotes: "",
      // metaDateAdded:"",
      // metaLastUpdated: '',
      companyImgUrl: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const {
    fields: keyContactsFields,
    append: keyContactsAppend,
    remove: keyContactsRemove,
  } = useFieldArray({
    control: form.control,
    name: "keyContacts",
  });

  const {
    fields: serviceOverviewFields,
    append: serviceOverviewAppend,
    remove: serviceOverviewRemove,
  } = useFieldArray({
    control: form.control,
    name: "serviceOverview",
  });

  // service vars
  const pricingModels = ["Hourly", "Fixed", "Tiered", "Subscription"];
  const availabilityOptions = ["Online", "On-Site", "Hybrid"];
  const currencyOptions = ["USD", "EUR", "GBP", "BDT"];
  // location
  const countries = ["Bangladesh", "USA", "UK", "India", "Canada", "Australia"];

  const businessId = initialData?.businessId;

  async function onSubmit(values: BusinessProfileFormType) {
    if (!businessId) {
      // CREATE
      const res = await createB2BLead(values);
      if (res.statusCode === 400) {
        toast.error("Error Creating Lead");
        return;
      }
      toast.success("B2B lead created!");
      router.push("/b2b-leads");
    } else {
      // UPDATE

      const res = await updateB2BLead(businessId, values);
      // const data = await res.json();
      if (res.success) {
        toast.success("B2B lead updated!");
        router.push("/b2b-leads");
      } else {
        toast.error("Something went wrong! Try Later...");
      }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Button asChild>
          <Link href={"/b2b-leads"}>
            <ArrowLeftCircle />
            Back
          </Link>
        </Button>
      </div>
      <div className=" mx-auto">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Business Profile
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
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
                  <Controller
                    control={form.control}
                    name="businessType"
                    render={({ field, fieldState }) => (
                      <div className="space-y-2">
                        <FormLabel>Business Type</FormLabel>
                        <AdvancedSelector
                          onChange={field.onChange}
                          value={field.value}
                          placeholder="Select Business Type"
                          presets={[
                            "LLC",
                            "Corporation",
                            "Sole Proprietorship",
                            "Partnership",
                          ]}
                        />

                        {fieldState.error && (
                          <p className="text-sm text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  {/* Registration Number */}

                  <InputField
                    control={form.control}
                    placeholder="Optional"
                    name="registrationNumber"
                    label="Registration Number"
                  />

                  {/* Tax ID */}

                  <InputField
                    control={form.control}
                    placeholder="Optional"
                    name="taxId"
                    label="Tax ID"
                  />

                  {/* Established Date */}
                  <InputField
                    control={form.control}
                    label="Date Founded"
                    placeholder="12 Dec , 2023"
                    name="establishedDate"
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
              <CardContent className="grid grid-cols-4 gap-4">
                {/* Primary Industry */}

                <Controller
                  control={form.control}
                  name="primaryIndustry"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <FormLabel>Primary Industry *</FormLabel>
                      <AdvancedSelector
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Select Primary Industry"
                        presets={["IT", "Healthcare", "Education"]}
                      />

                      {fieldState.error && (
                        <p className="text-sm text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Niche */}

                <Controller
                  control={form.control}
                  name="niche"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <FormLabel>Niche</FormLabel>
                      <AdvancedSelector
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Select Niche"
                        presets={[
                          "Web Development",
                          "Mobile Apps",
                          "AI/ML",
                          "Hospitals",
                          "Pharma",
                          "Diagnostics",
                          "Schools",
                          "Colleges",
                          "Online Courses",
                        ]}
                      />

                      {fieldState.error && (
                        <p className="text-sm text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Sub-niche */}
                <Controller
                  control={form.control}
                  name="subNiche"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <FormLabel>Sub Niche</FormLabel>
                      <AdvancedSelector
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Select Sub Niche"
                        presets={[
                          "Frontend",
                          "Backend",
                          "Full Stack",
                          "iOS",
                          "Android",
                          "Cross-platform",
                          "NLP",
                          "Computer Vision",
                          "Data Science",
                          "General",
                          "Specialty",
                          "OTC",
                          "Prescription",
                          "Labs",
                          "Imaging",
                          "Primary",
                          "Secondary",
                          "Engineering",
                          "Arts",
                          "Science",
                          "Tech",
                          "Business",
                          "Design",
                        ]}
                      />

                      {fieldState.error && (
                        <p className="text-sm text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </CardContent>
            </Card>
            {/* service */}
            <Card className="border border-gray-200 shadow-none">
              <CardHeader>
                <CardTitle>Service Overview</CardTitle>
                <CardAction>
                  <Button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => {
                      toast.success("Service added!");
                      serviceOverviewAppend({
                        category: "",
                        subCategory: "",
                        currency: "",
                        onlineService: "Yes",
                        pricingModel: "Hourly",
                        rate: "",
                        serviceAvailability: "Hybrid",
                        serviceName: "",
                        serviceDescription: "",
                      });
                    }}
                  >
                    <PlusIcon />
                  </Button>
                </CardAction>
              </CardHeader>
              {serviceOverviewFields.length === 0 && (
                <CardContent>
                  <p className="text-sm text-gray-500 text-center">
                    No services added yet
                  </p>
                </CardContent>
              )}
              <CardContent className="space-y-4">
                {serviceOverviewFields.map((field, index) => (
                  <div
                    key={index}
                    className="p-5 border rounded-xl relative shadow-sm bg-white space-y-5"
                  >
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => {
                        toast.error("Service removed!");
                        serviceOverviewRemove(index);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Top Row — Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`serviceOverview.${index}.serviceName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter service name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`serviceOverview.${index}.category`}
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

                      <FormField
                        control={form.control}
                        name={`serviceOverview.${index}.subCategory`}
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
                    </div>

                    {/* Description */}
                    <div className="grid grid-cols-1">
                      <FormField
                        control={form.control}
                        name={`serviceOverview.${index}.serviceDescription`}
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
                    </div>

                    {/* Pricing & Options — Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Pricing Model */}
                      <FormField
                        control={form.control}
                        name={`serviceOverview.${index}.pricingModel`}
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

                      {/* Rate */}
                      <FormField
                        control={form.control}
                        name={`serviceOverview.${index}.rate`}
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

                      {/* Currency */}
                      <FormField
                        control={form.control}
                        name={`serviceOverview.${index}.currency`}
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

                      {/* Availability */}
                      <FormField
                        control={form.control}
                        name={`serviceOverview.${index}.serviceAvailability`}
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

                      {/* Online/Remote */}
                      <FormField
                        control={form.control}
                        name={`serviceOverview.${index}.onlineService`}
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
                                  {["Yes", "No"].map((o) => (
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
                    </div>
                  </div>
                ))}
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
                <CardAction>
                  <Button
                    type="button"
                    className="hover:cursor-pointer"
                    onClick={() => {
                      toast.success("Key contact added");
                      keyContactsAppend({
                        keyContactName: "",
                        keyContactPosition: "",
                        keyContactDepartment: "",
                        keyContactEmail: "",
                        keyContactPhone: "",
                        keyContactLinkedIn: "",
                      });
                    }}
                  >
                    <Plus />
                  </Button>
                </CardAction>
              </CardHeader>
              {keyContactsFields.length === 0 && (
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 text-center text-gray-500">
                    No key contacts added yet.
                  </div>
                </CardContent>
              )}
              <CardContent className="grid grid-cols-3 gap-4">
                {keyContactsFields.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative space-y-2 border p-4 rounded-md"
                  >
                    {/* ❌ Remove Button */}
                    <button
                      type="button"
                      onClick={() => {
                        toast.error("Key contact removed");
                        keyContactsRemove(index);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300 ease-in-out hover:cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <FormField
                      control={form.control}
                      name={`keyContacts.${index}.keyContactName`}
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
                      name={`keyContacts.${index}.keyContactPosition`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position / Role</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Manager (optional)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name={`keyContacts.${index}.keyContactDepartment`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Marketing (optional)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`keyContacts.${index}.keyContactPhone`}
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
                      name={`keyContacts.${index}.keyContactEmail`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="contact@company.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`keyContacts.${index}.keyContactLinkedIn`}
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
                  </div>
                ))}
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
              <CardContent className=" grid grid-cols-3 gap-4">
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

                <TextareaField
                  control={form.control}
                  label="Tools / Technologies Used"
                  name="operationsTools"
                  placeholder="Slack, Jira, AWS, etc. (optional)"
                />

                <TextareaField
                  control={form.control}
                  label="Certifications"
                  name="operationsCertifications"
                  placeholder="ISO, PCI DSS, etc. (optional)"
                />
              </CardContent>
            </Card>
            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-4 gap-4">
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
                        <Input
                          placeholder="Enter billing address (Optional)"
                          {...field}
                        />
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
                          placeholder="Person responsible for invoicing (Optional)"
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
                        <Input
                          placeholder="e.g. Net 30, Net 15 (Optional)"
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
              <CardContent className="grid grid-cols-4 gap-4">
                <TextareaField
                  control={form.control}
                  label="Target Audience"
                  name="marketingTargetAudience"
                  placeholder="Describe Your Audience (optional)"
                />

                <TextareaField
                  control={form.control}
                  label="Value Proposition"
                  name="marketingValueProposition"
                  placeholder="Your value proposition (optional)"
                />

                <TextareaField
                  control={form.control}
                  label="Main Competitors"
                  name="marketingMainCompetitors"
                  placeholder="List main competitors (optional)"
                />

                <TextareaField
                  control={form.control}
                  label="Keywords"
                  name="marketingKeywords"
                  placeholder="Keywords (SEO / Industry Terms) (optional)"
                />
              </CardContent>
            </Card>
            {/* meta data */}
            <Card className="border border-gray-200 shadow-none rounded-sm">
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className=" grid grid-cols-1 gap-4">
                <Controller
                  control={form.control}
                  name="metaTags"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <FormLabel>Business Type</FormLabel>
                      <AdvancedSelector
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Select Tags"
                        multi
                        presets={[
                          "Software",
                          "SaaS",
                          "IT Services",
                          "Web Development",
                          "Cloud",
                          "AI",
                        ]}
                      />

                      {fieldState.error && (
                        <p className="text-sm text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <TextareaField
                  control={form.control}
                  label="Notes"
                  name="metaNotes"
                  placeholder="Any notes (Optional)"
                />

                {/* <FormField
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
                /> */}
              </CardContent>
            </Card>

            <AttachmentCard />
            {/* SUBMIT BUTTON */}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full cursor-pointer "
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
