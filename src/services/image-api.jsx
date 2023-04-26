function fetchImages(findValue, pageNumber) {
  const KEY = '34349101-ec25eec32b9371237ca900ff3';
  const URL = 'https://pixabay.com/api/';

  return fetch(
    `${URL}?q=${findValue}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Oh no... We cant find ${findValue}`));
  });
}
const api = { fetchImages };

export default api;
