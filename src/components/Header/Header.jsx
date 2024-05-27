// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import classes from "./Header.module.css";
// import { SlLocationPin } from "react-icons/sl";
// import { BsSearch } from "react-icons/bs";
// import { BiCart } from "react-icons/bi";
// import { FaMicrophone } from "react-icons/fa";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { HiOutlineViewfinderCircle } from "react-icons/hi2";
// import LowerHeader from "./LowerHeader";
// import { DataContext } from "../DataProvider/DataProvider";
// import { auth } from "../../Utility/Firebase";

// function Header() {
// 	const [{ user, basket }, dispatch] = useContext(DataContext);
// 	// console.log(basket.length);
// 	const totalItem = basket?.reduce((amount, item) => {
// 		return item.amount + amount;
// 	}, 0);
// 	return (
// 		<section className={classes.fixed}>
// 			<section>
// 				<div className={classes.header_container}>
// 					{/* {LOGO} */}
// 					<div className={classes.logo_container}>
// 						<Link to="/">
// 							<img
// 								src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
// 								alt="amazon logo"
// 							/>
// 						</Link>
// 					</div>
// 					{/* {DELIVERY} */}
// 					<div className={classes.delivery}>
// 						<span>
// 							<SlLocationPin />
// 						</span>

// 						<div>
// 							<p>Delivering to...</p>
// 							<span>Maryland</span>
// 						</div>
// 					</div>

// 					{/* {SEARCH} */}
// 					<div className={classes.search}>
// 						<select name="" id="">
// 							<option value="">
// 								All <IoMdArrowDropdown />
// 							</option>
// 						</select>
// 						<input type="text" name="" id="" placeholder="Search Amazon" />
// 						<div className={classes.camera}>
// 							<HiOutlineViewfinderCircle size={38} />
// 						</div>
// 						<div className={classes.mic}>
// 							<FaMicrophone size={38} />
// 						</div>

// 						<BsSearch size={38} />
// 					</div>
// 					<div className={classes.order_container}>
// 						{/* LANGUAGE */}
// 						<Link to="#" className={classes.language}>
// 							<img
// 								src="https://www.iconarchive.com/download/i109373/wikipedia/flags/US-United-States-Flag.1024.png"
// 								alt=""
// 							/>
// 							<select>
// 								<option value="">
// 									EN
// 									<IoMdArrowDropdown />
// 								</option>
// 							</select>
// 						</Link>
// 						{/* THREE COMPONENTS */}
// 						<Link to={!user && "/auth"}>
// 							<div>
// 								{user ? (
// 									<>
// 										<p>Hello {user?.email?.split("@")[0]} </p>
// 										<span onClick={() => auth.signOut}>
// 											Sign Out
// 											<IoMdArrowDropdown />
// 										</span>
// 									</>
// 								) : (
// 									<>
// 										<p> Hello, sign in</p>
// 										<span>
// 											Account & Lists <IoMdArrowDropdown />
// 										</span>
// 									</>
// 								)}
// 							</div>
// 						</Link>
// 						{/* ORDER */}
// 						<Link to="/orders">
// 							<p>Returns</p>
// 							<span>& Orders</span>
// 						</Link>
// 						{/* CART */}
// 						<Link to="/cart" className={classes.cart}>
// 							<BiCart size={35} />
// 							<span>{totalItem}</span>
// 						</Link>
// 					</div>
// 				</div>
// 				<LowerHeader />
// 			</section>
// 		</section>
// 	);
// }

// export default Header;


import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { FaMicrophone } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/Firebase";
import { Type } from "../../Utility/Action.type.js";

function Header() {
	const [{ user, basket }, dispatch] = useContext(DataContext);
	const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

	const signOutUser = () => {
		auth
			.signOut()
			.then(() => {
				dispatch({
					type: Type.SET_USER,
					user: null,
				});
			})
			.catch((error) => {
				console.error("Sign out error:", error);
			});
	};

	return (
		<section className={classes.fixed}>
			<section>
				<div className={classes.header_container}>
					{/* LOGO */}
					<div className={classes.logo_container}>
						<Link to="/">
							<img
								src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
								alt="amazon logo"
							/>
						</Link>
					</div>
					{/* DELIVERY */}
					<div className={classes.delivery}>
						<span>
							<SlLocationPin />
						</span>
						<div>
							<p>Delivering to...</p>
							<span>Maryland</span>
						</div>
					</div>
					{/* SEARCH */}
					<div className={classes.search}>
						<select>
							<option value="">
								All <IoMdArrowDropdown />
							</option>
						</select>
						<input type="text" placeholder="Search Amazon" />
						<div className={classes.camera}>
							<HiOutlineViewfinderCircle size={38} />
						</div>
						<div className={classes.mic}>
							<FaMicrophone size={38} />
						</div>
						<BsSearch size={38} />
					</div>
					{/* ACCOUNT, ORDERS, CART */}
					<div className={classes.order_container}>
						<Link to="#" className={classes.language}>
							<img
								src="https://www.iconarchive.com/download/i109373/wikipedia/flags/US-United-States-Flag.1024.png"
								alt="US Flag"
							/>
							<select>
								<option value="">
									EN
									<IoMdArrowDropdown />
								</option>
							</select>
						</Link>
						<Link to={!user && "/auth"}>
							<div>
								{user ? (
									<>
										<p>Hello {user.email.split("@")[0]}</p>
										<span onClick={signOutUser}>
											Sign Out
											<IoMdArrowDropdown />
										</span>
									</>
								) : (
									<>
										<p>Hello, sign in</p>
										<span>
											Account & Lists
											<IoMdArrowDropdown />
										</span>
									</>
								)}
							</div>
						</Link>
						<Link to="/orders">
							<p>Returns</p>
							<span>& Orders</span>
						</Link>
						<Link to="/cart" className={classes.cart}>
							<BiCart size={35} />
							<span>{totalItem}</span>
						</Link>
					</div>
				</div>
				<LowerHeader />
			</section>
		</section>
	);
}

export default Header;
