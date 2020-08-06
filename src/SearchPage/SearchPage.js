import React from 'react';
import '../App.css';
import FooterArea from './FooterArea';
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
                <FooterArea />
            </main>
        );
    }

}

export default SearchPage;
