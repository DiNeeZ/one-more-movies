import React from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '../../components/Form/LoginForm/LoginForm'
import RegisterForm from '../../components/Form/RegisterForm/RegisterForm'
import authBg from '../../images/auth-bg.png'
import './auth.scss'

const Authentication = () => {
	const { pathname } = useLocation()
	const authType = pathname.split('/').slice(-1)[0]

	return (
		<section className='auth'>
			<div className='auth__container container'>
				<img className='auth__bg' src={authBg} alt='authentication background'/>
				{
					authType === 'register' ?
					<RegisterForm /> :
					<LoginForm />
				}
			</div>
		</section>
	)
}

export default Authentication