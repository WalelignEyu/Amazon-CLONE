import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endpoint";
import ProductCard from "../../components/Products/ProductCard";
import Loader from "../../components/Loader/Loader";

function Results() {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false); // Reintroduce isLoading state
	const { catagoryName } = useParams();

	useEffect(() => {
		setIsLoading(true); // Set loading state to true at the beginning of the request
		axios
			.get(`${productUrl}/products/category/${catagoryName}`)
			.then((res) => {
				setResults(res.data);
				console.log(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching products:", err);
				setResults([]);
				setIsLoading(false);
			});

	}, [catagoryName]);

	return (
		<LayOut>
			<section>
				<h1 style={{ padding: "30px" }}>Results</h1>
				<p style={{ padding: "30px" }}>category/{catagoryName}</p>
				<hr />
				{isLoading ? ( // Show Loader component when isLoading is true
					<Loader />
				) : (
					<div className={classes.product_container}>
						{results.length > 0 ? (
							results?.map((product) => (
								<ProductCard
									key={product.id}
									renderDesc={false}
									renderAdd={true}
									product={product}
								/>
							))
						) : (
							<p>No products found</p>
						)}
					</div>
				)}
			</section>
		</LayOut>
	);
}

export default Results;
