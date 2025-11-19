import { Link } from 'react-router-dom';
import { XIcon } from '../lib/icons';

export const ErrorPage = () => {
  return (
    <div className="pt-20 h-screen">
      <title>Page Not Found | Chat-App</title>

      <div className="max-w-2xl mx-auto px-4 py-8 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-5 text-7xl tracking-tight font-extrabold text-primary">
            404
          </h1>

          <div role="alert" className="mb-5 alert alert-error">
            <XIcon className="border-2 rounded-4xl h-6 w-6 shrink-0 stroke-current" />
            <span className="text-lg font-light">
              Error! Page not found. Check your link address and try again.
            </span>
          </div>

          <Link to="/" className="mb-5 btn btn-soft btn-info">
            Back to HomePage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
