import React from 'react';
import {onboardingSteps} from './utils';
import PlatformPicker from './platformpicker';

import TextField from '../../components/forms/textField';

const Project = React.createClass({
  getInitialState() {
    return {
      email: ''
    };
  },

  steps: Object.keys(onboardingSteps),

  render() {
    return (
      <div className="onboarding-info">
        <h2>Select a language or framework</h2>
        <PlatformPicker />
        <h4>Project Name</h4>
        <TextField name="email" />

      </div>
    );
  }
});

export default Project;
