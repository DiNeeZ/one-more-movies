import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import FormInput from '../FormInput/FormInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import FormButton from '../FormButton/FormButton'
import { registerValidate } from '../../../utils'
import './register-form.scss'

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
}

const RegisterForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const [errors, setErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const navigate = useNavigate()
	const { displayName, email, password, confirmPassword } = formFields

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			navigate('/')
		}
	}, [errors, isSubmitting, navigate])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormFields({
			...formFields,
			[name]: value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setErrors(registerValidate(formFields))
		setIsSubmitting(true)
	}

	return (
		<form
			className='register-form'
			onSubmit={handleSubmit}
			noValidate={true}
		>

			<FormInput
				label='Name'
				value={displayName}
				type='text'
				name='displayName'
				onChange={handleChange}
				error={errors.displayName}
			/>

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

			<PasswordInput
				name='confirmPassword'
				password={confirmPassword}
				handleChange={handleChange}
				error={errors.confirmPassword}
			/>

			<FormButton title='Register' />

		</form>
	)
}

export default RegisterForm