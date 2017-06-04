import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.scss';
const reactLogo = require('./assets/images/react.png');


injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <div>
      <img src={reactLogo} alt="logo" width="400" />
      <RaisedButton label="Default" />
    </div>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
