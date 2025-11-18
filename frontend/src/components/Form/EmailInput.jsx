import { MailIcon } from '../../lib/icons';

const EmailInput = ({ value, onChange }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium">Email</span>
      </label>
      <div className="relative">
        <div className="absolute z-1 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MailIcon className="w-5 h-5 text-base-content/40" />
        </div>
        <input
          type="email"
          name="email"
          className={'input input-bordered w-full pl-10'}
          placeholder="name@email.com"
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default EmailInput;
