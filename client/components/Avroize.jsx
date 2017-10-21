import React from "react";
import "../styles/Avroize.css"
import greenCheckBox from "../images/green-checkbox.png";
import redCheckBox from "../images/red-checkbox.png";

import avsc from "avsc";

export default class Avroize extends React.Component {
    constructor() {
        super();
        this.state = {
            validSchema: null
        };

        this.handleSchemaChange = this.handleSchemaChange.bind(this);
    }

    handleSchemaChange(event) {
        const schema = event.target.value;
        try {
            avsc.parse(schema);
            this.setState({
                validSchema: true
            });

        } catch (e) {
            this.setState({
                validSchema: false
            });
        }
    }

    render() {
        return (
            <div className="avroize">
                <h1 className="title">Avroize</h1>

                <div>
                    <h3>Avro schema</h3>
                    <textarea placeholder="<< insert schema here >>" onChange={this.handleSchemaChange} />
                    { this.state.validSchema ? <img src={greenCheckBox} /> : <img src={redCheckBox} /> }
                </div>

                <div>
                    <h3>Data</h3>
                    <textarea placeholder="<< insert schema here >>" />
                </div>
            </div>
        );
    }
}