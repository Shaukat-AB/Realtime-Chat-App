import { useState } from 'react';
import {
  EmailInput,
  FormEndLink,
  FormTitleWithIconText,
  PasswordInput,
  SubmitBtnWithLoading,
} from '../components';
import { useSignin } from '../hooks';
import { isSigninUserValid } from '../lib/utils';

const SigninPage = () => {
  const { mutate, isPending } = useSignin();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSigninUserValid(formData) === true) {
      mutate(formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <title>Signin | Chat-App</title>

      <div className="w-full flex flex-col justify-center items-center px-6 sm:px-12">
        <div className="w-full max-w-sm space-y-8 md:max-w-md">
          <FormTitleWithIconText
            title="Welcome Back"
            text="Sign in to your account"
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            <EmailInput value={formData.email} onChange={handleChange} />
            <PasswordInput value={formData.password} onChange={handleChange} />

            <SubmitBtnWithLoading title="Sign In" isLoading={isPending} />
          </form>

          <FormEndLink
            to="/signup"
            title="Sign up"
            text="Don't have an account?"
          />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
