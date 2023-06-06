const jokeEl = document.getElementById('joke');
const randomJokeBtn = document.getElementById('randomJokeBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResultsEl = document.getElementById('searchResults');
const jokeList = document.getElementById('joke-list');

function renderJoke(joke) {
  jokeEl.innerHTML = `<a href="products.html" id="jokeLink">${joke}</a>`;
  clearSearchResults();
  const jokeLink = document.getElementById('jokeLink');
  jokeLink.addEventListener('click', handleJokeLinkClick);
}

function renderSearchResults(results) {
  const html = results.map(joke => `<li><a href="products.html" class="joke-link">${joke}</a></li>`).join('');
  searchResults.innerHTML = html;
  
  const jokeLinks = document.querySelectorAll('.joke-link');
  jokeLinks.forEach(jokeLink => {
    jokeLink.addEventListener('click', handleJokeLinkClick);
  });
}

function clearSearchResults() {
  searchResultsEl.innerHTML = '';
}

function clearJokeList() {
  jokeList.innerHTML = '';
}

function addJokeToList(joke) {
  const li = document.createElement('li');
  li.textContent = joke;
  jokeList.appendChild(li);
}

function getSearchTerm() {
  return searchInput.value.trim();
}

export { renderJoke, renderSearchResults, clearSearchResults, clearJokeList, addJokeToList, getSearchTerm };