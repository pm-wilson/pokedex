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
    searchOption: 'pokemon',
    searchText: '',
  }

  HandleStateChange = (obj) => {
    this.setState(obj)
  }

  render() {
    return (
      <main>
        <HeaderArea />
        <UserInputArea updateFilterData={this.HandleStateChange} />
        <BodyArea filtereData={this.state.filteredData} />
        <FooterArea />
      </main>
    );
  }

}

export default App;
