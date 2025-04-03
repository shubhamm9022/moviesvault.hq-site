// Initialize Supabase
const supabase = supabase.createClient(
    "https://riwgagiilkmudczczfuw.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dhZ2lpbGttdWRjemN6ZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjYwODksImV4cCI6MjA1OTE0MjA4OX0.0_lciZODhjlzF_tSCLX7egMVodXhDTDU7jK6TphuQUk"
);

// Get movie name from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieSlug = urlParams.get("title");

async function fetchMovieDetails() {
    if (!movieSlug) {
        document.getElementById("movie-details").innerHTML = "<p>Invalid movie.</p>";
        return;
    }

    // Convert slug back to title format
    const movieTitle = decodeURIComponent(movieSlug.replace(/-/g, ' '));

    console.log("Fetching movie:", movieTitle); // Debugging log

    // Fetch movie details
   async function fetchMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieSlug = urlParams.get("slug");

    if (!movieSlug) {
        document.getElementById("movie-details").innerHTML = "<p>Invalid movie.</p>";
        return;
    }

    const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("slug", movieSlug)
        .single();

    if (error || !data) {
        document.getElementById("movie-details").innerHTML = "<p>Movie not found.</p>";
        return;
    }

    document.getElementById("movie-details").innerHTML = `
        <h1>${data.title} (${data.year})</h1>
        <img src="${data.poster}" alt="${data.title}">
        <p>${data.description}</p>
        <a href="${data.streamLink}" target="_blank"><button>Stream</button></a>
        <a href="${data.downloadLink}" target="_blank"><button>Download</button></a>
    `;
}

// Load movie details when the page loads
document.addEventListener("DOMContentLoaded", fetchMovieDetails);

 
