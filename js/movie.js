// Initialize Supabase
const supabaseUrl = "https://riwgagiilkmudczczfuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dhZ2lpbGttdWRjemN6ZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjYwODksImV4cCI6MjA1OTE0MjA4OX0.0_lciZODhjlzF_tSCLX7egMVodXhDTDU7jK6TphuQUk"; // Don't expose publicly in production
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Get movie name from URL
const urlParams = new URLSearchParams(window.location.search);
const movieSlug = urlParams.get("title");

async function fetchMovieDetails() {
    if (!movieSlug) {
        document.getElementById("movie-details").innerHTML = "<p>Invalid movie.</p>";
        return;
    }

    let { data, error } = await supabase.from("movies").select("*")
        .eq("slug", decodeURIComponent(movieSlug));

    if (error || !data || data.length === 0) {
        document.getElementById("movie-details").innerHTML = "<p>Movie not found.</p>";
        return;
    }

    const movie = data[0]; // First matching result

    document.getElementById("movie-details").innerHTML = `
        <h1>${movie.title} (${movie.year})</h1>
        <img src="${movie.poster}" alt="${movie.title}">
        <p>${movie.description}</p>
        <a href="${movie.streamLink}" target="_blank"><button>Stream</button></a>
        <a href="${movie.downloadLink}" target="_blank"><button>Download</button></a>
    `;
}

document.addEventListener("DOMContentLoaded", fetchMovieDetails);

