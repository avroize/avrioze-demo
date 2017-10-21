import React from "react";
import "../styles/Avroize.css"
import greenCheckBox from "../images/green-checkbox.png";
import redCheckBox from "../images/red-checkbox.png";

import avsc from "avsc";

export default class Avroize extends React.Component {
    constructor() {
        super();
        this.state = {
            validJSON: null,
            validSchema: null
        };

        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleSchemaChange = this.handleSchemaChange.bind(this);
    }

    handleDataChange(event) {
        const data = event.target.value;

        if (data.length === 0) {
            this.setState({
                validJSON: null
            });
        } else {
            try {
                const value = JSON.parse(data);
                console.log(value);
                this.setState({
                    validJSON: true
                });

            } catch (e) {
                this.setState({
                    validJSON: false
                });
            }
        }
    }

    handleSchemaChange(event) {
        const schema = event.target.value;

        if (schema.length === 0) {
            this.setState({
                validSchema: null
            });
        } else {
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
    }

    render() {
        let jsonImage = null;
        if (this.state.validJSON !== null) {
            jsonImage = this.state.validJSON ? <img src={greenCheckBox} /> : <img src={redCheckBox}/>;
        }

        let schemaImage = null;
        if (this.state.validSchema !== null) {
            schemaImage = this.state.validSchema ? <img src={greenCheckBox} /> : <img src={redCheckBox}/>;
        }

        return (
            <div className="avroize">
                <h1 className="title">Avroize</h1>

                <div>
                    <h3>Avro schema</h3>
                    <textarea placeholder="<< insert schema here >>" onChange={this.handleSchemaChange} />
                    {schemaImage}
                </div>

                <div>
                    <h3>Data</h3>
                    <textarea placeholder="<< insert data here >>" onChange={this.handleDataChange} />
                    {jsonImage}
                </div>
            </div>
        );
    }
}