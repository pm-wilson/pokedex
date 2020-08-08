import React from 'react';
import request from 'superagent';

class UserInputArea extends React.Component {
    handleSubmit = async (e) => {
        e && e.preventDefault(e);
        this.fetchData();

        this.props.updateInputData({
            searchPage: 1
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
            totalPoke: data.body.count,
        });



        this.props.urlChange(`?page=${searchPage}${searchText ? '&' + searchCategory + '=' + searchText : ''}`)

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

    componentDidMount = async () => {
        const getFirstData = async () => {
            this.fetchData();
        }
        if (this.props.appState.appState.filteredData.length === 0) {
            getFirstData();
        }
    }

    handlePageUp = async () => {
        const page = Number(this.props.appState.appState.searchPage),
            newPage = page + 1;

        await this.props.updateInputData({
            searchPage: newPage,
        })
        this.fetchData();
    }

    handlePageDown = async () => {
        const page = Number(this.props.appState.appState.searchPage),
            newPage = page - 1;

        await this.props.updateInputData({
            searchPage: newPage,
        })
        this.fetchData();
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