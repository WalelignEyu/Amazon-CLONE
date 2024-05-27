import React from "react";
import classes from './Footer.module.css'

function MainFooter({ sections }) {
	return (
		<footer className={classes.footer_container}>
			{sections.map((section, index) => (
				<div key={index} className={classes.inner_section}>
					<h3>{section.title}</h3>
					<ul>
						{section.links.map((link, linkIndex) => (
							<li key={linkIndex}>
								<a href={link.url}>{link.text}</a>
							</li>
						))}
					</ul>
				</div>
			))}
		</footer>
	);
}

export default MainFooter;
