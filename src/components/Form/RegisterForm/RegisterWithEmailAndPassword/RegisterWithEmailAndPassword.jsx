import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import FormWrapper from '../../FormWrapper/FormWrapper'
import FormInput from '../../FormInput/FormInput'
import PasswordInput from '../../PasswordInput/PasswordInput'
import FormButton from '../../FormButton/FormButton'
import { registerValidate } from '../../../../utils'
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth
} from '../../../../utils/firebase'

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
		const register = async () => {

			// Check if no validation errors
			if (Object.keys(errors).length === 0 && isSubmitting) {
				try {

					// Creating user by email and password
					const { user } = await createAuthUserWithEmailAndPassword(email, password)
					await createUserDocumentFromAuth(user, { displayName })
					// If registration has been succesfull, then redirect to home page
					navigate('/')
				} catch (error) {
					if (error.code === 'auth/email-already-in-use') {
						setErrors({
							...errors,
							email: `User with this email is already exist`
						})
					}
					console.log('error creating a user', error.message)
				}

			}
		}

		register()
	}, [errors, isSubmitting, navigate, email, password, formFields, displayName])

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