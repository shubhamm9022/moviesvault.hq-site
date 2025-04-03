<!-- Add Supabase SDK (Place in HTML before using Supabase) -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
    // Initialize Supabase
    const supabaseUrl = "https://riwgagiilkmudczczfuw.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dhZ2lpbGttdWRjemN6ZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjYwODksImV4cCI6MjA1OTE0MjA4OX0.0_lciZODhjlzF_tSCLX7egMVodXhDTDU7jK6TphuQUk";
    
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    console.log("✅ Supabase Initialized:", supabase);

    // Get movie slug from URL
    function getMovieSlug() {
        const parts = window.location.pathname.split("/");
        return parts.pop() || parts.pop(); // Handles trailing slashes
    }

    // Fetch and display movie details
    async function fetchMovieDetails() {
        const movieSlug = getMovieSlug().replace(/-/g, ' ');

        console.log("🔍 Searching for movie:", movieSlug);

        // Fetch the movie from Supabase
        const { data, error } = await supabase
            .from("movies")
            .select("*")
            .ilike("title", `%${movieSlug}%`) // Allow partial match
            .limit(1) // Only get one movie
            .single();

        if (error || !data) {
            console.error("❌ Movie not found:", error);
            document.getElementById("movie-details").innerHTML = "<p>Movie not found.</p>";
            return;
        }

        console.log("🎬 Movie Found:", data);

        document.getElementById("movie-details").innerHTML = `
            <h1>${data.title} (${data.year})</h1>
            <img src="${data.poster_url}" alt="${data.title}">
            <p>${data.description}</p>
            <a href="${data.stream_link}" target="_blank"><button>Stream</button></a>
            <a href="${data.download_link}" target="_blank"><button>Download</button></a>
        `;
    }

    document.addEventListener("DOMContentLoaded", fetchMovieDetails);
</script>
