import React from "react";
import JSONPretty from 'react-json-pretty';
import {getJSONAvroizer} from 'avroize-es6';
import "react-json-pretty/JSONPretty.monikai.styl";
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
                console.log(e);
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
            jsonImage = this.state.validJSON ? <img className="imgCheckbox" src={greenCheckBox} /> :
                <img className="imgCheckbox" src={redCheckBox}/>;
        }

        let schemaImage = null;
        if (this.state.validSchema !== null) {
            schemaImage = this.state.validSchema ? <img className="imgCheckbox" src={greenCheckBox} /> :
                <img className="imgCheckbox" src={redCheckBox}/>;
        }

        let avroizeButton = null;
        if (this.state.validJSON && this.state.validSchema) {
            avroizeButton = <button id="btnAvroize" onClick={this.handleAvroize}>Avroize!</button>;
        }

        let jsonViewer = null;
        if (this.state.avroizedJSON !== null) {
            jsonViewer = <JSONPretty id="json-pretty" style={{fontSize: "1.1em"}} json={this.state.avroizedJSON} space="4" />;
        }

        return (
            <div className="avroize">
                <h1 className="title">Avroize</h1>

                <div className="innerPanel">
                    <div className="panel">
                        <h3 className="title">Avro Schema</h3>
                        <textarea className="userInput" placeholder="<< insert schema here >>"
                                  onChange={this.handleSchemaChange} />
                        {schemaImage}

                        <h3 className="title">Data</h3>
                        <textarea className="userInput" placeholder="<< insert data here >>"
                                  onChange={this.handleDataChange} />
                        {jsonImage}

                        <div className="divButton">
                            {avroizeButton}
                        </div>
                    </div>
                </div>

                <div className="innerPanel">
                    <div className="panel">
                        <h3 className="title">Avroized Data</h3>
                        {jsonViewer}
                    </div>
                </div>
            </div>
        );
    }
}