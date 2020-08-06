import React from 'react';
import './App.css';
import HeaderArea from './HeaderArea';
import FooterArea from './FooterArea';
import UserInputArea from './UserInputArea';
import BodyArea from './BodyArea';

class App extends React.Component {
  state = {
    filteredData: [],
    isLoading: false,
    searchText: '',
    searchCategory: 'pokemon',
  }

  HandleStateChange = (obj) => {
    this.setState(obj)
  }

  render() {
    console.log("app state", this.state)

    return (
      <main>
        <HeaderArea />
        <UserInputArea appState={this.state} updateInputData={this.HandleStateChange} />
        <BodyArea filtereData={this.state.filteredData} />
        <FooterArea />
      </main>
    );
  }

}

export default App;
