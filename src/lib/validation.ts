import { z } from 'zod';

// Project validation schema
export const projectSchema = z.object({
  project_name: z.string()
    .trim()
    .min(3, 'Project name must be at least 3 characters')
    .max(100, 'Project name must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s\-\.]+$/, 'Project name contains invalid characters'),
  
  description: z.string()
    .trim()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  
  location: z.string()
    .trim()
    .max(100, 'Location must be less than 100 characters')
    .optional(),
  
  tags: z.array(
    z.string()
      .trim()
      .min(2, 'Tag must be at least 2 characters')
      .max(30, 'Tag must be less than 30 characters')
  ).max(10, 'Maximum 10 tags allowed'),
  
  budget: z.string().min(1, 'Budget is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  freelancer_type: z.string().min(1, 'Freelancer type is required')
});

// Portfolio validation schema
export const portfolioSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  
  lastName: z.string()
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  
  aliasName: z.string()
    .trim()
    .max(100, 'Alias name must be less than 100 characters')
    .optional(),
  
  majorOccupation: z.string()
    .trim()
    .min(1, 'Major occupation is required'),
  
  minorOccupation: z.string()
    .trim()
    .optional(),
  
  location: z.string()
    .trim()
    .min(1, 'Location is required')
    .max(100, 'Location must be less than 100 characters'),
  
  budgetMin: z.string()
    .min(1, 'Minimum budget is required')
    .refine(
      val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
      'Minimum budget must be a valid positive number'
    ),
  
  budgetMax: z.string()
    .min(1, 'Maximum budget is required')
    .refine(
      val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
      'Maximum budget must be a valid positive number'
    ),
  
  bio: z.string()
    .trim()
    .min(10, 'Bio must be at least 10 characters')
    .max(1500, 'Bio must be less than 250 words (approximately 1500 characters)'),
  
  skills: z.string()
    .trim()
    .min(1, 'At least one skill is required')
    .max(500, 'Skills list is too long')
}).refine(
  data => parseFloat(data.budgetMax) >= parseFloat(data.budgetMin),
  {
    message: 'Maximum budget must be greater than or equal to minimum budget',
    path: ['budgetMax']
  }
);

// Auth validation schemas
export const signUpSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long')
    .optional(),
  
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional(),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long'),
  
  confirmPassword: z.string(),
  
  fullName: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
}).refine(data => data.email || data.phone, {
  message: "Either email or phone is required",
  path: ["email"]
});

export const signInSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long')
    .optional(),
  
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional(),
  
  password: z.string()
    .min(1, 'Password is required')
}).refine(data => data.email || data.phone, {
  message: "Either email or phone is required",
  path: ["email"]
});

// File validation constants
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/quicktime',
  'application/pdf'
];

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `${file.name} is not an allowed file type. Allowed: images, videos, PDFs`
    };
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `${file.name} exceeds 10MB size limit`
    };
  }
  
  return { valid: true };
};
