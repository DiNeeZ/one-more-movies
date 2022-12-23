import { useState, useEffect } from 'react'
import Unauthorized from './Unauthorized/Unauthorized'
import Authorized from './Authorized/Authorized'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { getUserFromFirestore } from '../../utils/firebase'

import './navigation.scss'

const Navigation = () => {
	const { currentUser } = useSelector(selectUser)
	const [user, setUser] = useState(null)

	useEffect(() => {
		const getUser = async (uid) => {
			const data = await getUserFromFirestore(uid)
			setUser(data)
		}

		if (currentUser) getUser(currentUser.uid)
	}, [currentUser])


	return (
		<nav
			className='navigation'>
			{
				user ?
					<Authorized user={user} /> :
					<Unauthorized />
			}
		</nav>
	)
}

export default Navigation