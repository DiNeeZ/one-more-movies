import movieService from '.'
import { API_KEY, MOVIE_API, getImageUrl, getUniqueObjArr } from '../../utils'

export default class creditsService {

  _getGenres = async () => {
    const response = await MOVIE_API
      .get(`genre/movie/list?api_key=${API_KEY}&language=en-US`)

    return response.data.genres
  }

  _findWriter = arr => arr.filter(item => {
    return (
      (item.job === 'Writer') ||
      (item.job === 'Screenplay') ||
      (item.job === 'Characters') ||
      (item.job === 'Story') ||
      (item.job === 'Book') ||
      (item.job === 'Screenstory')
    )
  })

  _findProducer = arr => arr.filter(item =>
    (item.job === 'Producer') || (item.job === 'Executive Producer')
  )

  _findDirector = arr => arr.filter(item => item.job === 'Director')

  _findDirectorOfPhotography = arr => arr.filter(item => {
    return (
      (item.job === 'Director of Photography')
    )
  })

  _findComposer = arr => arr.filter(item => {
    return (
      (item.job === 'Original Music Composer') ||
      (item.job === 'Musician') ||
      (item.job === 'Music Score Producer') ||
      (item.job === 'Orchestrator') ||
      (item.job === 'Musician') ||
      (item.job === 'Music Editor')
    )
  })

  _findStuntman = arr => arr.filter(item => item.job === 'Stunts')

  _transsformPersonFromCredits = person => {

    return {
      character: person.character,
      id: person.id,
      job: person.job,
      name: person.name,
      image: getImageUrl(185, person.profile_path)
    }
  }

  getCredits = async (id, mediaType) => {
    const credits = await MOVIE_API
      .get(`${mediaType}/${id}/credits?api_key=${API_KEY}`)
    const media = await MOVIE_API
      .get(`${mediaType}/${id}?api_key=${API_KEY}`)

    const getYear = str => str.split('-')[0]

    const title = media.data.title || media.data.name
    const year = mediaType === 'movie' ? getYear(media.data.release_date) : getYear(media.data.first_air_date)
    const image = getImageUrl(185, media.data.poster_path)
    const transformedCrew = credits.data.crew.map(person => this._transsformPersonFromCredits(person))

    const crew = {
      director: this._findDirector(transformedCrew),
      writer: this._findWriter(transformedCrew),
      producer: this._findProducer(transformedCrew),
      directorOfPhotography: this._findDirectorOfPhotography(transformedCrew),
      composer: this._findComposer(transformedCrew),
      stunts: this._findStuntman(transformedCrew),
      cast: credits.data.cast.map(person => this._transsformPersonFromCredits(person))
    }

    return { id, mediaType, title, year, image, crew }
  }

  getCombinedCredits = async (id) => {
    const allGenres = await this._getGenres()
    const tvCredits = await MOVIE_API
      .get(`person/${id}/tv_credits?api_key=${API_KEY}`)
    tvCredits.data.cast.forEach(item => item.media_type = 'tv')
    tvCredits.data.crew.forEach(item => item.media_type = 'tv')
    const movieCredits = await MOVIE_API
      .get(`person/${id}/movie_credits?api_key=${API_KEY}`)
    movieCredits.data.cast.forEach(item => item.media_type = 'movie')
    movieCredits.data.crew.forEach(item => item.media_type = 'movie')
    const cast = [...movieCredits.data.cast, ...tvCredits.data.cast]
      .map(item => movieService.transformMedia(item, allGenres))
    const crew = [...movieCredits.data.crew, ...tvCredits.data.crew]
      .map(item => {
        const transformed = movieService.transformMedia(item, allGenres)
        transformed.job = item.job
        transformed.department = item.department
        return transformed
      })

    const director = getUniqueObjArr(this._findDirector(crew))
    const producer = getUniqueObjArr(this._findProducer(crew))
    const writer = getUniqueObjArr(this._findWriter(crew))
    const directorOfPhotography = getUniqueObjArr(this._findDirectorOfPhotography(crew))
    const composer = getUniqueObjArr(this._findComposer(crew))
    const stunts = getUniqueObjArr(this._findStuntman(crew))

    return { cast: getUniqueObjArr(cast), director, writer, producer, directorOfPhotography, composer, stunts }
  }
} 