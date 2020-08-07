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
        this.setState(obj)
    }

    render() {
        const { loading } = this.state.isLoading;

        return (
            { loading?<LoadingSpinner /> : <SearchDisplay />
    }
        );
}
}

export default SearchPage;
