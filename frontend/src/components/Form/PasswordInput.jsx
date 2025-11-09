import { useState } from "react";
import { EyeOffIcon, EyeOnIcon, LockIcon } from "../../lib/icons";

const PasswordInput = ({ value, onChange }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
                <div className="absolute z-1 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="w-5 h-5 text-base-content/40" />
                </div>
                <input
                    type={show ? "text" : "password"}
                    className={`input input-bordered w-full pl-10`}
                    placeholder="••••••••"
                    value={value}
                    onChange={onChange}
                    required
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShow(!show)}
                >
                    {show ? (
                        <EyeOnIcon className="h-5 w-5 text-base-content/40" />
                    ) : (
                        <EyeOffIcon className="h-5 w-5 text-base-content/40" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
