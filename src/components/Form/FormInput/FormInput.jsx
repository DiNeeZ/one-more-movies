import React from 'react'
import './form-input.scss'

const FormInput = ({ label, ...otherProps }) => {
	return (
		<div
			className={`form-input ${otherProps.value.length ? 'shrink' : ''}`}>
			<label className='form-input__label'>
				{label}
			</label>
			<input
				className='form-input__input'
				{...otherProps} />
		</div>
	)
}

export default FormInput