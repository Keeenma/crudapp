import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CreateUser from "../pages/CreateUser";
import EditUser from "../pages/EditUser";

function TheRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/members" element={<CreateUser />} />
      <Route path="/members/:id/edit" element={<EditUser />} />
    </Routes>
  );
}

export default TheRouter;
