import { Link } from 'react-router-dom';
import { XIcon } from '../lib/icons';

export const ErrorPage = ({ error = null, resetErrorBoundary = null }) => {
  return (
    <div className="pt-20 px-4 h-screen">
      <title>Page Not Found | Chat-App</title>

      <div className="max-w-2xl mx-auto px-4 py-8 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-16 text-6xl tracking-tight font-extrabold text-primary">
            {!error ? 404 : error?.message || 'Something went wrong!'}
          </h1>

          <div role="alert" className="mb-8 alert alert-error">
            <XIcon className="border-2 rounded-4xl h-6 w-6 shrink-0 stroke-current" />
            <span className="text-lg font-light">
              Error! Page not found. Check your link address and try again.
            </span>
          </div>

          <div className="flex items-center justify-center gap-8">
            {resetErrorBoundary && (
              <button
                className="btn btn-secondary"
                onClick={resetErrorBoundary}
              >
                Retry
              </button>
            )}

            <Link to="/" className="btn btn-soft btn-info">
              Back to HomePage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
