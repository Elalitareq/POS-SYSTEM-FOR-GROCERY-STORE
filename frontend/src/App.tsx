import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./layout/layout";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product/Product";
import Category from "./pages/Category/Category";
import Batch from "./pages/Batch/Batch";
import TransactionDetails from "./pages/TrasactionDetails/TransactionDetails";
import Transaction from "./pages/Transaction/Transaction";
import User from "./pages/User/User";
import Action from "./pages/Action/Action";
import AddCategory from "./pages/Category/AddCategory";
import EditCategory from "./pages/Category/EditCategory";
import CategoryIndex from "./pages/Category/CatedoryIndex";
import AddProduct from "./pages/Product/AddProduct";
import EditProduct from "./pages/Product/EditProduct";
import ProductIndex from "./pages/Product/ProductsIndex";
import UserIndex from "./pages/User/UserIndex";
import AddUser from "./pages/User/AddUser";
import EditUser from "./pages/User/EditUser";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<AuthOutlet fallbackPath="/login" />}>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="products" element={<ProductIndex />}>
                        <Route index element={<Product />} />
                        <Route path="add-products" element={<AddProduct />} />
                        <Route
                            path="edit-products/:id"
                            element={<EditProduct />}
                        />
                    </Route>
                    <Route path="categories" element={<CategoryIndex />}>
                        <Route index element={<Category />} />
                        <Route
                            path="add-categories"
                            element={<AddCategory />}
                        />
                        <Route
                            path="edit-categories/:id"
                            element={<EditCategory />}
                        />
                    </Route>

                    <Route path="batch" element={<Batch />} />
                    <Route
                        path="transaction-details"
                        element={<TransactionDetails />}
                    />
                    <Route path="transactions" element={<Transaction />} />
                    <Route path="users" element={<UserIndex />}>
                        <Route index element={<User />} />
                        <Route path="add-users" element={<AddUser />} />
                        <Route path="edit-users/:id" element={<EditUser />} />
                    </Route>
                    <Route path="actions" element={<Action />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
