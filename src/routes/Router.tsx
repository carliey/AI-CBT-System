import { useEffect } from "react";
import { useAppDispatch } from "../app/store";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import LandingLayout from "../layout/Landing";
import Dashboard from "../pages/dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import Library from "../pages/library";
import Settings from "../pages/settings";
import Tests from "../pages/test";
import CreateTest from "../pages/test/CreateTest/CreateTest";

type ProtectedRoute = {
  user: any;
  children?: any;
};

const ProtectedRoute = ({ user, children }: ProtectedRoute) => {
  //wrapper component for protected routes
  const isAuth = !!user;

  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

const Router = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //const user = useSelector(selectCurrentUser);
  const user = { name: "muhammed" };

  useEffect(() => {
    //log the user back in with local storage data
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      // dispatch(login(JSON.parse(credentials)));
    }
  }, []);

  useEffect(() => {
    //route the user to dashboard, if a logged in user tries to access signin page
    if (!!user && location.pathname === "/signin") {
      navigate("/");
    }
  }, [location, user]);

  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      <Route
        //protected pages
        element={
          <ProtectedRoute user={user}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/library" element={<Library />} />
        <Route path="/tests">
          <Route index element={<Tests />} />
          <Route path="create" element={<CreateTest />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<h1>404, page not found</h1>} />
    </Routes>
  );
};

export default Router;
