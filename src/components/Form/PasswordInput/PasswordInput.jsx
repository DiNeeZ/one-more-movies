import { useState } from 'react'
// import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import FormInput from '../FormInput/FormInput'
import './password-input.scss'

const PasswordInput = ({ name, password, handleChange, error }) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	const togglePasswordVisibility = () =>
		setIsPasswordVisible(!isPasswordVisible)

	const label = name.split(/(?=[A-Z])/)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

	return (
		<div className='password-input'>
			<FormInput
				label={label}
				value={password}
				type={isPasswordVisible ? 'text' : 'password'}
				name={name}
				onChange={handleChange}
				error={error}
			/>

			<button
				className='password-input__toggle-password toggle-password'
				type='button'
				onClick={togglePasswordVisibility}
				disabled={!password.length}
				tabIndex={-1}
			>
				{
					!isPasswordVisible ?
						<AiOutlineEye className='toggle-password__icon' /> :
						<AiOutlineEyeInvisible className='toggle-password__icon' />
				}
			</button>
		</div>
	)
}

export default PasswordInput