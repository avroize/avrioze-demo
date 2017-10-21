import React from "react";
import "../styles/Avroize.css"

export default class Avroize extends React.Component {
    render() {
        return (
            <div className="avroize">
                <h1 className="title">Avroize</h1>

                <div>
                    <h3>Avro schema</h3>
                    <textarea placeholder="<< insert schema here >>" />
                </div>

                <div>
                    <h3>Data</h3>
                    <textarea placeholder="<< insert data here >>" />
                </div>
            </div>
        );
    }
}