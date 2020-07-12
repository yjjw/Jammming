let accessToken;
const clientID = '';
const rediretURI = "http://localhost:3000/";
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expireInMatch) {
            accessToken = accessTokenMatch[1];
            let expiresIn = expireInMatch[1];
            // Make sure the app won't grab the access token after it has expired
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            // redirect users to the following URL
            const URL =
                `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${rediretURI}`;
            window.location(URL);
        }

    }
};

export default Spotify;
