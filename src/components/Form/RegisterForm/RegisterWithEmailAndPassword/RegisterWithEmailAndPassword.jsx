import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import FormWrapper from '../../FormWrapper/FormWrapper'
import FormInput from '../../FormInput/FormInput'
import PasswordInput from '../../PasswordInput/PasswordInput'
import FormButton from '../../FormButton/FormButton'
import { registerValidate } from '../../../../utils'

import './register-with-email-and-password.scss'

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
}

const RegisterWithEmailAndPassword = () => {
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
		<FormWrapper handleSubmit={handleSubmit}>
			
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

			<FormButton>
				Register
			</FormButton>

		</FormWrapper>
	)
}

export default RegisterWithEmailAndPassword