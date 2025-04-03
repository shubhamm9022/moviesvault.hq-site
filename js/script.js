async function fetchMovies() {
    try {
        const { data, error } = await supabase.from("movies").select("*");

        if (error) {
            console.error("❌ Error fetching movies:", error);
            return;
        }

        if (!data || data.length === 0) {
            console.warn("⚠ No movies found in database!");
            document.getElementById("movie-list").innerHTML = "<p>No movies available.</p>";
            return;
        }

        console.log("🎬 Movies fetched successfully:", data);
        displayMovies(data);
    } catch (err) {
        console.error("❌ Unexpected error:", err);
    }
}

function displayMovies(movies) {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    movies.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");

        movieItem.innerHTML = `
            <a href="movie.html?slug=${movie.slug}">
                <img src="${movie.poster}" alt="${movie.title}">
            </a>
            <h3>${movie.title} (${movie.year})</h3>
            <p>${movie.genre}</p>
        `;

        movieList.appendChild(movieItem);
    });
}

// Load movies when the page loads
document.addEventListener("DOMContentLoaded", fetchMovies);

