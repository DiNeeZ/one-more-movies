import React from 'react'
import Form from '../../components/Form/Form'

import './authentication.scss'

const Authentication = () => {
	return (
		<section
			className='authentication'
			style={{ minHeight: 'calc(100vh - 4.3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
			<div
				className='container authentication__container'
				style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
				<h1 className='authentication__title'>Authentication</h1>
				<Form />
			</div>
		</section>
	)
}

export default Authentication