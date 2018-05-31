import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>Survey New</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
    return (
        <div>
            {/* browserrouter expect at most one child */}
            <BrowserRouter>
            <div>
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
        </div>
    );
};

export default App;
