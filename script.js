document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const icon = document.getElementById("darkModeIcon");
    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon-o");
        icon.classList.add("fa-sun-o");
    } else {
        icon.classList.remove("fa-sun-o");
        icon.classList.add("fa-moon-o");
    }
});

const clientId = '2316d3c21bdc40e39e5e732bd26a86fd'; 
const clientSecret = 'f8945651439142f2b509f10ff146fdff'; 

async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(clientId + ':' + clientSecret)}`
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}

async function fetchFavoriteTracks() {
    const token = await getAccessToken();

    const response = await fetch('https://open.spotify.com/playlist/75ZmVhWywVOkn1dg8hoLDT?si=bbd3162f41d546b1', { 
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    const tracks = data.items.map(item => {
        const track = item.track;
        return {
            name: track.name,
            artist: track.artists[0].name,
            albumCover: track.album.images[2]?.url || '',
            url: track.external_urls.spotify
        };
    });

    displayTracks(tracks);
}

function displayTracks(tracks) {
    const spotifyMusicDiv = document.getElementById('spotify-music');
    spotifyMusicDiv.innerHTML = '';

    tracks.forEach(track => {
        const trackDiv = document.createElement('div');
        trackDiv.classList.add('spotify-track');

        trackDiv.innerHTML = `
            <img src="${track.albumCover}" alt="Album Cover">
            <div>
                <p><strong>${track.name}</strong> by ${track.artist}</p>
                <a href="${track.url}" target="_blank">Listen on Spotify</a>
            </div>
        `;

        spotifyMusicDiv.appendChild(trackDiv);
    });
}

fetchFavoriteTracks();
