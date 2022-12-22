import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import FormInput from '../../FormInput/FormInput'
import PasswordInput from '../../PasswordInput/PasswordInput'
import FormButton from '../../FormButton/FormButton'
import { loginValidate } from '../../../../utils'

import './login-with-email.scss'

const defaultFormFields = {
	email: '',
	password: ''
}

const LoginWithEmailAndPassword = () => {

	const [formFields, setFormFields] = useState(defaultFormFields)
	const [errors, setErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const navigate = useNavigate()
	const { email, password } = formFields

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			navigate('/')
		}
	}, [errors, isSubmitting, navigate])

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormFields({
			...formFields,
			[name]: value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setErrors(loginValidate(formFields))
		setIsSubmitting(true)
	}

	return (
		<form className='login-form'
			onSubmit={handleSubmit}
			noValidate={true}
		>

			<FormInput
				label='Email'
				value={email}
				type='email'
				name='email'
				onChange={handleChange}
				error={errors.email}
			/>

			<PasswordInput
				name='password'
				password={password}
				handleChange={handleChange}
				error={errors.password}
			/>

			<FormButton>
				Login
			</FormButton>

		</form>

	)
}

export default LoginWithEmailAndPassword