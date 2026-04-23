import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  gender: z.enum(['male', 'female'], { required_error: 'Gender is required' }),
  age: z.coerce.number().min(18, 'Age must be at least 18'),
});

export const mockUsernames = [
  'johndoe', 'janedoe', 'admin123', 'user456', 'testuser', 'demo', 'guest'
];