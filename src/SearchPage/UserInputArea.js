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

        const urlParamData = this.getParamData(),
            pageNumber = urlParamData[0],
            category = urlParamData[1],
            search = urlParamData[2];

        const useCategory = searchCategory,
            usePage = searchPage,
            useText = searchText;

        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${usePage}&perPage=${totalPerPage}${useText ? '&' + useCategory + '=' + useText : ''}`),
            pokeData = data.body.results;

        this.props.updateInputData({
            filteredData: pokeData,
            isLoading: false,
            totalPoke: data.body.count,
        });

        this.props.urlChange(`?page=${usePage}${useText ? '&category=' + useCategory + '&search=' + useText : ''}`);
    }

    getParamData = () => {
        const urlInfo = this.props.appState.pageLocation,
            dataAndArray = urlInfo.split('&'),
            dataEqualArray = dataAndArray.map((arrayItem) => {
                const currentArrayItem = arrayItem.split('=');
                return currentArrayItem[1];
            });
        return dataEqualArray


        // const urlParamData = this.getParamData(),
        //     pageNumber = urlParamData[0],
        //     category = urlParamData[1],
        //     search = urlParamData[2];
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
        const { searchText, searchCategory, searchPage } = this.props.appState.appState;
        const urlParamData = this.getParamData(),
            pageNumber = urlParamData[0],
            category = urlParamData[1],
            search = urlParamData[2];

        if (searchText !== search && searchCategory !== category && searchPage !== pageNumber) {
            if (pageNumber) {
                await this.props.updateInputData({
                    searchPage: pageNumber,
                });
            }
            if (pageNumber && category && search) {
                await this.props.updateInputData({
                    searchCategory: category,
                    searchText: search,
                });
            }
        }
        console.log('there', searchText, search, searchCategory, category, searchPage, pageNumber)

        const getFirstData = async () => {
            this.fetchData();
        }
        if (this.props.appState.appState.filteredData.length === 0) {
            getFirstData();
        }
        console.log("component mount")
        console.log('state on app', this.props.appState.appState)
    }



    handlePageUp = async () => {
        const page = Number(this.props.appState.appState.searchPage),
            newPage = page + 1;

        await this.props.updateInputData({
            searchPage: newPage,
        })
        this.props.urlChange({

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