import { z } from 'zod';

const PASSWORD_LEN = 6;

const newUserSchema = z.object({
  fullname: z
    .string()
    .min(3, 'Full name is required to be at least 3 characters long'),
  email: z.email('Email address is invalid'),
  password: z
    .string()
    .min(
      PASSWORD_LEN,
      `Password must be at least ${PASSWORD_LEN} characters long`
    ),
});

const signinUserSchema = z.object({
  email: z.email('Invalid Email address or Password'),
  password: z.string().min(PASSWORD_LEN, 'Invalid Email address or Password'),
});

export const safeNewUserParse = (user) => {
  const result = newUserSchema.safeParse(user);

  return {
    success: result.success,
    message: result.error?.issues?.map((err) => err?.message).join(', '),
  };
};

export const safeSigninUserParse = (user) => {
  const result = signinUserSchema.safeParse(user);

  return {
    success: result.success,
    message: result.error?.issues?.map((err) => err?.message).join(', '),
  };
};
