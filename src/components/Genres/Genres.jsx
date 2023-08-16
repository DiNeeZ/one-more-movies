import './genres.scss'

const Genres = ({ genres }) => {
  return (
    <p className='genres'>
      {
        genres.map(genre => <span key={genre.id}>{genre.name}</span>)
      }
    </p>
  )
}

export default Genres