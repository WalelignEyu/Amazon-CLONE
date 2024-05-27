import React from "react";
import classes from "./Footer.module.css";

const FooterItem = ({ title, description, url }) => (
		<div className={classes.footer_item}>
			<a href={url}>
				<span className={classes.description}>
					<p>{title}</p>
					<small>{description}</small>
				</span>
			</a>
		</div>
	
);

export default FooterItem;

// import React from "react";
// import classes from "./Footer.module.css";

// const FooterItem = ({ title, description, url }) => {
// 	const descriptionWords = description.split("  "); // Split description into words
// 	return (
// 		<div className={classes.footer_item}>
// 			<a href={url}>
// 				<h4>{title}</h4>
// 				<div className={classes.description}>
// 					{descriptionWords.map((word, index) => (
// 						<span key={index}>{word}</span>
// 					))}
// 				</div>
// 			</a>
// 		</div>
// 	);
// };

// export default FooterItem;

