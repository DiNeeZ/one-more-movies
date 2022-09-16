import { API_KEY, camelizeObjectKeys, getImageUrl, MOVIE_API, getUniqueObjArr } from '../utils'

const extractGenres = (allGenres, genreIds) => allGenres.filter(genre => genreIds?.includes(genre.id))
const getGenres = async () => {
  return await MOVIE_API
    .get(`genre/movie/list?api_key=${API_KEY}&language=en-US`)
}
const getPosterPath = (path) => ({
  image: getImageUrl(342, path),
  preview: getImageUrl(92, path)
})
const getBackdropPath = (path) => ({
  image: getImageUrl(1280, path),
  preview: getImageUrl(300, path),
})

const getProfilePath = (path) => ({
  preview: getImageUrl(45, path),
  image: getImageUrl(185, path)
})

const extractImageId = (str) => str.slice(str.indexOf('/') + 1, str.indexOf('.'))


export const transformPopularPersons = (res) => {
  const transformed = res.results
    .map(obj => {
      obj = camelizeObjectKeys(obj)
      obj.profilePath = getProfilePath(obj.profilePath)
      return obj
    })
  return transformed
}

export const transformTrending = async (res) => {
  const genres = await getGenres()
  const transformed = res.results
    .map(obj => {
      obj = camelizeObjectKeys(obj)
      obj.backdropPath = getBackdropPath(obj.backdropPath)
      obj.posterPath = getPosterPath(obj.posterPath)
      obj.genres = extractGenres(genres.data.genres, obj.genreIds)
      return obj
    })

  return transformed
}

export const transformUpcoming = async (res) => {
  const genres = await getGenres()
  const transformed = res.results.map(obj => {
    obj = camelizeObjectKeys(obj)
    obj.backdropPath = getBackdropPath(obj.backdropPath)
    obj.posterPath = getPosterPath(obj.posterPath)
    obj.genres = extractGenres(genres.data.genres, obj.genreIds)
    obj.mediaType = 'movie'
    return obj
  })
  return transformed
}

export const transformTrailers = (res) => {
  const filterTrailers = trailer => {
    const { official, site, type } = trailer

    return [official, site === 'YouTube', (type === 'Trailer' || type === 'Teaser')].every(Boolean)
  }
  const filteredTrailers = res.results.filter(filterTrailers)
  const sortedTrailers = [...filteredTrailers].sort((a, b) =>
    new Date(b.published_at) - new Date(a.published_at)
  )
  const trailers = sortedTrailers.filter(trailer => trailer.type === 'Trailer')
  const teasers = sortedTrailers.filter(trailer => trailer.type === 'Teaser')

  return [...trailers, ...teasers]
}

export const transformSimilar = async (res, mediaType) => {
  const genres = await getGenres()
  const transformed = res.results.map(obj => {
    obj = camelizeObjectKeys(obj)
    obj.posterPath = getPosterPath(obj.posterPath)
    obj.genres = extractGenres(genres.data.genres, obj.genreIds)
    obj.mediaType = mediaType
    return obj
  })

  return transformed.slice(0, 10)
}

export const transformImages = (res) => res.backdrops.map(image => ({
  id: extractImageId(image.file_path),
  imageUrl: getBackdropPath(image.file_path)
}))

const findPerson = (arr, person) => {
  const jobs = {
    director: ['Director'],
    writer: ['Writer', 'Screenplay', 'Characters', 'Story', 'Book', 'Screenstory'],
    producer: ['Producer', 'Executive Producer'],
    directorOfPhotography: ['Director of Photography'],
    composer: ['Original Music Composer', 'Musician', 'Music Score Producer', 'Orchestrator', 'Music Editor'],
    stunts: ['Stunts']
  }

  return arr.filter(item => jobs[person].includes(item.job))
}

export const transformCredits = (res) => {
  const cast = res.cast.map(obj => {
    obj = camelizeObjectKeys(obj)
    obj.profilePath = getProfilePath(obj.profilePath)
    return obj
  })

  const transformedCrew = res.crew.map(obj => {
    obj = camelizeObjectKeys(obj)
    obj.profilePath = getProfilePath(obj.profilePath)
    return obj
  })

  const uniqueTransformedCrew = getUniqueObjArr(transformedCrew)
  const director = findPerson(uniqueTransformedCrew, 'director')
  const writer = findPerson(uniqueTransformedCrew, 'writer')
  const producer = findPerson(uniqueTransformedCrew, 'producer')
  const directorOfPhotography = findPerson(uniqueTransformedCrew, 'directorOfPhotography')
  const composer = findPerson(uniqueTransformedCrew, 'composer')
  const stunts = findPerson(uniqueTransformedCrew, 'stunts')

  return { director, writer, producer, directorOfPhotography, composer, stunts, cast: getUniqueObjArr(cast) }
}

export const transformMovie = (res, mediaType) => {
  // console.log(mediaType)
  const transformedMovie = camelizeObjectKeys(res)
  transformedMovie.posterPath = getPosterPath(transformedMovie.posterPath)
  transformedMovie.backdropPath = getBackdropPath(transformedMovie.backdropPath)
  transformedMovie.mediaType = mediaType
  return transformedMovie
}

export const transformPersonCredits = async (res) => {
  const genres = await getGenres()

  const transformedPerson = camelizeObjectKeys(res)
  transformedPerson.profilePath = getProfilePath(transformedPerson.profilePath)
  transformedPerson.genres = extractGenres(genres.data.genres, transformedPerson.genreIds)

  console.log(transformedPerson)
}



