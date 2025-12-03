import z from 'zod';
export const B2CProfileSchema = z.object({
  // personal details
  fullName: z.string().min(2, 'Business name is required'),
  nickname: z.string().optional(),
  nationality: z.string().min(1, 'Nationality is required'),
  dob: z.string().optional(),
  gender: z.string().min(1, 'Gender is required'),
});

export type B2CProfileSchemaType = z.infer<typeof B2CProfileSchema>;
