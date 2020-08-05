import React from 'react';
import request from 'superagent';

class UserInputArea extends React.Component {

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.updateFilterData({
            isLoading: true,
        })

        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex/5cef3501ef6005a77cd4fd33`);

        this.props.updateFilterData({
            isLoading: false,

        })

        console.log('data', data.body);
    }

    render() {
        return (
            <div>
                <h4>Filter Controls</h4>
                <form>
                    <label>
                        <span>Search Name</span>
                        <input />
                    </label>
                    <label>
                        <span>Search type</span>
                        <input />
                    </label>
                    <label>
                        <span>Filter Attack</span>
                        <input />
                    </label>
                    <label>
                        <span>Filter Defense</span>
                        <input />
                    </label>
                    <button onSubmit={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default UserInputArea;