import React from "react";
import Avroizer from "./Avroizer.jsx";

export default class App extends React.Component {
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <h1>Hello World</h1>
                <Avroizer />
            </div>
        );
    }
}