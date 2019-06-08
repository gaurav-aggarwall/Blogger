import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions/actionTypes";

import Header from "./components/Header/Header";

class App extends Component {
    componentDidMount(){
        
    }

    render(){
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App);