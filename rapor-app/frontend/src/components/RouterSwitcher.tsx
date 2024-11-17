import { Route, Routes } from "react-router-dom";

import {
  NotFound,
  Home,
  About,
  CreateTechnician,
  Employees,
  CreateRecord,
  Profile,
  Login,
  Register,
} from "../pages";
import SingleRecord from "../pages/SingleRecord";
import UpdateRecordPage from "../pages/UpdateRecord";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const RouteSwitcher = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const isAdmin = authUser?.role === "admin";
  const isTechnician = authUser?.role === "technician";
  return (
    <Routes>
      <Route
        path="/create-technician"
        element={isAdmin ? <CreateTechnician /> : <Home />}
      />
      <Route path="/employees" element={isAdmin ? <Employees /> : <Home />} />
      <Route
        path="/create-record"
        element={isTechnician ? <CreateRecord /> : <Home />}
      />
      <Route path="/profile" element={isTechnician ? <Profile /> : <Home />} />
      <Route
        path="/update-record/:id"
        element={isTechnician ? <UpdateRecordPage /> : <Home />}
      />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/records/:id" element={<SingleRecord />} />
      <Route path="/login" element={authUser ? <Home /> : <Login />} />
      <Route path="/register" element={authUser ? <Home /> : <Register />} />
    </Routes>
  );
};

export default RouteSwitcher;
