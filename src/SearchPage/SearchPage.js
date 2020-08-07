import React from 'react';
import '../App.css';
import LoadingSpinner from './LoadingSpinner';
import SearchDisplay from './SearchDisplay';
import request from 'superagent';

class SearchPage extends React.Component {
    state = {
        filteredData: [],
        isLoading: false,
        searchText: '',
        searchCategory: 'pokemon',
        searchPage: 1,
        totalPoke: 0,
    }

    HandleStateChange = (obj) => {
        this.setState(obj);
    }

    componentDidUpdate = () => {
        console.log('state', this.state)
    }



    componentDidMount = async () => {
        const check = this.props.match.params;

        console.log('check', check)

    }




    render() {
        const { isLoading } = this.state;
        return (
            <div>{isLoading ? <LoadingSpinner /> :
                <SearchDisplay appState={this.state} updateInputData={this.HandleStateChange} />}</div>
        );
    }
}

export default SearchPage;
