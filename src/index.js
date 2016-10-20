import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Case = (props) => (props.children);
const Default = (props) => (props.children);

class SwitchComponent extends Component {
  render() {
    let elementToRender = null;
    let defaultOption = null;
    const currValue = this.props.val;
    React.Children.forEach(this.props.children, ch => {
      if (ch.props.value === currValue) {
        elementToRender = ch.props.children;
        return;
      }
      if (ch.type === Default) {
        defaultOption = ch.props.children;
      }
    });

    return (
      <div>
        {elementToRender || defaultOption}
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
