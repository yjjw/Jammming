let accessToken;
const clientID = "f0458ed199364634b85093cd02991b8a";
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
            const URL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${rediretURI}`;
            window.location = URL;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            console.log('revoked 3');
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                uri: track.uri
            }));
        })
    },
    /*
    savePlaylist(playlistName, trackURIs) {
        if (playlistName && trackURIs.length) {
            const accessToken = Spotify.getAccessToken();
            const headers = {Authorization:`Bear ${accessToken}`};
            let userID;
            return fetch('https://api.spotify.com/v1/me\n', {headers: headers}
            ).then(response => response.json()
            ).then(jsonResponse => {
                userID = jsonResponse.id;
                return fetch(`/v1/users/${userID}/playlists`,
                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({name: playlistName})
                        }).then(response => response.json()
                        ).then(jsonResponse => {
                            const playlistID = jsonResponse.id;
                            return fetch(`/v1/users/${userID}/playlists/${playlistID}/tracks`,
                                {
                                    headers: headers,
                                    method: 'POST',
                                    body: JSON.stringify({uris: trackURIs})
                                })
                })
            })
        }
    }

     */
};

export default Spotify;
