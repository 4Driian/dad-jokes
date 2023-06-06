import { getRandomJoke, searchJokes } from './modules/jokesModule.js';
import { renderJoke, renderSearchResults, clearSearchResults, getSearchTerm } from './modules/UIModule.js';

function init() {
  const randomJokeBtn = document.getElementById('randomJokeBtn');
  const searchBtn = document.getElementById('searchBtn');

  randomJokeBtn.addEventListener('click', async () => {
    const joke = await getRandomJoke();
    renderJoke(joke);
    clearSearchResults();
  });

  searchBtn.addEventListener('click', async () => {
    const searchTerm = getSearchTerm();
    if (searchTerm === '') {
      clearSearchResults();
      return;
    }
    const results = await searchJokes(searchTerm);
    renderSearchResults(results);
  });
}

init();
