import imagesAndVideosService from './imagesAndVideos'
import personsService from './persons'
import moviesAndTvService from './moviesAndTv'
import creditsService from './credits'
import searchService from './search'

const moviesAndTv = new moviesAndTvService()
const imagesAndVideos = new imagesAndVideosService()
const persons = new personsService()
const credits = new creditsService()
const search = new searchService()


 const movieService = {
  getUpcomingMovies: moviesAndTv.getUpcomingMovies,
  getMediaById: moviesAndTv.getMediaById,
  transformMedia: moviesAndTv.transformMedia,
  getDetailsCredit: persons.getDetailsCredit,
  getPopularPeople: persons.getPopularPeople,
  getPersonDetails: persons.getDetails,
  getCombinedCredits: credits.getCombinedCredits,
  getCredits: credits.getCredits,
  getPersonImages: persons.getImages,
  getBackdropImages: imagesAndVideos.getBackdropImages,
  getTrailers: imagesAndVideos.getTrailers,
  getSearchResult: search.getSearchResult
}

export default movieService