import { API_KEY, MOVIE_API, camelizeObjectKeys, getImageUrl, getUniqueObjArr } from '../utils'

export class responseTransformer {

  _getGenres = async () => await MOVIE_API.get(`genre/movie/list?api_key=${API_KEY}&language=en-US`)
  _extractGenres = (allGenres, genreIds) => allGenres.filter(genre => genreIds?.includes(genre.id))
  _extractImageId = (str) => str.slice(str.indexOf('/') + 1, str.indexOf('.'))

  _getPosterPath = (path) => ({
    preview: getImageUrl(92, path),
    image: getImageUrl(342, path)
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
      obj.genres = this._extractGenres(genres.data.genres, obj.genreIds)
      obj.mediaType = 'movie'
      return obj
    })
  }

  transformSimilar = async (res, mediaType) => {
    const genres = await this._getGenres()
    return res.results.map(obj => {
      obj = this.transformMovie(obj, mediaType)
      obj.genres = this._extractGenres(genres.data.genres, obj.genreIds)
      return obj
    }).slice(0, 10)
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

  transformImages = (res) => res.backdrops.map(image => ({
    id: this._extractImageId(image.file_path),
    imageUrl: this._getBackdropPath(image.file_path)
  }))

  transformCredits = (res, genres) => {
    const cast = res.cast.map(obj => {
      obj = camelizeObjectKeys(obj)
      obj.profilePath = this._getProfilePath(obj.profilePath)
      obj.posterPath = this._getPosterPath(obj.posterPath)
      obj.genres = genres && this._extractGenres(genres, obj.genreIds)
      return obj
    })

    const transformedCrew = res.crew.map(obj => {
      obj = camelizeObjectKeys(obj)
      obj.profilePath = this._getProfilePath(obj.profilePath)
      obj.posterPath = this._getPosterPath(obj.posterPath)
      obj.genres = genres && this._extractGenres(genres, obj.genreIds)
      return obj
    })

    const director = this._findPerson(transformedCrew, 'director')
    const writer = this._findPerson(transformedCrew, 'writer')
    const producer = this._findPerson(transformedCrew, 'producer')
    const directorOfPhotography = this._findPerson(transformedCrew, 'directorOfPhotography')
    const composer = this._findPerson(transformedCrew, 'composer')
    const stunts = this._findPerson(transformedCrew, 'stunts')

    return { 
      director: getUniqueObjArr(director), 
      writer: getUniqueObjArr(writer), 
      producer: getUniqueObjArr(producer), 
      directorOfPhotography: getUniqueObjArr(directorOfPhotography), 
      composer: getUniqueObjArr(composer), 
      stunts: getUniqueObjArr(stunts), 
      cast: getUniqueObjArr(cast) 
    }
  }

  transformPersonCredits = async (res) => {
    const genres = await this._getGenres()
    const transformedPerson = camelizeObjectKeys(res)
    transformedPerson.profilePath = this._getProfilePath(transformedPerson.profilePath)
    transformedPerson.combinedCredits = this.transformCredits(transformedPerson.combinedCredits, genres.data.genres)

    return transformedPerson
  }

  transformSearchResults = (res) => {
    const transformed = camelizeObjectKeys(res)
    transformed.results = transformed.results.map(item => {
      const transformedItem = camelizeObjectKeys(item)
      if (transformedItem.posterPath) {
        transformedItem.posterPath = (this._getPosterPath(transformedItem.posterPath))
      }
      if (transformedItem.profilePath) {
        transformedItem.profilePath = (this._getProfilePath(transformedItem.profilePath))
      }
      if (transformedItem.mediaType === 'person') {
        transformedItem.knownFor = transformedItem.knownFor.map(movie => camelizeObjectKeys(movie)) 
      }
      console.log(transformedItem)
      return transformedItem
    })
    return transformed
  }
}