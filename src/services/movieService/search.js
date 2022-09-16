import { API_KEY, MOVIE_API } from '../../utils'

export default class searchService {

  getSearchResult = async ({query, page}) => {
    const response = await MOVIE_API
      .get(`search/multi?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}`)
      

      // console.log(response.data)
    return response.data
  }
}