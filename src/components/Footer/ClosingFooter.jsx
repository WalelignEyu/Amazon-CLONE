import React from "react";
import { IoIosGlobe } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiExpandUpDownFill } from "react-icons/ri";
import classes from "./Footer.module.css";

function ClosingFooter() {
	return (
		<div className={classes.main}>
			<div className={classes.logo}>
				<img
					src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
					alt="amazon-logo"
				/>
			</div>
			<div className={classes.usa}>
				<Link to="#">
					<IoIosGlobe /> English <RiExpandUpDownFill />
				</Link>
				<Link to="#">
					<img
						src="https://www.iconarchive.com/download/i109373/wikipedia/flags/US-United-States-Flag.1024.png"
						alt="US Flag"
					/>{" "}
					United States
				</Link>
			</div>
		</div>
	);
}

export default ClosingFooter;
