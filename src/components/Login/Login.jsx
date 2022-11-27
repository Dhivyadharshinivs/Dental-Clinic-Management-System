import React from 'react';
import { emailValidator, passwordValidator } from './regexValidator';
import {useNavigate} from "react-router-dom"

const Login = () => {
	const history = useNavigate()

	const [input, setInput] = React.useState({ email: '', password: '' });

	const [errorMessage, seterrorMessage] = React.useState('');
	const [successMessage, setsuccessMessage] = React.useState('');

	const handleChange = e => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	// React.useEffect(()=>{
	// 	if(localStorage.getItem('auth')) history('/main')
	// })

	const formSubmitter = e => {
		e.preventDefault();
		setsuccessMessage('');
		if (!emailValidator(input.email)) return seterrorMessage('Please enter valid email id');

		if (!passwordValidator(input.password))
			return seterrorMessage(
				'Password should have minimum 8 character with the combination of uppercase, lowercase, numbers and specialcharaters'
			);
		// setsuccessMessage('Successfully Validated');
		if(input.email !== 'admin@gmail.com' || input.password !== 'Admin@123') return seterrorMessage('Invalid email or password');

		history('/main')
		localStorage.setItem('auth', true)

	};

	return (
		<div>
			<div className="limiter">
				<div className="container-login100" style={{ backgroundImage: 'url("images/bg-01.jpg")' }}>
					<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
						<form className="login100-form validate-form" onSubmit={formSubmitter}>
							<center><h1>Shre Manikkam Dental Clinic</h1><br></br>
							<h2><span className="login100-form-title p-b-49">Admin Login</span></h2>
							{errorMessage.length > 0 && <div style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</div>}
							{successMessage.length > 0 && (
								<div style={{ marginBottom: '10px', color: 'green' }}>{successMessage}</div>
							)}
							<br></br>
							<div className="wrap-input100 validate-input m-b-23" data-validate="email is required">
								<span className="label-input100">Email</span>
								<input
									className="input100"
									type="text"
									name="email"
									placeholder="Type your username"
									onChange={handleChange}
								/>
								<span className="focus-input100" data-symbol="" />
							</div>
							<div className="wrap-input100 validate-input" data-validate="Password is required">
								<span className="label-input100">Password</span>
								<input
									className="input100"
									type="password"
									name="password"
									placeholder="Type your password"
									onChange={handleChange}
								/>
								<span className="focus-input100" data-symbol="" />
							</div>
							<br></br>
							<br></br>
							<div className="container-login100-form-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn" />
									<button className="login100-form-btn">Login</button>
								</div>
							</div>
							</center>

							
							
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;