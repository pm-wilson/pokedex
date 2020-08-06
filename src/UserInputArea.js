import React from 'react';
import request from 'superagent';

class UserInputArea extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault(e);
        this.props.updateFilterData({
            isLoading: true,
        });

        const nameToSearch = e.target.searchName.value,
            typeToSearch = e.target.searchType.value,
            attackFilter = Number(e.target.filterAttack.value),
            defenseFilter = Number(e.target.filterDefense.value),
            data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?perPage=1000${nameToSearch ? '&pokemon=' + nameToSearch : ''}${typeToSearch ? '&type=' + typeToSearch : ''}${attackFilter ? '&attack=' + attackFilter : ''}${defenseFilter ? '&defense=' + defenseFilter : ''}
            `);

        this.props.updateFilterData({
            filteredData: data.body.results,
            isLoading: false,
        });
    }

    render() {
        return (
            <div>
                <h4>Filter Controls</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Search Name</span>
                        <input onChange={this.handleNameSearch} name='searchName' />
                    </label>
                    <label>
                        <span>Search type</span>
                        <input name='searchType' />
                    </label>
                    <label>
                        <span>Filter Attack</span>
                        <input name='filterAttack' type='number' />
                    </label>
                    <label>
                        <span>Filter Defense</span>
                        <input name='filterDefense' type='number' />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default UserInputArea;