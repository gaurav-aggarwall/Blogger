import React, { Component } from "react";
import { reduxForm } from "redux-form";

class BlogNew extends Component {
    renderContent() {
        return (
            <h1>Hello</h1>
        );
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default reduxForm({
    form: "blogForm"
})(BlogNew);
