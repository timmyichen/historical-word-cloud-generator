import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <App />
    );
  }
}

render(<Index />, document.getElementById('app'));