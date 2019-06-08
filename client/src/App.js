import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions/actionTypes";

import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import BlogNew from "./components/Blogs/BlogNew/BlogNew";

class App extends Component {
    componentDidMount() {}

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                    </div>
                    <Switch>
                        <Route path="/blogs/new" component={BlogNew} />
                        <Route path="/blogs" component={Dashboard} />
                        <Route path="/" component={Dashboard} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(
    null,
    actions
)(App);
