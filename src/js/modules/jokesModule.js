const apiUrl = 'https://icanhazdadjoke.com';

async function getRandomJoke() {
  const response = await fetch(apiUrl, {
    headers: {
      'Accept': 'application/json'
    }
  });
  const data = await response.json();
  return data.joke;
}

async function searchJokes(term) {
  const response = await fetch(`${apiUrl}/search?term=${term}`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  const data = await response.json();
  return data.results.map(result => result.joke);
}

export { getRandomJoke, searchJokes };