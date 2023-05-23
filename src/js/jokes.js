const UIModule = (() => {
  const jokeEl = document.getElementById('joke');
  const jokeBtn = document.getElementById('jokeBtn');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchResults = document.getElementById('searchResults');

  function renderJoke(joke) {
    jokeEl.innerHTML = `<a href="products.html">${joke}</a>`;
    clearSearchResults();
  }

  function renderSearchResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = 'No results found.';
      return;
    }
    const html = results.map(joke => `<p><a href="products.html">${joke}</a></p>`).join('');
    searchResults.innerHTML = html;
  }

  function clearSearchResults() {
    searchResults.innerHTML = '';
  }

  return { renderJoke, renderSearchResults, clearSearchResults, searchInput };
})();

const jokesModule = (() => {
  const api = 'https://icanhazdadjoke.com/';

  async function getJoke() {
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    }
    const res = await fetch(api, config);
    const data = await res.json();
    return data.joke;
  }

  async function searchJokes(term) {
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    }
    const res = await fetch(`${api}search?term=${term}`, config);
    const data = await res.json();
    return data.results.map(result => result.joke);
  }

  return { getJoke, searchJokes };
})();

const jokeCtrl = (() => {
  let selectedJoke = '';

  function getSelectedJoke() {
    return selectedJoke;
  }

  function setSelectedJoke(joke) {
    selectedJoke = joke;
    obsModule.notify();
  }

  return { getSelectedJoke, setSelectedJoke };
})();

const jokesApp = (() => {
  function init() {
    jokeBtn.addEventListener('click', async () => {
      const joke = await jokesModule.getJoke();
      UIModule.renderJoke(joke);
      UIModule.searchInput.value = '';
    });

    searchBtn.addEventListener('click', async () => {
      const term = UIModule.searchInput.value.trim();
      if (term.length === 0) {
        return;
      }
      const results = await jokesModule.searchJokes(term);
      UIModule.renderSearchResults(results);
    });
  }

  return { init };
})();

export { UIModule, jokesModule, jokesApp }