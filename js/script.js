// Ensure Supabase SDK is loaded
if (typeof supabase === "undefined") {
    console.error("❌ Supabase SDK not loaded!");
} else {
    console.log("✅ Supabase SDK Loaded");
}

// Initialize Supabase
const supabaseUrl = "https://riwgagiilkmudczczfuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dhZ2lpbGttdWRjemN6ZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjYwODksImV4cCI6MjA1OTE0MjA4OX0.0_lciZODhjlzF_tSCLX7egMVodXhDTDU7jK6TphuQUk"; // Replace with actual key
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log("✅ Supabase Initialized:", supabase); // Debugging check

let currentPage = 1;
const moviesPerPage = 10;

// Fetch movies with pagination
async function fetchMovies(page = 1) {
    const start = (page - 1) * moviesPerPage;
    const end = start + moviesPerPage - 1;

    let { data, error } = await supabase
        .from("movies")
        .select("*")
        .order("id", { ascending: false }) // Show newest movies first
        .range(start, end);

    if (error) {
        console.error("❌ Error fetching movies:", error);
        return;
    }

    console.log("🎬 Movies fetched:", data);
    displayMovies(data);
}

// Search movies
async function searchMovies() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    
    if (!query) {
        fetchMovies(currentPage);
        return;
    }

    let { data, error } = await supabase
        .from("movies")
        .select("*")
        .ilike("title", `%${query}%`);

    if (error) {
        console.error("❌ Search error:", error);
        return;
    }

    displayMovies(data);
}

// Display movies in the movie list
function displayMovies(movies) {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    if (!movies || movies.length === 0) {
        movieList.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movies.forEach(movie => {
        const movieSlug = movie.title.trim().replace(/\s+/g, '-').toLowerCase();
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");

        movieItem.innerHTML = `
            <a href="movie.html?title=${movieSlug}">
                <img src="${movie.poster}" alt="${movie.title}">
            </a>
            <h3>${movie.title} (${movie.year})</h3>
            <p>${movie.genre}</p>
        `;

        movieList.appendChild(movieItem);
    });
}

// Pagination controls
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchMovies(currentPage);
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    fetchMovies(currentPage);
});

// Ensure `DOMContentLoaded` event loads before using Supabase
document.addEventListener("DOMContentLoaded", () => {
    fetchMovies(currentPage);
});
