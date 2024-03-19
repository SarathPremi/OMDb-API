// Function to fetch movie data from the OMDb API
async function fetchMovieData(searchQuery) {
  const apiKey = "3f88c0a1";
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.Search;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return [];
  }
}

// Function to display movie search results on the webpage
function displayMovieResults(results) {
  const resultArea = document.getElementById("resultArea");

  // Clear previous search results
  resultArea.innerHTML = "";

  if (results && results.length > 0) {
    // Display each movie result
    results.forEach((movie) => {
      const movieCard = `
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${movie.Poster}" class="card-img" alt="${movie.Title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${movie.Title}</h5>
                                <p class="card-text">${movie.Year}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      resultArea.innerHTML += movieCard;
    });
  } else {
    resultArea.innerHTML = "<p>No results found.</p>";
  }
}

// Event listener for the search form submission
document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const searchInput = document.getElementById("searchInput").value.trim();

    if (searchInput === "") {
      alert("Please enter a movie title.");
      return;
    }

    const searchResults = await fetchMovieData(searchInput);
    displayMovieResults(searchResults);
  });
