import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Await, Link } from "react-router-dom";
import ProductCard from "../../components/Products/ProductCard";
import logo from "../../images/amazon-logo.png";
import keyLogo from "../../images/key.png";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/Axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/Firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/Action.type";

function Payment() {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const [{ user, basket }, dispatch] = useContext(DataContext);
	const [processing, setProcessing] = useState(false);
	// console.log(user);
	const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
	const [cardError, setCardError] = useState(null);
	const total = basket.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);
	const handleChange = (e) => {
		// console.log(e);
		e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
	};
	const handlePayment = async (e) => {
		e.preventDefault();
		//1. backend || functions -----> contact to the client secret

		try {
			setProcessing(true);
			const response = await axiosInstance({
				method: "POST",
				url: `/payment/create?total=${total * 100}`,
			});
			// console.log(response.data);
			//2. cline side(react side) confirmation using STRIPE
			const clientServer = response.data?.clientServer;
			const { paymentIntent } = await stripe.confirmCardPayment(clientServer, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});
			console.log(paymentIntent);

			//3. after confirmation ----> order fire store database save, clear basket
			await db
				.collection("users")
				.doc(user.uid)
				.collection("orders")
				.doc(paymentIntent.id)
				.set({
					basket: basket,
					amount: paymentIntent.amount,
					created: paymentIntent.created,
				});
// empty the basket after payment
dispatch({type:Type.EMPTY_BASKET});

			setProcessing(false);
			navigate("/orders", {
				state: { msg: "Thank you. your order has been placed." },
			});
		} catch (error) {
			console.log(error);
			setProcessing(false);
		}
	};

	return (
		<>
			<div className={classes.payment_header}>
				<div className={classes.logo}>
					<Link to="/">
						<img src={logo} alt="Amazon Logo" />
					</Link>
				</div>
				<h3>Checkout ({totalItem} items)</h3>
				<Link to="/">
					<img src={keyLogo} alt="Secure" />
				</Link>
			</div>
			<section className={classes.payment}>
				<div className={classes.flex}>
					<h3>Shipping address</h3>
					<div>
						<div>{user?.email}</div>
						<div>123 React Lane</div>
						<div>Silver Spring, MD 20910</div>
					</div>
				</div>
				<hr />
				<div className={classes.flex}>
					<h3>Review items and delivery</h3>
					<div>
						{basket?.map((item) => (
							<ProductCard key={item.id} product={item} flex={true} />
						))}
					</div>
				</div>
				<hr />
				<div className={classes.flex}>
					<h3>Payment method</h3>
					<div className={classes.payment_card_container}>
						<div className={classes.payment_detail}>
							<form onSubmit={handlePayment}>
								{/* error */}
								{cardError && (
									<small className={classes.errMsg}>{cardError}</small>
								)}
								{/* card */}
								<CardElement onChange={handleChange} />
								{/* total price */}
								<div className={classes.payment_price}>
									<div>
										<span>
											<p>Total Order</p> <hr />
											<CurrencyFormat amount={total} />
										</span>
									</div>
									<button type="submit">
										{processing ? (
											<div className={classes.loading}>
												<ClipLoader color="gray" size={12} />
												<p>please wait ...</p>
											</div>
										) : (
											"Place your order"
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Payment;
