import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { db } from "../../Utility/Firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Products/ProductCard";

function Orders() {
	const [{ user }, dispatch] = useContext(DataContext);
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user.uid)
				.collection("orders")
				.orderBy("created", "desc")
				.onSnapshot((Snapshot) => {
					console.log(Snapshot);
					setOrders(
						Snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					);
				});
		} else {
			setOrders([]);
		}
	}, []);

	return (
		<LayOut>
			<section className={classes.order_container}>
				<div className={classes.orders}>
					{orders.length > 0 ? (
						<div className={classes.thanks}>
							<h1>Thank You, Your Order has been placed.</h1>
						</div>
					) : (
						<h1 className={classes.thanks}>Your Orders</h1>
					)}
					<div style={{ padding: "20px", fontWeight: "700" }}>
						{orders?.length === 0 && <div>You have not placed any orders.</div>}
					</div>
					{/* orders */}
					<div>
						{orders?.map((eachOrder) => {
							return (
								<div key={eachOrder.id}>
									<hr />
									<p>Order ID: {eachOrder.id}</p>
									{eachOrder?.data?.basket?.map((order) => {
										return (
											<ProductCard flex={true} product={order} key={order.id} />
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</LayOut>
	);
}

export default Orders;
