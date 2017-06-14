import React from 'react';
import TextField from '../../components/forms/textField';
import ListLink from '../../components/listLink';
import {platforms} from '../../../../..//integration-docs/_platforms.json';
const categoryList = ['Popular', 'Frontend', 'Backend', 'Mobile', 'All'];

const flattened = [].concat.apply(
  [],
  platforms.map(id => {
    return id.integrations;
  })
);

const PlatFormPicker = React.createClass({
  getInitialState() {
    return {
      tab: categoryList[0],
      filter: ''
    };
  },

  renderPlatformList() {
    return (
      <div className="platform-tiles">
        {flattened.map((platform, idx) => {
          return (
            <div
              className="platform-tile"
              key={idx}
              onClick={() => {
                this.setState({platform: idx});
              }}>
              {platform.name}
            </div>
          );
        })}
      </div>
    );
  },

  render() {
    return (
      <div className="platform-picker">
        <ul className="nav nav-tabs">
          {categoryList.map(c => {
            return (
              <ListLink
                key={c}
                onClick={e => {
                  this.setState({tab: c});
                  e.preventDefault();
                }}
                isActive={() => c === this.state.tab}>
                {c}
              </ListLink>
            );
          })}
          <li>
            <TextField
              className="platform-filter"
              name="filter"
              placeholder="Filter"
              onChange={e => this.setState({filter: e.target.value})}
            />
          </li>
        </ul>
        {this.renderPlatformList()}
      </div>
    );
  }
});

export default PlatFormPicker;
