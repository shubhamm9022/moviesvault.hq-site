const supabaseUrl = "https://riwgagiilkmudczczfuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd2dhZ2lpbGttdWRjemN6ZnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjYwODksImV4cCI6MjA1OTE0MjA4OX0.0_lciZODhjlzF_tSCLX7egMVodXhDTDU7jK6TphuQUk";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function fetchMovies(category = "all") {
    let query = supabase.from("movies").select("*").order("id", { ascending: false });

    if (category !== "all") {
        query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching movies:", error);
        return;
    }
    displayMovies(data);
}

function displayMovies(movies) {
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = "";
    movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.textContent = movie.title;
        movieDiv.onclick = () => {
            window.location.href = `movie.html?id=${movie.id}`;
        };
        movieList.appendChild(movieDiv);
    });
}

function searchMovies() {
    let query = document.getElementById('search').value.toLowerCase();
    let movies = document.querySelectorAll('.movie');
    movies.forEach(movie => {
        if (movie.textContent.toLowerCase().includes(query)) {
            movie.style.display = 'block';
        } else {
            movie.style.display = 'none';
        }
    });
}

fetchMovies();
