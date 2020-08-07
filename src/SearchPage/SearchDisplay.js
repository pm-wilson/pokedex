import React from 'react';
import UserInputArea from './UserInputArea';
import BodyArea from './BodyArea';

class SearchDisplay extends React.Component {

    render() {
        return (
            <main>
                <UserInputArea appState={this.state} updateInputData={this.HandleStateChange} />
                <BodyArea appState={this.state} filtereData={this.state.filteredData} />
            </main>
        );
    }
}

export default SearchDisplay;