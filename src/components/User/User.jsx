import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { AiOutlineLogin, AiFillEdit } from 'react-icons/ai'
import './user.scss'

const User = () => {
	const [open, setOpen] = useState(false)
	let menuRef = useRef()
	const navigate = useNavigate()

	useEffect(() => {
		let handler = (e) => {
			if (!menuRef.current.contains(e.target)) setOpen(false)
		}

		document.addEventListener('mousedown', handler)

		return () => document.removeEventListener('mousedown', handler)
	})

	const handleClick = (e) => {
		if (e.target.textContent === 'Register') {
			navigate('/auth/register')
		} else {
			navigate('/auth/login')
		}

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
			if (e.target.textContent === 'Register') {
				navigate('/auth/register')
			} else {
				navigate('/auth/login')
			}

			setOpen(false)
		}
	}

	return (
		<div
			className='user'
			ref={menuRef}
		>
			<FaUserAlt
				className='user__icon'
				tabIndex={0}
				onClick={() => setOpen(!open)}
				onKeyDown={handleSpacebarClick}
			/>
			{
				open && (
					<ul
						className='user__menu'
					>
						<li
							className='user__menu-item menu-item'
							tabIndex={0}
							onClick={handleClick}
							onKeyDown={handleEnterClick}
						>
							<AiOutlineLogin className='menu-item__icon' />
							<span className='menu-item__text'>Login</span> 
						</li>

						<li
							className='user__menu-item menu-item'
							tabIndex={0}
							onClick={handleClick}
							onKeyDown={handleEnterClick}
						>
							<AiFillEdit className='menu-item__icon' />
							<span className='menu-item__text'>Register</span> 
						</li>
					</ul>
				)
			}

		</div >
	)
}

export default User