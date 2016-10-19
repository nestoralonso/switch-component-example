import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Case = (props) => (props.children);
const Default = (props) => (props.children);

class SwitchComponent extends Component {
  render() {
    let elementToRender = null;
    const currValue = this.props.val;
    const children = React.Children.toArray(this.props.children);

    const selChildren = children
        .filter(ch => ch.props.value === currValue)
        .map(ch => ch.props.children);

    if (selChildren.length > 0) {
      elementToRender = selChildren[0];
    } else {
      const defaultOpt = children
        .filter(ch => ch.type === Default)
        .map(ch => ch.props.children);

      elementToRender = defaultOpt.length > 0 ? defaultOpt[0] : null;
    }

    return (
      <div>
        {elementToRender}
      </div>
    );
  }
}

class App extends Component {

  state = {
    option: 's',
  }

  handleChange = (e) => {
    const option = e.target.value.length > 0 ? e.target.value[0] : '';
    this.setState({ option });
  }

  render() {
    return (
      <div>
        <label>
          Your choice (options: s, c, n):<br/>
          <input type="text" value={this.state.option} onChange={this.handleChange} />
        </label>

        <h2>Result</h2>
        <SwitchComponent val={this.state.option}>
          <Case value='s'>
            Silas
          </Case>
          <Case value='c'>
            Chelas
          </Case>
          <Case value='n'>
            Nolas
          </Case>
          <Default>
            Depende
          </Default>
        </SwitchComponent>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
