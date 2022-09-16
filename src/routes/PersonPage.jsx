import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPerson, setPersonStatus, getStatus, getErrorMsg } from '../features/persons/personSlice'
import Person from '../components/Person/Person'
import ErrorIndicator from '../components/ErrorIndicator/ErrorIndicator'
import PageLoading from '../components/PageLoading/PageLoading'

const PersonPage = () => {
  const { personId } = useParams()
  const disapatch = useDispatch()
  const status = useSelector(getStatus)
  const errorMsg = useSelector(getErrorMsg)

  useEffect(() => {
    if (status === 'idle') {
      disapatch(fetchPerson(personId))
    }
    return () => disapatch(setPersonStatus('idle'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disapatch, personId])

  if (status === 'loading') return <PageLoading />
  if (status === 'error') return <ErrorIndicator errorMsg={errorMsg} />
  if (status === 'success') return <Person />
   

}
export default PersonPage