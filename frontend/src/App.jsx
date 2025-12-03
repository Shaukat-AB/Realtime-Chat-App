import { Navigate, Route, Routes } from 'react-router-dom';
import { LoadingSpinner, NavBar } from './components';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';
import { useVerifyAuth } from './hooks';
import { ErrorBoundary } from 'react-error-boundary';
import {
  ErrorPage,
  HomePage,
  ProfilePage,
  SigninPage,
  SignupPage,
} from './pages';
import { Activity } from 'react';

const App = () => {
  const { authUser } = useAuthStore();
  const { isLoading } = useVerifyAuth();

  return (
    <>
      <NavBar />

      <main>
        {isLoading && !authUser && <LoadingSpinner />}

        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Activity mode={isLoading && !authUser ? 'hidden' : 'visible'}>
            <Routes>
              <Route
                index
                element={authUser ? <HomePage /> : <Navigate to="/signin" />}
              />

              <Route
                path="/signup"
                element={!authUser ? <SignupPage /> : <Navigate to="/" />}
              />

              <Route
                path="/signin"
                element={!authUser ? <SigninPage /> : <Navigate to="/" />}
              />

              <Route
                path="/profile"
                element={authUser ? <ProfilePage /> : <Navigate to="/signin" />}
              />

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Activity>
        </ErrorBoundary>
      </main>

      <Toaster />
    </>
  );
};

export default App;
