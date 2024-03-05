import { Route, Routes } from "react-router-dom";
// Dashboard
import Dashboard from "./Pages/Dashboard/Dashboard";
// Users
import Users from "./Pages/Dashboard/User/Users";
import CreateUser from "./Pages/Dashboard/User/CreateUser";
import UpdateUser from "./Pages/Dashboard/User/updateUser";
// WebSite
import Home from "./Pages/Website/Home";
// Auth
import Login from "./Pages/Website/Auth/Login";
import SignUp1 from "./Pages/Website/Auth/SignUp1";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import PersistLogin from "./Pages/Website/Auth/PersistLogin";
import Products from "./Pages/Dashboard/Products/Products";
import NewProduct from "./Pages/Dashboard/Products/NewProducts";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";
export default function App() {
  return (
    <div>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp1 />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route  */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route exact path="users" element={<Users />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="products" element={<Products />} />
              <Route path="products" element={<Products />} />
              <Route path="products/create" element={<NewProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
