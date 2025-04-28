import { z } from 'zod';

// Calculate minimum date of birth for 18+ by February 27, 2025
const minBirthDate = new Date('2025-02-27');
minBirthDate.setFullYear(minBirthDate.getFullYear() - 18);

// Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Last name can only contain letters and spaces'),
  
  email: z.string()
    .email('Invalid email address'),
  
  phone: z.string()
    .regex(/^\+[1-9]\d{1,14}$/, 'Please enter a valid phone number (e.g., +234...)'),
  
  dateOfBirth: z.string()
    .refine(date => {
      const dob = new Date(date);
      return dob <= minBirthDate;
    }, 'You must be at least 18 years old by February 27, 2025'),
  
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Please select your gender' })
  }),
  
  address: z.string()
    .min(10, 'Please provide a complete address')
    .max(200, 'Address is too long'),
  
  nationality: z.string()
    .min(2, 'Please specify your nationality'),
  
  stateOfOrigin: z.string()
    .min(2, 'Please specify your state of origin'),
  
  religion: z.string().optional(),
  
  disability: z.object({
    hasDisability: z.boolean(),
    details: z.string().optional()
  })
});

// Academic Background Schema
export const academicBackgroundSchema = z.object({
  educationLevel: z.enum(['none', 'primary', 'js', 'jsse', 'ssce', 'tertiary'], {
    errorMap: () => ({ message: 'Please select your education level' })
  }),
  
  tertiaryEducation: z.enum(['none', 'certificate', 'national_diploma', 'degree', 'other']).optional(),
  
  certificates: z.array(z.object({
    type: z.string().min(2, 'Certificate type is required'),
    grade: z.string().min(1, 'Grade is required'),
    year: z.string().regex(/^\d{4}$/, 'Please enter a valid year')
  }))
});

// Program Selection Schema
export const programSelectionSchema = z.object({
  program: z.string().min(1, 'Please select a program'),
  course: z.string().min(1, 'Please select a course'),
  startDate: z.string().min(1, 'Please select a start date'),
  studyMode: z.enum(['full-time', 'part-time', 'weekend'], {
    errorMap: () => ({ message: 'Please select a study mode' })
  }),
  previousExperience: z.string().optional(),
  careerGoals: z.string()
    .min(10, 'Please describe your career goals')
    .max(500, 'Career goals must not exceed 500 characters')
});

// Accommodation Schema
export const accommodationSchema = z.object({
  needsAccommodation: z.boolean(),
  sponsorshipType: z.enum(['self', 'organization', 'guardian'], {
    errorMap: () => ({ message: 'Please select a sponsorship type' })
  }),
  sponsorDetails: z.object({
    name: z.string().min(2, 'Sponsor name is required'),
    relationship: z.string().min(2, 'Please specify the relationship'),
    contact: z.string().min(5, 'Please provide contact information')
  })
});

// Referee Schema
export const refereeSchema = z.object({
  name: z.string()
    .min(2, 'Referee name is required')
    .max(100, 'Referee name is too long'),
  
  email: z.string()
    .email('Invalid email address')
    .refine(email => email !== '', 'Referee email is required'),
  
  phone: z.string()
    .regex(/^\+[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  
  relationship: z.string()
    .min(2, 'Please specify the relationship'),
  
  organization: z.string()
    .min(2, 'Organization name is required'),
  
  position: z.string()
    .min(2, 'Position is required')
});

// Complete Application Schema
export const applicationSchema = z.object({
  personalInfo: personalInfoSchema,
  academicBackground: academicBackgroundSchema,
  programSelection: programSelectionSchema,
  accommodation: accommodationSchema,
  referee: refereeSchema
}).refine(data => {
  // Ensure referee email is different from applicant's
  return data.referee.email !== data.personalInfo.email;
}, {
  message: "Referee's email must be different from your email",
  path: ['referee', 'email']
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type AcademicBackground = z.infer<typeof academicBackgroundSchema>;
export type ProgramSelection = z.infer<typeof programSelectionSchema>;
export type Accommodation = z.infer<typeof accommodationSchema>;
export type Referee = z.infer<typeof refereeSchema>;