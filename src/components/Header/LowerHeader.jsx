import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import classes from "./Header.module.css";

function LowerHeader() {
  return (
		<div className={classes.lower_container}>
			<ul>
				<li>
					<GiHamburgerMenu />
					<p>All</p>
				</li>
				<li>
					Medical Care <IoMdArrowDropdown />
				</li>
				<li>
					Groceries <IoMdArrowDropdown />
				</li>
				<li>Best Seller</li>
				<li>Amazon Basics</li>
				<li>Music</li>
				<li>New Releases</li>
				<li>
					Prime <IoMdArrowDropdown />
				</li>
			</ul>
		</div>
	);
}

export default LowerHeader
