import React from 'react';
import UserInputArea from './UserInputArea';
import BodyArea from './BodyArea';

class SearchDisplay extends React.Component {

    render() {
        return (
            <main>
                <UserInputArea urlChange={this.props.urlChange} appState={this.props} updateInputData={this.props.updateInputData} />
                <BodyArea appState={this.props} filtereData={this.props.filteredData} />
            </main>
        );
    }
}

export default SearchDisplay;