import React from 'react';
import request from 'superagent';

class UserInputArea extends React.Component {
    handleSubmit = async (e) => {
        e && e.preventDefault(e);
        this.fetchData();
    }

    fetchData = async () => {
        this.props.updateInputData({
            isLoading: true,
        });

        const { searchPage } = this.props.appState;
        const { searchText, searchCategory } = this.props.appState.appState;
        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${searchPage}perPage=20${searchText ? '&' + searchCategory + '=' + searchText : ''}`),
            pokeData = data.body.results;

        this.props.updateInputData({
            filteredData: pokeData,
            isLoading: false,
            totalPoke: data.body.count,
        });
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

    componentDidMount = () => {
        const getFirstData = async () => {
            this.fetchData();
        }
        if (this.props.appState.appState.filteredData.length === 0) {
            getFirstData();
        }
    }

    pageUp = () => {
        this.props.updateInputData({
            searchPage: this.props.searchPage + 1,
        })
    }

    pageUp = () => {
        this.props.updateInputData({
            searchPage: this.props.searchPage - 1,
        })
    }

    render() {
        return (
            <div className='user-input'>
                <h4>Filter Controls</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Search for:</span>
                        <input onChange={this.handleSearchText} name='searchName' />
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
                <div>
                    <button className='margin-top' onChange={this.pageUp}>Page +</button>
                    <div>1</div>
                    <button onChange={this.pageDown}>Page -</button>
                </div>
            </div>
        );
    }
}

export default UserInputArea;