import React from 'react';
import '../App.css';
import LoadingSpinner from './LoadingSpinner';
import SearchDisplay from './SearchDisplay';

class SearchPage extends React.Component {
    getQueryParams = (paramName) => {
        const urlInfo = window.location.search;
        if (!urlInfo || (urlInfo && urlInfo.length === 0)) { return null }
        const dataAndArray = urlInfo.split('&'),
            dataEqualArray = dataAndArray.map((arrayItem, index) => {
                const currentArrayItem = arrayItem.split('=');
                const paramName = index === 0 ? currentArrayItem[0].slice(1, currentArrayItem[0].length) : currentArrayItem[0];

                return { paramName: paramName, paramValue: currentArrayItem[1] };
            });
        const desiredParam = dataEqualArray.find(item => item.paramName === paramName);

        return desiredParam ? desiredParam.paramValue : null;
    }

    state = {
        filteredData: [],
        isLoading: false,
        searchCategory: this.getQueryParams('category') && this.getQueryParams('search') ? this.getQueryParams('category') : 'pokemon',
        searchPage: this.getQueryParams('page') ? this.getQueryParams('page') : 1,
        searchText: this.getQueryParams('category') && this.getQueryParams('page') ? this.getQueryParams('search') : '',
        totalPoke: 0,
        totalPerPage: 20,
    }

    HandleStateChange = (obj) => {
        this.setState(obj);
    }

    HandleURLChange = (text) => {
        this.props.history.push(text);
    }

    render() {
        const { isLoading } = this.state;
        return (
            <div>{isLoading ? <LoadingSpinner /> :
                <SearchDisplay getQueryParams={this.getQueryParams} pageLocation={this.props.location.search} updateParams={this.UpdateSearchParams} urlChange={this.HandleURLChange} appState={this.state} updateInputData={this.HandleStateChange} />}</div>
        );
    }
}

export default SearchPage;
