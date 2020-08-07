import React from 'react';
import '../App.css';
import LoadingSpinner from './LoadingSpinner';
import SearchDisplay from './SearchDisplay';

class SearchPage extends React.Component {
    state = {
        filteredData: [],
        isLoading: false,
        searchText: '',
        searchCategory: 'pokemon',
    }

    HandleStateChange = (obj) => {
        this.setState(obj);
    }

    render() {
        const { isLoading } = this.state;
        console.log('state', this.state)
        return (
            <div>{isLoading ? <LoadingSpinner /> :
                <SearchDisplay appState={this.state} updateInputData={this.HandleStateChange} />}</div>
        );
    }
}

export default SearchPage;
