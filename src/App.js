import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import SearchPage from './SearchPage/SearchPage.js';
import DetailPage from './DetailPage/DetailPage.js';
import HeaderArea from './HeaderArea';
import FooterArea from './FooterArea';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <HeaderArea />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <SearchPage {...routerProps} />}
            />
            <Route
              path="/DetailPage/:myId"
              exact
              render={(routerProps) => <DetailPage {...routerProps} />}
            />
          </Switch>
          <FooterArea />
        </Router>
      </div>
    )
  }
}
