import React from 'react';
import {onboardingSteps} from './utils';
import PlatformPicker from './platformpicker';
import ApiMixin from '../../mixins/apiMixin';

import TextField from '../../components/forms/textField';

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

  steps: Object.keys(onboardingSteps),
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
        <h4>Project Name</h4>
        <div style={{display: 'flex'}}>
          <TextField
            key="name"
            name="name"
            label="Name"
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
