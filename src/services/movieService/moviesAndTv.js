import {API_KEY, MOVIE_API, getImageUrl, transformDate ,shuffleArray } from '../../utils'
import imagesAndVideosService from './imagesAndVideos'

const imagesAndVideos = new imagesAndVideosService()

export default class moviesAndTvService {
  _getGenres = async () => {
    const response = await MOVIE_API
      .get(`genre/movie/list?api_key=${API_KEY}&language=en-US`)

    return response.data.genres
  }

  _extractGenres = (allGenres, genreIds) => allGenres.filter(genre => genreIds?.includes(genre.id))

  _appendTrailersToMovie = async movie => {
    const { id } = movie
    const trailers = await imagesAndVideos.getTrailers(id, 'movie')
    movie.trailers = trailers
    return movie
  }

  _transformMediaDetails = (media, mediaType) => {

    const details = {
      id: media.id,
      overview: media.overview,
      posterPath: {
        image: getImageUrl(342, media.poster_path),
        preview: getImageUrl(92, media.poster_path)
      },
      backdropPath: {
        image: getImageUrl(1280, media.backdrop_path),
        preview: getImageUrl(300, media.backdrop_path)
      },
      voteAverage: media.vote_average,
      voteCount: media.vote_count,
      genres: media.genres,
      status: media.status,
      tagline: media.tagline,
      productionCompanies: media.production_companies,
      productionCountries: media.production_countries,
      mediaType
    }

    if (mediaType === 'movie') {
      return {
        ...details,
        title: media.title,
        releaseDate: transformDate(media.release_date),
        budget: media.budget,
        revenue: media.revenue,
        runtime: media.runtime,
      }

    }

    if (mediaType === 'tv') {
      return {
        ...details,
        title: media.name,
        releaseDate: media.first_air_date,
        lastAirDate: media.last_air_date,
        numberOfEpisodes: media.number_of_episodes,
        numberOfSeasons: media.number_of_seasons,
        episodeRuntime: media.episode_run_time,
      }
    }
  }

  transformMedia = (media, allGenres) => {

    return {
      id: media.id,
      title: media.title || media.name,
      overview: media.overview,
      posterPath: {
        image: getImageUrl(342, media.poster_path),
        preview: getImageUrl(92, media.poster_path)
      },
      backdropPath: {
        image: getImageUrl(1280, media.backdrop_path),
        preview: getImageUrl(300, media.backdrop_path),
      },
      releaseDate: media.release_date || media.first_air_date,
      voteAverage: media.vote_average,
      voteCount: media.vote_count,
      genres: this._extractGenres(allGenres, media.genre_ids),
      mediaType: media.media_type
    }
  }

  getUpcomingMovies = async () => {
    const response = await MOVIE_API
      .get(`movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)

    const allGenres = await this._getGenres()
    const transformedResponse = response.data.results.map(movie => this.transformMedia(movie, allGenres))
    const responseWithTrailers = await Promise.all(transformedResponse.map(this._appendTrailersToMovie))
    const result = responseWithTrailers.filter(trailer => trailer.trailers.length)
    return shuffleArray(result).slice(0, 5)
  }

  getMediaById = async (id, mediaType) => {
    const media = await MOVIE_API
      .get(`${mediaType}/${id}?api_key=${API_KEY}&language=en-US`)

    return this._transformMediaDetails(media.data, mediaType)
  }
}

