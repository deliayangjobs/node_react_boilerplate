import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return (
                <SurveyFormReview
                    onCancel={() => this.setState({ showFormReview: false })}
                />
            );
        }
        return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })}/>;
    }

    render() {
        return (
            <div>
                { this.renderContent() }
            </div>
        );
    }
}

// back to step 1, still see user inputs
// cancel to add survey again, clear user inputs
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);
