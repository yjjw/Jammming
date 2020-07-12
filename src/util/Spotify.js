let accessToken;
const clientID = '';
const rediretURI = "http://localhost:3000/";
const Spotify = {
    getAccessToken() {
        // accessToken not empty
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);
        // accessToken empty but in the URI
        if (accessTokenMatch && expireInMatch) {
            accessToken = accessTokenMatch[1];
            let expiresIn = expireInMatch[1];
            // Make sure the app won't grab the access token after it has expired
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/'); // this wipes the parameters and allow us
                                                                            // to grab new access token when it expires
            return accessToken;
        } else { // accessToken empty and not in URI
            // redirect users to the following URL
            const URL =
                `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${rediretURI}`;
            window.location(URL);
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization: `Bear ${accessToken}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.track) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                uri: track.uri
            }));
        })
    }
};

export default Spotify;
