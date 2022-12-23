import { useState, useEffect, useRef } from 'react'
import './authorized.scss'

const Authorized = ({ user }) => {
	const [open, setOpen] = useState(false)
	let menuRef = useRef()

	useEffect(() => {
		let handler = (e) => {
			if (!menuRef.current.contains(e.target)) setOpen(false)
		}

		document.addEventListener('mousedown', handler)

		return () => document.removeEventListener('mousedown', handler)
	})

	const logOut = () => {
		console.log('log out')
		setOpen(false)
	}

	const handleEnterClick = (e) => {
		if (e.key === 'Enter') {
			logOut()
		}
	}

	return (
		<div className='authorized'>
			<span
				className='authorized__avatar'
				ref={menuRef}
				onClick={() => setOpen(!open)}
			>
				{user.displayName.charAt(0).toUpperCase()}
				{
					open && (
						<ul
							className='authorized__menu authorized-menu'
						>
							<li
								className='authorized-menu__item'
								tabIndex={0}
								onClick={logOut}
								onKeyDown={handleEnterClick}
							>
								<span className='authorized-menu__item-text'>Log Out</span>
							</li>
						</ul>
					)
				}
			</span>
			<span className='authorized__greet'>Hello, {user.displayName}!</span>
		</div>
	)
}

export default Authorized