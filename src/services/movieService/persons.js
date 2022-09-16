import { API_KEY, MOVIE_API, getImageUrl, transformDate } from '../../utils'

export default class personsService {
  BIG_PROFILE_IMG = 'https://image.tmdb.org/t/p/h632/'

  _getGenres = async () => {
    const response = await MOVIE_API
      .get(`genre/movie/list?api_key=${API_KEY}&language=en-US`)

    return response.data.genres
  }

  _transformPopularPerson = person => {
    return {
      id: person.id,
      knownFor: person.known_for,
      knownForDepartment: person.known_for_department,
      name: person.name,
      popularity: person.popularity,
      imagePath: {
        preview: getImageUrl(45, person.profile_path),
        image: getImageUrl(185, person.profile_path)
      }
    }
  }

  _transformPerson = person => {
    return {
      adult: person.adult,
      creditId: person.credit_id,
      department: person.department,
      gender: person.gender,
      id: person.id,
      job: person.job,
      knownForDepartment: person.known_for_department,
      name: person.name,
      originalName: person.original_name,
      popularity: person.popularity,
      imagePath: {
        preview: getImageUrl(45, person.profile_path),
        image: getImageUrl(185, person.profile_path)
      }
    }
  }

  _transformPersonDetails = person => {
    return {
      id: person.id,
      name: person.name,
      gender: person.gender,
      knownForDepartment: person.known_for_department,
      placeOfBirth: person.place_of_birth,
      biography: person.biography,
      birthday: transformDate(person.birthday),
      deathday: person.deathday,
      imagePath: {
        preview: getImageUrl(45, person.profile_path),
        image: `${this.BIG_PROFILE_IMG}${person.profile_path}`
      }
    }
  }

  getPopularPeople = async () => {
    const response = await MOVIE_API
      .get(`person/popular?api_key=${API_KEY}&language=en-US`)

    return response.data.results.map(this._transformPopularPerson)
  }

  getDetailsCredit = async (id, mediaType) => {
    const credit = await MOVIE_API
      .get(`${mediaType}/${id}/credits?api_key=${API_KEY}`)

    const directors = credit.data.crew
      .filter(item => item.job === 'Director')
      .map(this._transformPerson)

    const writers = credit.data.crew
      .filter(item => item.job === 'Screenplay' || item.job === 'Writer')
      .map(this._transformPerson)

    const cast = credit.data.cast
      .slice(0, 5)
      .map(this._transformPerson)

    return { directors, writers, cast }
  }

  getDetails = async (id) => {
    const details = await MOVIE_API
      .get(`person/${id}?api_key=${API_KEY}`)
    return this._transformPersonDetails(details.data)
  }

  getImages = async (id) => {
    const response = await MOVIE_API
      .get(`person/${id}/images?api_key=${API_KEY}`)

    const images = response.data.profiles.map(image => {
      return {
        preview: getImageUrl(45, image.file_path),
        image: getImageUrl(185, image.file_path)
      }
    })
    
    return images
  }
}
