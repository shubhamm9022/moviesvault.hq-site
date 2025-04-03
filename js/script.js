// Load Supabase
const supabaseUrl = "https://riwgagiilkmudczczfuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dhZ2lpbGttdWRjemN6ZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjYwODksImV4cCI6MjA1OTE0MjA4OX0.0_lciZODhjlzF_tSCLX7egMVodXhDTDU7jK6TphuQUk"; // Don't expose publicly in production
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

console.log("✅ Supabase Initialized:", supabase);

// Fetch movies
async function fetchMovies() {
    let { data, error } = await supabase.from("movies").select("*");

    if (error) {
        console.error("❌ Error fetching movies:", error);
        return [];
    }

    console.log("🎬 Movies fetched:", data);
    displayMovies(data);
}

// Search movies
async function searchMovies() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    
    if (!query) {
        fetchMovies();
        return;
    }

    let { data, error } = await supabase.from("movies").select("*").ilike("title", `%${query}%`);
    
    if (error) {
        console.error("❌ Search error:", error);
        return;
    }

    displayMovies(data);
}

// Display movies
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

// Load movies when page loads
document.addEventListener("DOMContentLoaded", fetchMovies);
