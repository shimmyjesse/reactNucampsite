import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';

const store = ConfigureStore();

// ::NOTES BELOW:: are referencing before implementing redux ::NOTES BELOW::

// We've imported this CAMPSITES array 'from' this file path: './shared/campsites';
// NOW we'll use this { CAMPSITES } array to set up the local state in this App.js ..

            // after import Directory, inside this class 'App' component,
            // we'll render under the </Navbar> component with this syntax:
            //  <Directory />
class App extends Component {
// .. and now we have the data from 'campsites.js' inside of 'App > this.state'
//    Next, we'll pass it down as (props) to the <Directory /> component
//    by setting up a custom attribute: 'campsites={this.state.campsites}'
//    After, refer back to DirectoryComponent.js file to update the render() method
//    by adding this new (props) property from 'class App'.

  render() {
      return (
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Main />
            </div>
          </BrowserRouter>
        </Provider>
      );
  }
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }