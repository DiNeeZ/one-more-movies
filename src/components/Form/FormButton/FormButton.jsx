import React from 'react'

import { BsGoogle } from 'react-icons/bs'
import './form-button.scss'

const FormButton = ({ title, type }) => {
	return (
		<button
			type={type === 'google' ? 'button' : 'submit'}
			className={`form-button ${type === 'google' && 'google'}`}>
			{type === 'google' && <BsGoogle className='form-button__icon' />}
			{title}
		</button>
	)
}

export default FormButton