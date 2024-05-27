import React from "react";
import classes from "./Footer.module.css";

function BackFooter() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0 });
	};

	return (
		<div className={classes.back_container}>
			<span onClick={scrollToTop} style={{ cursor: "pointer" }}>
				Back to top
			</span>
		</div>
	);
}

export default BackFooter;
