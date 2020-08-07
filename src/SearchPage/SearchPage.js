import React from 'react';
import '../App.css';
import UserInputArea from './UserInputArea';
import BodyArea from './BodyArea';

class SearchPage extends React.Component {
    state = {
        filteredData: [],
        isLoading: false,
        searchText: '',
        searchCategory: 'pokemon',
    }

    HandleStateChange = (obj) => {
        this.setState(obj)
    }

    render() {
        return (
            <main>
                <UserInputArea appState={this.state} updateInputData={this.HandleStateChange} />
                <BodyArea appState={this.state} filtereData={this.state.filteredData} />
            </main>
        );
    }

}

export default SearchPage;
