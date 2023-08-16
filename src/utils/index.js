import axios from "axios";

const BASE_IMAGES = "https://image.tmdb.org/t/p/";

export const BASE_URL = "https://api.themoviedb.org/3/";
export const API_KEY = import.meta.env.VITE_TMDB_KEY;
export const MOVIE_API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const capitalizeFirstLetter = (str) =>
  `${str[0].toUpperCase()}${str.slice(1)}`;

export const getUniqueObjArr = (arr) => {
  return [...new Map(arr.map((item) => [item["id"], item])).values()];
};

export const shuffleArray = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
};

export const getImageUrl = (size, imgPath) => {
  if (imgPath) {
    return `${BASE_IMAGES}w${size}${imgPath}`;
  }
};

export const transformDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const camelizeObjectKeys = (obj) => {
  const camelize = (str) => str.replace(/_./g, (x) => x[1].toUpperCase());
  const camelized = Object.keys(obj).reduce((acc, curr) => {
    acc[camelize(curr)] = obj[curr];
    return acc;
  }, {});

  return camelized;
};

export const registerValidate = (values) => {
  let errors = {};

  if (!values.displayName) {
    errors.displayName = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password field is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (values.password.length >= 6) {
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password field is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not mutch";
    }
  }

  return errors;
};

export const loginValidate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password field is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};
