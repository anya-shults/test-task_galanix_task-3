import { PerPageSelector } from '../types/perPageSelectorType';

const BASE_URL = 'http://universities.hipolabs.com/';

const request = (url: string) => {
  return fetch(BASE_URL + url)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const serchByCountry = (
  country: string,
  limit: PerPageSelector = '10',
  offset = 1
) => {  
  if (limit === '0') {
    return request(`search?country=${country}`);
  }

  return request(
    `search?country=${country}&offset=${offset}&limit=${limit}`
  );
};

export const getUniversitiesNumber = (country: string) => {
  return request(`search?country=${country}`)
    .then(response => response.length);
};
