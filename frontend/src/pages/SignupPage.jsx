import { useState } from 'react';
import { isFormValid } from '../lib/utils';
import {
  EmailInput,
  FormEndLink,
  FormTitleWithIconText,
  PasswordInput,
  SubmitBtnWithLoading,
} from '../components';
import { useSignup } from '../hooks';
import { UserIcon } from '../lib/icons';

const SignupPage = () => {
  const { mutate, isPending } = useSignup();
  const [formData, setFormData] = useState({
    fullname: '',
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
    if (isFormValid(formData) == true) {
      mutate(formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full flex flex-col justify-center items-center py-6 sm:py-12">
        <div className="w-full max-w-sm space-y-8 md:max-w-md">
          <FormTitleWithIconText
            title="Create Account"
            text="Get started with your free account"
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute z-1 inset-y-0 top-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="w-5 h-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  name="fullname"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="your name"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <EmailInput value={formData.email} onChange={handleChange} />
            <PasswordInput value={formData.password} onChange={handleChange} />

            <SubmitBtnWithLoading title="Sign up" isLoading={isPending} />
          </form>

          <FormEndLink
            to="/signin"
            title="Sign in"
            text="Already have an account?"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
