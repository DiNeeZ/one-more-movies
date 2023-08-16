import GoogleButton from '../../GoogleButton/GoogleButton'
import LoginWithEmailAndPassword from './LoginWithEmailAndPassword/LoginWithEmailAndPassword'
import './login-form.scss'

const LoginForm = () => {

	const handleGoogleSignIn = () => { console.log('Sign in with Google') }

	return (
		<div className='login-form'>
			<h1 className='login-form__title'>Login</h1>
			<GoogleButton handleClick={handleGoogleSignIn}>
				Continue with Google
			</GoogleButton>
			<div className='login-form__divider'>or</div>
			<LoginWithEmailAndPassword />
		</div>
	)

}

export default LoginForm