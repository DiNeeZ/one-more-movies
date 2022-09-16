import axios from 'axios'

const BASE_IMAGES = 'https://image.tmdb.org/t/p/'

export const BASE_URL = 'https://api.themoviedb.org/3/'
export const API_KEY = process.env.REACT_APP_TMDB_KEY
export const MOVIE_API = axios.create({ baseURL: 'https://api.themoviedb.org/3/' })

export const capitalizeFirstLetter = (str) => `${str[0].toUpperCase()}${str.slice(1)}`

export const getUniqueObjArr = (arr) => {
  return [...new Map(arr.map((item) => [item['id'], item])).values()]
} 

export const shuffleArray = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
}

export const getImageUrl = (size, imgPath) => {
  if (imgPath) {
    return `${BASE_IMAGES}w${size}${imgPath}`
  }
}

export const transformDate = date => {
  return (new Date(date)).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export const camelizeObjectKeys = (obj) => {
  const camelize = (str) => str.replace(/_./g, (x) => x[1].toUpperCase())
  const camelized = Object.keys(obj).reduce((acc, curr) => {
    acc[camelize(curr)] = obj[curr]
    return acc
  }, {})

  return camelized
}
