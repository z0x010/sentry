import React from 'react';
import DocumentTitle from 'react-document-title';

import ApiMixin from '../../mixins/apiMixin';

import Project from './project';
import Configure from './configure';
import Next from './next';

import ProgressNodes from './progress';
import {onboardingSteps} from './utils';

const OnboardingWizard = React.createClass({
  mixins: [ApiMixin],

  getInitialState() {
    return {
      loading: true,
      error: false,
      options: {},
      step: onboardingSteps.project,
      platform: null
    };
  },

  componentWillMount() {
    this.fetchData();
  },

  renderStep() {
    const props = {
      next: this.next,
      platform: this.state.platform,
      setPlatform: p => this.setState({platform: p})
    };
    return (
      <div>
        {
          //eslint-disable-next-line react/jsx-key
          [<Project {...props} />, <Configure {...props} />, <Next {...props} />][
            this.state.step
          ]
        }
      </div>
    );
  },

  fetchData(callback) {
    this.api.request('/internal/options/?query=is:required', {
      method: 'GET',
      success: data => {
        this.setState({
          options: data,
          loading: false,
          error: false
        });
      },
      error: () => {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  },

  next() {
    this.setState({step: this.state.step + 1});
  },

  render() {
    return (
      <div>
        <DocumentTitle title={'Sentry'} />
        <h1>ONBOARDING</h1>
        <div className="onboarding-container">

          <ProgressNodes step={this.state.step} />
          <div
            className="btn"
            onClick={() => {
              this.setState({step: this.state.step + 1});
            }}
          />
          <div>
            <this.renderStep />
          </div>
        </div>
      </div>
    );
  }
});

export default OnboardingWizard;
