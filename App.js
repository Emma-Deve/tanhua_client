import React, { Component } from 'react';
import { View } from 'react-native';
import Nav from "./src/nav";
import Geo from "./src/utils/Geo";
import RootStore from "./src/mobx";
import { Provider } from "mobx-react";
class App extends Component {
  state = {
    isInitGeo: false
  }
  async componentDidMount() {
    await Geo.initGeo();
    this.setState({ isInitGeo: true });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider RootStore={RootStore} >
          {this.state.isInitGeo ? <Nav></Nav> : <></>}
        </Provider>
      </View>
    );
  }
}
export default App;