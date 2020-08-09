import React from 'react';
import '../App.css';
import LoadingSpinner from './LoadingSpinner';
import SearchDisplay from './SearchDisplay';

class SearchPage extends React.Component {

    getQueryParams = (paramName) => {
        const urlInfo = window.location.search; // <- need to update functional context when using from  
        // const urlInfo = this.props.search.location,
        if (!urlInfo || (urlInfo && urlInfo.length === 0)) { return null }
        const dataAndArray = urlInfo.split('&'),
            dataEqualArray = dataAndArray.map((arrayItem, index) => {
                const currentArrayItem = arrayItem.split('=');
                const paramName = index === 0 ? currentArrayItem[0].slice(1, currentArrayItem[0].length) : currentArrayItem[0]
                return { paramName: [paramName], paramValue: currentArrayItem[1] };
            });

        const desiredParam = dataEqualArray.find(item => item.paramName === paramName)

        return desiredParam ? desiredParam : null
    }

    state = {
        filteredData: [],
        isLoading: false,
        searchCategory: 'pokemon',
        searchPage: this.getQueryParams("page") ? this.getQueryParams("page") : 1,
        searchText: '',
        totalPoke: 0,
        totalPerPage: 20,
    }

    // componentDidMount = async () => {
    //     const { searchText, searchCategory, searchPage } = this.state;
    //     const urlParamData = this.getParamData(),
    //         pageNumber = urlParamData[0],
    //         category = urlParamData[1],
    //         search = urlParamData[2];

    //     if (searchText !== search && searchCategory !== category && searchPage !== pageNumber) {
    //         if (pageNumber) {
    //             await this.setState({
    //                 searchPage: Number(pageNumber),
    //             });
    //         }
    //         console.log('dm pcs', pageNumber, category, search)
    //         if (pageNumber && category && search) {
    //             await this.setState({
    //                 searchCategory: category,
    //                 searchText: search,
    //             });
    //         }
    //     }


    //     console.log('state', this.state)
    // }

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
