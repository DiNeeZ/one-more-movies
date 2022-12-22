import React from 'react'
import './form-wrapper.scss'

const FormWrapper = ({ handleSubmit, children }) => {

	return (
		<form
			className='form-wrapper'
			onSubmit={handleSubmit}
			noValidate={true}
		>
			{children}
		</form>
	)
}

export default FormWrapper