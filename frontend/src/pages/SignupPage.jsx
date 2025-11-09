import { useState } from "react";
import { Link } from "react-router-dom";
import { ChatSquareIcon, MailIcon, UserIcon } from "../lib/icons";
import { isFormValid } from "../lib/utils";
import { PasswordInput, SubmitBtnWithLoading } from "../components";
import { useSignup } from "../hooks";

const SignupPage = () => {
    const { mutate, isPending } = useSignup();
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
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
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
                            >
                                <ChatSquareIcon className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">
                                Create Account
                            </h1>
                            <p className="text-base-content/60">
                                Get started with your free account
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Full Name
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute z-1 inset-y-0 top-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="w-5 h-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="your name"
                                    value={formData.fullname}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            fullname: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

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
                            title="Sign up"
                            isLoading={isPending}
                        />
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/signin" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
