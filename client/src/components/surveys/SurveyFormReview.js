import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';

const SurveyFormReview = ({ onCancel, formValues }) => {
    const reviewFields = _.map(formFields, ({ name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{ formValues[name] }</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            { reviewFields }
            <button
                className="yellow darken-3 btn-flat white-text"
                onClick={onCancel}
            >
            Back
            </button>
            <button className="green btn-flat right white-text">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        // surveyForm is the name we specified in wire up reduxForm with SurveyForm
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps)(SurveyFormReview);
