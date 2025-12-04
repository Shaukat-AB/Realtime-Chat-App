import { Link } from 'react-router-dom';
import { XIcon } from '../lib/icons';

const NotFoundPage = () => {
  return (
    <div className="pt-20 px-4 h-screen">
      <title>Page Not Found | Chat-App</title>

      <div className="h-4/5 flex items-center justify-center">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-8 text-2xl tracking-tight font-extrabold text-primary">
            '404 - Page Not Found!'
          </h1>

          <div role="alert" className="mb-8 alert alert-soft alert-error">
            <XIcon className="border-2 rounded-4xl h-6 w-6 shrink-0 stroke-current" />
            <span className="text-lg font-semibold">
              Error! Page not found. Check your link address and try again.
            </span>
          </div>

          <Link to="/" className="btn btn-soft btn-info">
            Back to HomePage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
