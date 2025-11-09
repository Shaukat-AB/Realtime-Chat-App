import { useState } from "react";
import { Link } from "react-router-dom";
import { ChatSquareIcon, MailIcon } from "../lib/icons";
import { PasswordInput, SubmitBtnWithLoading } from "../components";
import { useSignin } from "../hooks";

const SigninPage = () => {
    const { mutate, isPending } = useSignin();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full flex flex-col justify-center items-center px-6 sm:px-12">
                <div className="w-full max-w-sm space-y-8 md:max-w-md">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
                            >
                                <ChatSquareIcon className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">
                                Welcome Back
                            </h1>
                            <p className="text-base-content/60">
                                Sign in to your account
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Email
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute z-1 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MailIcon className="w-5 h-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="name@email.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <PasswordInput
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                        <SubmitBtnWithLoading
                            title="Sign In"
                            isLoading={isPending}
                        />
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="link link-primary">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SigninPage;
