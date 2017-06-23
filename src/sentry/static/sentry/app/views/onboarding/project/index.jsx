import React from 'react';
import PlatformPicker from './platformpicker';
import ApiMixin from '../../../mixins/apiMixin';

import TextField from '../../../components/forms/textField';

const Project = React.createClass({
  propTypes: {
    next: React.PropTypes.func,
    setPlatform: React.PropTypes.func,
    platform: React.PropTypes.string
  },

  mixins: [ApiMixin],
  getInitialState() {
    return {
      name: React.PropTypes.string
    };
  },

  submit() {
    this.api.request('/internal/options/?query=is:required', {
      method: 'GET',
      success: data => {
        this.setState({
          options: data,
          loading: false,
          error: false
        });
        console.log(data);
        this.props.next();
      },
      error: () => {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  },

  render() {
    return (
      <div className="onboarding-info">
        <h2>Select a language or framework</h2>
        <PlatformPicker {...this.props} />
        <div style={{display: 'flex'}}>
          <div className="client-platform-list">
            <span className={`platformicon platformicon-${this.props.platform}`} />
            <span
              className={`platformicon  platformicon-${this.props.platform.split('-')[0]}`}
            />
          </div>

          <TextField
            key="name"
            name="name"
            label="Project Name"
            placeholder="project name"
            required={true}
            onChange={e => {
              this.setState({name: e});
            }}
          />
          <div className="btn btn-primary" onClick={this.submit}>
            next step
          </div>
        </div>
      </div>
    );
  }
});

export default Project;
