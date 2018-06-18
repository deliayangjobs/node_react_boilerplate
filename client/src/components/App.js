import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// connect give components ability to call action creators
import { connect } from 'react-redux';
// actions, all action creators we have
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
            {/* browserrouter expect at most one child */}
            <div className="container">
                {/* so header always show */}
                <Header />
                {/* /surveys match / as well, will show both components
                use exact='{true} to match exactly same as exact
                <Route exact={true} path="/" component={Landing} /> */}
                <Route exact path="/" component={Landing} />
                <Route exact path="/surveys" component={Dashboard} />
                <Route path="/surveys/new" component={SurveyNew} />
            </div>
            </BrowserRouter>
            );
    }
};

// arg1: mapStateToProps, all actions will be available in App props
// this.props.fetchUser();
export default connect(null, actions)(App);
