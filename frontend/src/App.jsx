import { Navigate, Route, Routes } from "react-router-dom";
import { LoadingSpinner, NavBar } from "./components";
import { HomePage, ProfilePage, SigninPage, SignupPage } from "./pages";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { useVerifyAuth } from "./hooks";

const App = () => {
    const { authUser } = useAuthStore();
    const { isLoading } = useVerifyAuth();

    if (isLoading && !authUser) {
        return (
            <>
                <NavBar />
                <LoadingSpinner />
            </>
        );
    }

    return (
        <div>
            <NavBar />
            <Routes>
                <Route
                    index
                    element={
                        authUser ? <HomePage /> : <Navigate to="/signin" />
                    }
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
                    element={
                        authUser ? <ProfilePage /> : <Navigate to="/signin" />
                    }
                />
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;
