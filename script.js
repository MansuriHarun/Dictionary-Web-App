const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
  const currentValue = searchInput.value;
  const lowercaseValue = currentValue.toLowerCase();
  searchInput.value = lowercaseValue;
});

const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
  const word = searchInput.value.toLowerCase();
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      resultsDiv.innerHTML = '';
      if (!Array.isArray(data)) {
        // Handle the error and display a message to the user
        const resultContainer = document.getElementById('result-container');
        if (resultContainer) {
          resultContainer.innerHTML = `<p>No definition found for "${word}". Please try a different word.</p>`;
        }
        return;
      }
      data.forEach(item => {
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `<h2>${item.word}</h2>`;
        resultsDiv.appendChild(wordDiv);

        item.meanings.forEach(meaning => {
          const meaningDiv = document.createElement('div');
          meaningDiv.innerHTML = `<h3>${meaning.partOfSpeech}</h3>`;
          wordDiv.appendChild(meaningDiv);

          meaning.definitions.forEach(definition => {
            const definitionDiv = document.createElement('div');
            definitionDiv.innerHTML = `<p>${definition.definition}</p>`;
            meaningDiv.appendChild(definitionDiv);
          });
        });
      });
    })
    .catch(error => {
      resultsDiv.innerHTML = `<p>${error.message}</p>`;
    });
});