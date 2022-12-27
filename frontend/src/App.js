import { Route, Routes } from "react-router-dom";
import Checkout from "./components/checkout/Checkout";
import AppLayout from "./components/layouts/AppLayout";
import Login from "./components/login/Login";
import Products from "./components/products/Products";
import Register from "./components/register/Register";
import Thanks from "./components/thanks/Thanks";

export const config = "http://localhost:8082/api/v1";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/" element={<Products />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
