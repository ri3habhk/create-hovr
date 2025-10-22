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
  title: z.string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  
  bio: z.string()
    .trim()
    .max(2000, 'Bio must be less than 2000 characters')
    .optional(),
  
  location: z.string()
    .trim()
    .max(100, 'Location must be less than 100 characters')
    .optional(),
  
  hourlyRate: z.string()
    .optional()
    .refine(
      val => !val || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0 && parseFloat(val) <= 10000),
      'Hourly rate must be between 0 and 10000'
    ),
  
  experience: z.string()
    .optional()
    .refine(
      val => !val || (!isNaN(parseInt(val)) && parseInt(val) >= 0 && parseInt(val) <= 80),
      'Experience must be between 0 and 80 years'
    ),
  
  skills: z.string()
    .transform(val => val.split(',').map(s => s.trim()).filter(s => s.length > 0))
    .refine(arr => arr.length <= 20, 'Maximum 20 skills allowed')
    .refine(arr => arr.every(s => s.length <= 50), 'Each skill must be under 50 characters'),
  
  categories: z.string()
    .transform(val => val.split(',').map(s => s.trim()).filter(s => s.length > 0))
    .refine(arr => arr.length <= 10, 'Maximum 10 categories allowed')
    .refine(arr => arr.every(s => s.length <= 50), 'Each category must be under 50 characters')
});

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
