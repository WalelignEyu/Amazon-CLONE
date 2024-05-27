import React, { useContext } from "react";
import classes from "./Cart.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Products/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Type } from "../../Utility/Action.type";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function Cart() {
	const [{ basket, user }, dispatch] = useContext(DataContext);
	const total = basket.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);

	const increment = (item) => {
		dispatch({
			type: Type.ADD_TO_BASKET,
			item,
		});
	};

	const decrement = (id) => {
		dispatch({
			type: Type.REMOVE_FROM_BASKET,
			id,
		});
	};

	return (
		<LayOut>
			<section className={classes.container}>
				<div className={classes.cart_container}>
					<h3>Shopping Cart</h3>
					<hr />
					{basket?.length == 0 ? (
						<h2>Your Amazon Cart is empty.</h2>
					) : (
						basket?.map((item, i) => {
							return (
								<section className={classes.cart_product}>
									<ProductCard
										key={i}
										product={item}
										renderDesc={true}
										renderAdd={false}
										flex={true}
									/>
									<div className={classes.btn_container}>
										<Button
											className={classes.btn}
											onClick={() => increment(item)}
										>
											<IoIosArrowUp size={20} />
										</Button>
										<span>{item.amount}</span>
										<Button
											className={classes.btn}
											onClick={() => decrement(item.id)}
										>
											<IoIosArrowDown size={20} />
										</Button>
									</div>
								</section>
							);
						})
					)}
				</div>
				{basket?.length !== 0 && (
					<div className={classes.subtotal}>
						<div>
							<p>Subtotal({basket?.length} items):</p>
							<CurrencyFormat amount={total} />
						</div>
						<span>
							<input type="checkbox" />
							<small>This order contains a gift</small>
						</span>
						<Link to="/payment">Proceed to checkout</Link>
					</div>
				)}
			</section>
		</LayOut>
	);
}

export default Cart;
