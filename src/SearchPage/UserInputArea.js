import React from 'react';
import request from 'superagent';

class UserInputArea extends React.Component {
    handleSubmit = async (e) => {
        e && e.preventDefault(e);
        this.fetchData();

        this.props.updateInputData({
            searchPage: 1,
        })
    }

    fetchData = async () => {
        this.props.updateInputData({
            isLoading: true,
        });

        const { searchText, searchCategory, searchPage, totalPerPage } = this.props.appState.appState;

        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${searchPage}&perPage=${totalPerPage}${searchText ? '&' + searchCategory + '=' + searchText : ''}`),
            pokeData = data.body.results;

        this.props.updateInputData({
            filteredData: pokeData,
            isLoading: false,
            totalPoke: Number(data.body.count),
        });

        this.props.urlChange(`?page=${searchPage}${searchText ? '&category=' + searchCategory + '&search=' + searchText : ''}`);
        console.log('fetch')
    }

    handleSearchText = (e) => {
        this.props.updateInputData({
            searchText: e.target.value
        })
    }

    handleSearchCategory = (e) => {
        this.props.updateInputData({
            searchCategory: e.target.value
        })
    }

    getQueryParams = this.props.getQueryParams.bind(this)

    componentDidMount = async () => {

        const { searchText, searchCategory, searchPage } = this.props.appState.appState,
            pageNumber = this.getQueryParams("page"),
            category = this.getQueryParams("page"),
            search = this.getQueryParams("page");

        console.log('state pcs', searchPage, searchCategory, searchText)
        console.log('dm pcs', pageNumber, category, search)
        console.log('pageequal', searchPage === pageNumber, searchPage, pageNumber)
        console.log('if statemnt', searchText !== search && searchCategory !== category && searchPage !== pageNumber)


        //if (searchText !== search && searchCategory !== category && searchPage !== pageNumber) {
        // if (pageNumber) {
        //     await this.props.updateInputData({
        //         searchPage: Number(pageNumber),
        //     });
        // }
        // if (pageNumber && category && search) {
        //     await this.props.updateInputData({
        //         searchCategory: category,
        //         searchText: search,
        //     });
        // }
        // }

        if (this.props.appState.appState.filteredData.length === 0) {
            await this.fetchData();
            console.log('didmount fetch')
        }
        console.log('didmount')
    }

    handlePageUp = async () => {
        const page = Number(this.props.appState.appState.searchPage),
            newPage = page + 1;

        await this.props.updateInputData({
            searchPage: Number(newPage),
        })

        await this.fetchData();
    }

    handlePageDown = async () => {
        const page = Number(this.props.appState.appState.searchPage),
            newPage = page - 1;

        await this.props.updateInputData({
            searchPage: Number(newPage),
        })
        await this.fetchData();
    }

    render() {
        const { totalPoke, totalPerPage, searchPage, searchText } = this.props.appState.appState,
            pagesTotal = Math.ceil(totalPoke / totalPerPage);

        return (
            <div className='user-input'>
                <h4>Filter Controls</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Search for:</span>
                        <input onChange={this.handleSearchText} name='searchName' value={searchText} />
                    </label>
                    <label>
                        <span>by</span>
                        <select onChange={this.handleSearchCategory} name='category'>
                            <option value='pokemon'>name</option>
                            <option value='type'>type</option>
                            <option value='attack'>attack</option>
                            <option value='defense'>defense</option>
                        </select>
                    </label>
                    <button>Submit</button>
                </form>
                <div className='move-page'>
                    {searchPage === pagesTotal ? <div></div> : <button onClick={this.handlePageUp}>Page +</button>}
                    <div>Page {searchPage} of {pagesTotal}</div>
                    {searchPage === 1 ? <div></div> : <button onClick={this.handlePageDown}>Page -</button>}
                </div>
            </div>
        );
    }
}

export default UserInputArea;