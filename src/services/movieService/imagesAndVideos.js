import { getImageUrl, API_KEY, MOVIE_API } from '../../utils'

export default class imagesAndVideosService {

  _filterTrailers = trailer => {
    const { official, site, type } = trailer
  
    return [official, site === 'YouTube', (type === 'Trailer' || type === 'Teaser')].every(Boolean)
  }

  _extractImageId = (str) => {
    return str.slice(str.indexOf('/') + 1, str.indexOf('.'))
  }
  
  _transformBackdropImage = (image) => {
    return {
      id: this._extractImageId(image.file_path),
      imageUrl: {
        image: getImageUrl(1280, image.file_path),
        preview: getImageUrl(300, image.file_path)
      }
    }
  }

  getTrailers = async (id, mediaType) => {
    const response = await MOVIE_API
      .get(`${mediaType}/${id}/videos?api_key=${API_KEY}`)
    const filteredTrailers = response.data.results.filter(this._filterTrailers)
  
    const sortedTrailers = [...filteredTrailers].sort((a, b) =>
      new Date(b.published_at) - new Date(a.published_at)
    )
  
    const trailers = sortedTrailers.filter(trailer => trailer.type === 'Trailer')
    const teasers = sortedTrailers.filter(trailer => trailer.type === 'Teaser')
  
    return [...trailers, ...teasers]
  }

  getBackdropImages = async (id, mediaType) => {
    const images = await MOVIE_API
      .get(`${mediaType}/${id}/images?api_key=${API_KEY}`)
  
    return images.data.backdrops.map(this._transformBackdropImage)
  }
}
