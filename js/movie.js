// Initialize Supabase
const supabaseUrl = "https://riwgagiilkmudczczfuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dhZ2lpbGttdWRjemN6ZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjYwODksImV4cCI6MjA1OTE0MjA4OX0.0_lciZODhjlzF_tSCLX7egMVodXhDTDU7jK6TphuQUk"; // Replace with your actual key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

console.log("✅ Supabase Initialized:", supabase);

// Fetch movie details
async function fetchMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieSlug = urlParams.get("slug");

    if (!movieSlug) {
        document.getElementById("movie-details").innerHTML = "<p>Movie not found.</p>";
        return;
    }

    let { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("slug", movieSlug)
        .single();

    if (error || !data) {
        console.error("❌ Error fetching movie details:", error);
        document.getElementById("movie-details").innerHTML = "<p>Movie not found.</p>";
        return;
    }

    displayMovieDetails(data);
}

// Display movie details
function displayMovieDetails(movie) {
    const movieDetails = document.getElementById("movie-details");
    movieDetails.innerHTML = `
        <div class="movie-container">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h1>${movie.title} (${movie.year})</h1>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Description:</strong> ${movie.description}</p>
                <a href="${movie.streamLink}" target="_blank" class="btn">🎬 Watch Now</a>
                <a href="${movie.downloadLink}" target="_blank" class="btn">📥 Download</a>
            </div>
        </div>
    `;
}

// Load movie details when page loads
document.addEventListener("DOMContentLoaded", fetchMovieDetails);
