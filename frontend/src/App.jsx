import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components";
import {
    HomePage,
    ProfilePage,
    SettingsPage,
    SigninPage,
    SignupPage,
} from "./pages";

const App = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </div>
    );
};

export default App;
