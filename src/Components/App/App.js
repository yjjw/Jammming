import React from 'react';
import './App.css';
import SearchResults from "../SearchResults/SearchResults";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [
                {name: 'Ray', artist: 'Allen', album: 'sky', id: '132'},
                {name: 'Wei', artist: 'Paul', album: 'shine', id: '555'},
                {name: 'Fei', artist: 'Alex', album: 'Rose', id: '604'}]
        }
    }
    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    {/*<SearchBar />*/}
                    <div className="App-playlist">
                        <SearchResults searchResults = {this.state.searchResults}/>
                        {/*<Playlist />*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
