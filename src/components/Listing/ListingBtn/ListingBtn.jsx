import React from 'react'
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'

import './listing-btn.scss'

const ListingBtn = ({ handleClick, isOpen }) => {
	return (
		<button
			className={`listing-btn listing-btn--${isOpen ? 'opened' : 'closed'}`}
			onClick={handleClick}>
			<div className='listing-btn__inner'>
				{!isOpen ? 'See more' : 'See less'}
				{!isOpen ?
					<BsChevronCompactDown className='listing-btn__icon listing-btn__icon--down' />
					:
					<BsChevronCompactUp className='listing-btn__icon listing-btn__icon--up' />}
			</div>
		</button>
	)
}

export default ListingBtn