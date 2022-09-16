import { API_KEY, MOVIE_API, camelizeObjectKeys, getImageUrl, getUniqueObjArr } from '../utils'

export class responseTransformer {

  _getGenres = async () => await MOVIE_API.get(`genre/movie/list?api_key=${API_KEY}&language=en-US`)
  _extractGenres = (allGenres, genreIds) => allGenres.filter(genre => genreIds?.includes(genre.id))
  _extractImageId = (str) => str.slice(str.indexOf('/') + 1, str.indexOf('.'))

  _getPosterPath = (path) => ({
    image: getImageUrl(342, path),
    preview: getImageUrl(92, path)
  })

  _getBackdropPath = (path) => ({
    image: getImageUrl(1280, path),
    preview: getImageUrl(300, path),
  })

  _getProfilePath = (path) => ({
    preview: getImageUrl(45, path),
    image: getImageUrl(185, path)
  })

  _findPerson = (arr, person) => {
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

  transformMovie = (res, mediaType) => {
    const transformedMovie = camelizeObjectKeys(res)
    transformedMovie.posterPath = this._getPosterPath(transformedMovie.posterPath)
    transformedMovie.backdropPath = this._getBackdropPath(transformedMovie.backdropPath)
    transformedMovie.mediaType = mediaType || transformedMovie?.mediaType
    return transformedMovie
  }

  transformTrending = async (res) => {
    const genres = await this._getGenres()
    return res.results
      .map(obj => {
        obj = this.transformMovie(obj)
        obj.genres = this._extractGenres(genres.data.genres, obj.genreIds)
        return obj
      })
  }

  transformUpcoming = async (res) => {
    const genres = await this._getGenres()
    return res.results.map(obj => {
      obj = this.transformMovie(obj)
      obj.genres = extractGenres(genres.data.genres, obj.genreIds)
      obj.mediaType = 'movie'
      return obj
    })
  }

  transformPopularPersons = (res) => {
    return res.results
      .map(obj => {
        obj = camelizeObjectKeys(obj)
        obj.profilePath = this._getProfilePath(obj.profilePath)
        return obj
      })
  }

  transformTrailers = (res) => {
    const filterTrailers = trailer => {
      const { official, site, type } = trailer
      return [official, site === 'YouTube', (type === 'Trailer' || type === 'Teaser')].every(Boolean)
    }
  
    const filteredTrailers = res.results.filter(filterTrailers)
    const sortedTrailers = [...filteredTrailers]
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    const trailers = sortedTrailers.filter(trailer => trailer.type === 'Trailer')
    const teasers = sortedTrailers.filter(trailer => trailer.type === 'Teaser')
  
    return [...trailers, ...teasers]
  }
}

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

export const transformCredits = (res, genres) => {
  const cast = res.cast.map(obj => {
    obj = camelizeObjectKeys(obj)
    obj.profilePath = getProfilePath(obj.profilePath)
    obj.posterPath = getPosterPath(obj.posterPath)
    obj.genres = genres && extractGenres(genres, obj.genreIds)
    return obj
  })

  const transformedCrew = res.crew.map(obj => {
    obj = camelizeObjectKeys(obj)
    obj.profilePath = getProfilePath(obj.profilePath)
    obj.posterPath = getPosterPath(obj.posterPath)
    obj.genres = genres && extractGenres(genres, obj.genreIds)
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

export const transformPersonCredits = async (res) => {
  const genres = await getGenres()
  const transformedPerson = camelizeObjectKeys(res)
  transformedPerson.profilePath = getProfilePath(transformedPerson.profilePath)
  transformedPerson.combinedCredits = transformCredits(transformedPerson.combinedCredits, genres.data.genres)

  return transformedPerson
}



