import React from 'react'
import { useLocation } from 'react-router-dom'
import { useMedia } from '../../hooks'
import LoginForm from '../../components/Form/LoginForm/LoginForm'
import RegisterForm from '../../components/Form/RegisterForm/RegisterForm'
import FormButton from '../../components/Form/FormButton/FormButton'
import authBg from '../../images/auth-bg.png'
import './auth.scss'

const Authentication = () => {
	const media = useMedia()
	const { pathname } = useLocation()
	const authType = pathname.split('/').slice(-1)[0]

	return (
		<section className='auth'>
			<div
				className='container auth__container'
				style={{
					backgroundImage: `url(${media === 'desktop' ? authBg : ''})`
				}}>
				<div className='auth__form'>
					<h1 className='authentication__title'>{authType.toLocaleUpperCase()}</h1>
					<FormButton type='google' />
					{authType === 'register' ? <RegisterForm /> : <LoginForm />}
				</div>
			</div>
		</section>
	)
}

export default Authentication