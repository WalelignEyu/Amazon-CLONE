
import React from "react";
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRout from "./components/ProtectedRout/ProtectedRout";

const stripePromise = loadStripe(
	"pk_test_51PJJGPH5A3tp62RGVrXmg75te0GvxIaa5kaFYBaU50cmDIHLhkuORZXEvqcRHRm3dmNuXd4t0YpmiMzqQvrNU9zr00zt8McCT0"
);
function Routering() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/auth" element={<Auth />} />
				<Route
					path="/payment"
					element={
						<ProtectedRout
							msg={"You must login to check out"}
							redirect={"/payment"}
						>
							<Elements stripe={stripePromise}>
								<Payment />
							</Elements>
						</ProtectedRout>
					}
				/>
				<Route
					path="/orders"
					element={
						<ProtectedRout
							msg={"You must login to see orders"}
							redirect={"/orders"}
						>
							<Orders />
						</ProtectedRout>
					}
				/>
				<Route path="/catagory/:catagoryName" element={<Results />} />
				<Route path="/products/:productId" element={<ProductDetail />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</Router>
	);
}

export default Routering;