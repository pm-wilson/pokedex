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
        searchPage: 1,
        totalPoke: 0,
        totalPerPage: 20,
    }

    HandleStateChange = (obj) => {
        this.setState(obj);
    }

    componentDidUpdate = () => {
        console.log('state', this.state)



    }

    HandleURLChange = (text) => {
        this.props.history.push(text);
    }

    render() {
        const { isLoading } = this.state;
        return (
            <div>{isLoading ? <LoadingSpinner /> :
                <SearchDisplay urlChange={this.HandleURLChange} appState={this.state} updateInputData={this.HandleStateChange} />}</div>
        );
    }
}

export default SearchPage;
