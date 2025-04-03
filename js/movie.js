// ✅ Ensure script runs after page loads
document.addEventListener("DOMContentLoaded", async () => {
    // ✅ Initialize Supabase properly
    const supabaseUrl = "https://riwgagiilkmudczczfuw.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dhZ2lpbGttdWRjemN6ZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjYwODksImV4cCI6MjA1OTE0MjA4OX0.0_lciZODhjlzF_tSCLX7egMVodXhDTDU7jK6TphuQUk"; // Replace with your actual key
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    console.log("✅ Supabase Initialized:", supabase);

    // 🔹 Get Movie Title from URL
    const params = new URLSearchParams(window.location.search);
    const movieSlug = params.get("title");

    if (!movieSlug) {
        console.error("❌ No movie title found in URL");
        document.getElementById("movie-details").innerHTML = "<p>Movie not found.</p>";
        return;
    }

    console.log("🎬 Fetching movie:", movieSlug);

    // 🔹 Fetch Movie Details
    async function fetchMovieDetails() {
        let { data, error } = await supabase
            .from("movies")
            .select("*")
            .ilike("title", `%${movieSlug.replace(/-/g, " ")}%`)
            .single();

        if (error || !data) {
            console.error("❌ Error fetching movie details:", error);
            document.getElementById("movie-details").innerHTML = "<p>Movie details not available.</p>";
            return;
        }

        console.log("🎥 Movie Details:", data);

        // 🔹 Display Movie Details
        document.getElementById("movie-details").innerHTML = `
            <h1>${data.title} (${data.year})</h1>
            <img src="${data.poster}" alt="${data.title}">
            <p><strong>Genre:</strong> ${data.genre}</p>
            <p><strong>Synopsis:</strong> ${data.description}</p>
            <a href="${data.stream_link}" class="btn">Stream Now</a>
            <a href="${data.download_link}" class="btn">Download</a>
        `;
    }

    fetchMovieDetails();
});
