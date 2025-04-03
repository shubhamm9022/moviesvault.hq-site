const supabase = createClient("https://riwgagiilkmudczczfuw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dhZ2lpbGttdWRjemN6ZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjYwODksImV4cCI6MjA1OTE0MjA4OX0.0_lciZODhjlzF_tSCLX7egMVodXhDTDU7jK6TphuQUk");

// Fetch movies
async function fetchMovies() {
    const { data, error } = await supabase.from("movies").select("*");
    if (error) console.error("Error fetching movies:", error);
    return data;
}

// Search movies
async function searchMovies() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    if (!query) {
        displayMovies(await fetchMovies());
        return;
    }

    const { data, error } = await supabase.from("movies").select("*").ilike("title", `%${query}%`);
    if (error) console.error("Search error:", error);
    displayMovies(data);
}

// Display movies
function displayMovies(movies) {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    if (movies.length === 0) {
        movieList.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movies.forEach((movie) => {
        const movieSlug = movie.title.replace(/\s+/g, '-').toLowerCase();
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");

        movieItem.innerHTML = `
            <a href="movie/${movieSlug}">
                <img src="${movie.poster_url}" alt="${movie.title}">
            </a>
            <h3>${movie.title} (${movie.year})</h3>
            <p>${movie.category}</p>
        `;

        movieList.appendChild(movieItem);
    });
}

// Load all movies on page load
document.addEventListener("DOMContentLoaded", async () => {
    displayMovies(await fetchMovies());
});
<!-- Add Supabase Script -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
    // Initialize Supabase
    const supabaseUrl = "https://riwgagiilkmudczczfuw.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dhZ2lpbGttdWRjemN6ZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjYwODksImV4cCI6MjA1OTE0MjA4OX0.0_lciZODhjlzF_tSCLX7egMVodXhDTDU7jK6TphuQUk";
    
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    console.log("✅ Supabase Initialized:", supabase);

    async function fetchMovies() {
        const { data, error } = await supabase.from("movies").select("*");
        
        if (error) {
            console.error("❌ Error Fetching Movies:", error);
        } else {
            console.log("🎬 Movies Fetched:", data);
        }
    }

    fetchMovies();
</script>

