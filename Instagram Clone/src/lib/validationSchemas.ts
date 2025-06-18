import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const profileSetupSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  fullName: z.string().max(50, 'Name must be less than 50 characters').optional(),
  bio: z.string().max(150, 'Bio must be less than 150 characters').optional(),
});

export const postSchema = z.object({
  caption: z.string().max(2200, 'Caption must be less than 2200 characters').optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  image: z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, 'Image must be less than 5MB'),
});

export const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(500, 'Comment must be less than 500 characters'),
});

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
export type ProfileSetupData = z.infer<typeof profileSetupSchema>;
export type PostData = z.infer<typeof postSchema>;
export type CommentData = z.infer<typeof commentSchema>;