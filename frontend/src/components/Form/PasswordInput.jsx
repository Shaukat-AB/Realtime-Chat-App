import { useState } from 'react';
import { EyeOffIcon, EyeOnIcon, LockIcon } from '../../lib/icons';

const PasswordInput = ({ value, onChange }) => {
  const IconStyle = 'w-5 h-5 text-base-content/40 z-4';
  const [show, setShow] = useState(false);

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium">Password</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LockIcon className={IconStyle} />
        </div>
        <input
          type={show ? 'text' : 'password'}
          name="password"
          className={'input input-bordered w-full px-10'}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          maxLength={36}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <EyeOnIcon className={IconStyle} />
          ) : (
            <EyeOffIcon className={IconStyle} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
