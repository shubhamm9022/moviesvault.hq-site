const supabase = createClient("https://riwgagiilkmudczczfuw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dhZ2lpbGttdWRjemN6ZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjYwODksImV4cCI6MjA1OTE0MjA4OX0.0_lciZODhjlzF_tSCLX7egMVodXhDTDU7jK6TphuQUk");

// Get movie name from URL
const movieName = window.location.pathname.split("/").pop().replace(/-/g, ' ');

async function fetchMovieDetails() {
    const { data, error } = await supabase.from("movies").select("*").ilike("title", movieName).single();
    
    if (error || !data) {
        document.getElementById("movie-details").innerHTML = "<p>Movie not found.</p>";
        return;
    }

    document.getElementById("movie-details").innerHTML = `
        <h1>${data.title} (${data.year})</h1>
        <img src="${data.poster_url}" alt="${data.title}">
        <p>${data.description}</p>
        <a href="${data.stream_link}" target="_blank"><button>Stream</button></a>
        <a href="${data.download_link}" target="_blank"><button>Download</button></a>
    `;
}

document.addEventListener("DOMContentLoaded", fetchMovieDetails);
