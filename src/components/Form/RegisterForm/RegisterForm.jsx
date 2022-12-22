import { Link } from 'react-router-dom'

import GoogleButton from '../../GoogleButton/GoogleButton'
import RegisterWithEmailAndPassword from './RegisterWithEmailAndPassword/RegisterWithEmailAndPassword'
import './register-form.scss'


const RegisterForm = () => {

	const handleGoogleRegister = () => { console.log('Register with Google') }


	return (
		<div className='register-container'>
			<h1 className='register-container__title'>Register</h1>
			<span className='register-container__tip'>
				Already have an account?
				<Link
					className='register-container__tip-link'
					to='/auth/login'>
					Log in
				</Link>
			</span>
			<GoogleButton handleClick={handleGoogleRegister}>
				Sign up with Google
			</GoogleButton>
			<div className='register-container__divider'>or</div>
			<RegisterWithEmailAndPassword />
		</div>
	)
}

export default RegisterForm