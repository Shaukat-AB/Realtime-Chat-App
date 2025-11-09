import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components";
import { HomePage, ProfilePage, SigninPage, SignupPage } from "./pages";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;
