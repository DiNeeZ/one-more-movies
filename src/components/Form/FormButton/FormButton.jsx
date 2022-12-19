import React from 'react'
import './form-button.scss'

const FormButton = ({ title }) => {
	return (
		<button type='submit' className='form-button'>
			{title}
		</button>
	)
}

export default FormButton