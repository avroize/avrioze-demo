import React from "react";
import ReactJson from 'react-json-view';
import {getJSONAvroizer} from 'avroize-es6';
import "../styles/Avroize.css";
import greenCheckBox from "../images/green-checkbox.png";
import redCheckBox from "../images/red-checkbox.png";

import avsc from "avsc";

export default class Avroize extends React.Component {
    constructor() {
        super();
        this.state = {
            avroizedJSON: null,
            json: null,
            schema: null,
            validJSON: null,
            validSchema: null
        };

        this.handleAvroize = this.handleAvroize.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleSchemaChange = this.handleSchemaChange.bind(this);
    }

    handleAvroize() {
        const parsedSchema = JSON.parse(this.state.schema);
        const avroizer = getJSONAvroizer(parsedSchema);
        const parsedData = JSON.parse(this.state.json);
        const result = avroizer.avroize(parsedData);
        console.log(result);
        this.setState({
            avroizedJSON: result
        });
    }

    handleDataChange(event) {
        const data = event.target.value;

        if (data.length === 0) {
            this.setState({
                json: null,
                validJSON: null
            });
        } else {
            try {
                const json = JSON.parse(data);
                this.setState({
                    json: data,
                    validJSON: true
                });

            } catch (e) {
                this.setState({
                    json: null,
                    validJSON: false
                });
            }
        }
    }

    handleSchemaChange(event) {
        const schema = event.target.value;

        if (schema.length === 0) {
            this.setState({
                schema: null,
                validSchema: null
            });
        } else {
            try {
                avsc.parse(schema);
                this.setState({
                    schema: schema,
                    validSchema: true
                });

            } catch (e) {
                this.setState({
                    schema: null,
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

        let avroizeButton = null;
        if (this.state.validJSON && this.state.validSchema) {
            avroizeButton = <button id="btnAvroize" onClick={this.handleAvroize}>Avroize</button>;
        }

        let jsonViewer = null;
        if (this.state.avroizedJSON !== null) {
            jsonViewer = <ReactJson src={this.state.avroizedJSON} />
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

                {avroizeButton}

                {jsonViewer}
            </div>
        );
    }
}