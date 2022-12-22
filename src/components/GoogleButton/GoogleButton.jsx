import React from 'react'
import { ReactComponent as Gicon } from '../../images/google-icon.svg'
import './google-button.scss'

const GoogleButton = ({ children, handleClick }) => {
	return (
		<button
			className='google-button'
			type='text'
			onClick={handleClick}>
			<Gicon className='google-button__icon' />
			<span className='google-button__text'>{children}</span>
		</button>
	)
}

export default GoogleButton