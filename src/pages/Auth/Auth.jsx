import React from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import {auth} from '../../Utility/Firebase'
import { useState, useContext } from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import {DataContext} from '../../components/DataProvider/DataProvider'
import { Type } from "../../Utility/Action.type";
import { GrAlert } from "react-icons/gr";
import {ClipLoader} from 'react-spinners'


function Auth() {
const [email,setEmail] = useState("")
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const[loading, setLoading] = useState({
	signIn:false,
	signUp:false
})

const [{user}, dispatch] = useContext(DataContext);
const navigate = useNavigate()
const navStateData = useLocation()
console.log(navStateData)

// console.log(user)
// console.log(email, password);
const authHandler = async(e)=>{
e.preventDefault()
console.log(e.target.name)
if(e.target.name == "signin"){
	setLoading({...loading, signIn:true})
signInWithEmailAndPassword(auth, email, password).then((userInfo)=>{
dispatch({
	type:Type.SET_USER,
	user:userInfo.user
});
setLoading({ ...loading, signIn:false });
navigate(navStateData?.state?.redirect || "/")
}).catch((err)=>{
setError(err.message);
setLoading({ ...loading, signIn: false });

})
}else{
	setLoading({ ...loading, signUp:true });
createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{
	
dispatch({
	type: Type.SET_USER,
	user: userInfo.user,
});
setLoading({ ...loading, signUp:false });
navigate(navStateData?.state?.redirect || "/");
}).catch((err)=>{
	setError(err.message);
	setLoading({ ...loading, signUp: false });

})
}


};

	return (
		<>
			<section className={classes.login}>
				{/* logo */}
				<Link to={"/"}>
					<img
						src="https://amazon-blogs-brightspot-lower.s3.amazonaws.com/about/00/92/0260aab44ee8a2faeafde18ee1da/amazon-logo-inverse.svg"
						alt=""
					/>
				</Link>
				{/* log in form */}

				{error && (
					<small>
						{" "}
						<GrAlert size={15} /> {error}
					</small>
				)}
				<div className={classes.login_container}>
					<h1>Sign In</h1>
					{navStateData?.state?.msg && (
						<p className={classes.smallmsg}>{navStateData?.state?.msg}</p>
					)}

					<form action="">
						<div>
							<label htmlFor="email">Email</label>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								id="email"
							/>
						</div>

						<div>
							<label htmlFor="password">Password</label>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								id="password"
							/>
						</div>
						<button
							type="submit"
							onClick={authHandler}
							name="signin"
							className={classes.login_signInButton}
						>
							{loading.signIn ? (
								<ClipLoader color="#000" size={15}></ClipLoader>
							) : (
								"Sign in"
							)}
						</button>
					</form>
					{/* agreement */}

					<p>
						By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
						Sale. Please see our Privacy Notice, our Cookies Notice and our
						Interest-Based Ads Notice.
					</p>
					{/* sign up */}
					<div className={classes.New}>
						<IoMdArrowDropright />
						<h5> Need help?</h5>
					</div>
				</div>

				<div>
					<div className={classes.NewAmazon}>
						<h5>New to Amazon?</h5>
					</div>
					<button
						type="submit"
						onClick={authHandler}
						name="signup"
						className={classes.login_registerButton}
					>
						{loading.signUp ? (
							<ClipLoader color="#000" size={15}></ClipLoader>
						) : (
							"Create your Amazon account"
						)}
					</button>
				</div>
				<div className={classes.Inc}>
					<span>© 1996-2024, Amazon.com, Inc. or its affiliates</span>
				</div>
			</section>
		</>
	);
}

export default Auth;
