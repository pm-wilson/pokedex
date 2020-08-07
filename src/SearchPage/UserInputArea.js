import React from 'react';
import request from 'superagent';

class UserInputArea extends React.Component {
    handleSubmit = async (e) => {
        e && e.preventDefault(e);
        this.props.updateInputData({
            isLoading: true,
        });

        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?perPage=1000${this.props.appState.searchText ? '&' + this.props.appState.searchCategory + '=' + this.props.appState.searchText : ''}`),
            pokeData = data.body.results,
            sortedPokeData = pokeData.sort(function (a, b) {
                let first = a.pokemon,
                    second = b.pokemon;

                if (first < second) {
                    return -1;
                } else if (second < first) {
                    return 1;
                }
                return 0;
            })

        this.props.updateInputData({
            filteredData: sortedPokeData,
            isLoading: false,
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
        this.handleSubmit();
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
}

export default UserInputArea;