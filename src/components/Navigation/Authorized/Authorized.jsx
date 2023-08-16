import { useState, useEffect, useRef } from 'react'
import { signOutUser } from '../../../utils/firebase'
import './authorized.scss'

const Authorized = ({ currentUser }) => {
	const [open, setOpen] = useState(false)
	let menuRef = useRef()

	useEffect(() => {
		let handler = (e) => {
			if (!menuRef.current.contains(e.target)) setOpen(false)
		}

		document.addEventListener('mousedown', handler)

		return () => document.removeEventListener('mousedown', handler)
	})

	const logOut = async () => {
		 await signOutUser()
		setOpen(false)
	}

	const handleSpacebarClick = (e) => {
		if (e.key === ' ') {
			e.preventDefault()
			setOpen(!open)
		}
	}

	const handleEnterClick = (e) => {
		if (e.key === 'Enter') {
			logOut()
		}
	}

	return (
		<div className='authorized'>
			<span
				tabIndex={0}
				className='authorized__avatar'
				ref={menuRef}
				onClick={() => setOpen(!open)}
				onKeyDown={handleSpacebarClick}
			>
				{/* {user.displayName?.charAt(0).toUpperCase()} */}
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
			{/* <span className='authorized__greet'>Hello, {user?.displayName}!</span> */}
		</div>
	)
}

export default Authorized