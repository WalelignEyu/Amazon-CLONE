import React from "react";
import FooterItem from './FooterItems'
import classes from './Footer.module.css'
import { Link } from "react-router-dom";
const LastFooter = ({ items }) => (
	<>
		<footer className={classes.LastFooter}>
			{items.map((item, index) => (
				<FooterItem
					key={index}
					title={item.title}
					description={item.description}
					url={item.url}
				/>
			))}
		</footer>
		<div className={classes.Inc}>
			<div className={classes.conditions}>
				<Link to={"#"}>Conditions of Use</Link>
				<Link to={"#"}>Privacy Notice</Link>
				<Link to={"#"}>Consumer Health Data Privacy Disclosure</Link>
				<Link to={"#"}>Your Ads Privacy Choices</Link>
			</div>
			<span className={classes.copy_right}>
				&copy; 1996-2024, Amazon.com, Inc. or its affiliates
			</span>
		</div>
	</>
);

export default LastFooter;
