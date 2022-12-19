import { useState } from 'react'
import FormInput from './FormInput/FormInput'
import FormButton from './FormButton/FormButton'
import './form.scss'

const defaultFormFields = {
	email: '',
	password: ''
}

const Form = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { email, password } = formFields

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormFields({
			...formFields,
			[name]: value
		})
	}

	return (
		<form className='form'>
			
			<FormInput
				label='Email'
				value={email}
				type='email'
				name='email'
				onChange={handleChange}
				required
			/>

			<FormInput
				label='Password'
				value={password}
				type='password'
				name='password'
				onChange={handleChange}
				required
			/>

			<FormButton title='Sign In' />

		</form>
	)
}

export default Form