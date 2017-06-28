import React from 'react';
import underscore from 'underscore';

import FormState from './state';
import {t} from '../../locale';

export default class Form extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onSubmitSuccess: React.PropTypes.func,
    onSubmitError: React.PropTypes.func,
    submitDisabled: React.PropTypes.bool,
    submitLabel: React.PropTypes.string,
    footerClass: React.PropTypes.string,
    extraButton: React.PropTypes.element,
    initialData: React.PropTypes.object
  };

  static defaultProps = {
    submitLabel: t('Save Changes'),
    submitDisabled: false,
    footerClass: 'form-actions align-right',
    className: 'form-stacked'
  };

  static childContextTypes = {
    form: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {...this.props.initialData},
      errors: {},
      initialData: {...this.props.initialData},
      state: FormState.READY
    };
  }

  getChildContext() {
    let {data, errors} = this.state;
    return {
      form: {
        data,
        errors,
        onFieldChange: this.onFieldChange
      }
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.data, this.onSubmitSuccess, this.onSubmitError);
  };

  onSubmitSuccess = data => {
    let curData = this.state.data;
    let newData = {};
    Object.keys(curData).forEach(k => {
      if (data.hasOwnProperty(k)) newData[k] = data[k];
      else newData[k] = curData[k];
    });

    this.setState({
      state: FormState.READY,
      errors: {},
      initialData: newData
    });
    this.props.onSubmitSuccess && this.props.onSubmitSuccess(data);
  };

  onSubmitError = error => {
    this.setState({
      state: FormState.ERROR,
      errors: error.responseJSON
    });
    this.props.onSubmitError && this.props.onSubmitError(error);
  };

  onFieldChange = (name, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };

  render() {
    let isSaving = this.state.state === FormState.SAVING;
    let {initialData, data} = this.state;
    let hasChanges = Object.keys(data).length && !underscore.isEqual(data, initialData);
    return (
      <form onSubmit={this.onSubmit} className={this.props.className}>
        {this.state.state === FormState.ERROR &&
          <div className="alert alert-error alert-block">
            {t(
              'Unable to save your changes. Please ensure all fields are valid and try again.'
            )}
          </div>}
        {this.props.children}
        <div className={this.props.footerClass} style={{marginTop: 25}}>
          <button
            className="btn btn-primary"
            disabled={isSaving || this.props.submitDisabled || !hasChanges}
            type="submit">
            {this.props.submitLabel}
          </button>
          {this.props.extraButton}
        </div>
      </form>
    );
  }
}
