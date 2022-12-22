import React from 'react'


import './form-button.scss'

const FormButton = ({ children }) => {
	return (
		<button type='submit' className='form-button'>
			{children}
		</button>
	)
}

export default FormButton