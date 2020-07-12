import React from 'react';
import './App.css';
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import Spotify from "../../util/Spotify";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [
                {name: 'Ray', artist: 'Allen', album: 'Sky', id: '132'},
                {name: 'Wei', artist: 'Paul', album: 'Shine', id: '555'},
                {name: 'Fei', artist: 'Alex', album: 'Rose', id: '604'}],
            playlistName: 'Number One Play List',
            playlistTracks: [
                {name: '贝多芬', artist: 'Beethoven', album: 'Piano Sonata No. 14', id:'091'},
                {name: '莫扎特', artist: 'Mozart', album: 'Twelve Variations on Ah vous dirai-je, Maman', id:'847'},
                {name: 'Jay', artist: 'Chou', album: 'November', id: '138'}]
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }
    addTrack(track) {
        let tracks = this.state.playlistTracks;
        if (tracks.find(savedTrack => savedTrack.id !== track.id)) {
            tracks.push(track);
            this.setState({playlistTracks: tracks});
        }
    }
    removeTrack(track) {
        let tracks = this.state.playlistTracks;
        tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
        this.setState({playlistTracks: tracks});
    }
    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }
    savePlaylist() {
        let trackURIs = this.state.playlistTracks.map(track => track.uri);
    }
    search(term) {
       Spotify.search(term).then(returned_searchResults => {
           this.setState({searchResults: returned_searchResults});
       });
    }
    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch = {this.search}/>
                    <div className="App-playlist">
                        <SearchResults searchResults = {this.state.searchResults}
                                        onAdd = {this.addTrack}/>
                        <Playlist   playlistName = {this.state.playlistName}
                                    playlistTracks = {this.state.playlistTracks}
                                    onRemove = {this.removeTrack}
                                    onNameChange = {this.updatePlaylistName}
                                    onSave = {this.savePlaylist}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
