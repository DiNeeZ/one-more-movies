import React from 'react'
import './form-input.scss'

const FormInput = ({ label, error, ...otherProps }) => (
	<div className={`form-input ${otherProps.value.length ? 'shrink' : ''}`}>

		<label className='form-input__label'>
			{label}
		</label>

		<input
			className='form-input__input'
			{...otherProps} />

		{
			(error && error.length) && <span className='form-input__error'>{error}</span>
		}

	</div>
)

export default FormInput