import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class FormInput extends Component {
    constructor() {
        super();
        this.state = {
            errorMessage: ''
        }
    }
  
    render() {
        var errorStyle = {
            color: 'red'
        };
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
                <span className="pure-form-message" style={errorStyle}>{this.state.errorMessage}</span>
            </div>
        );
    }

    componentDidMount() {
        PubSub.subscribe('error-validation', function(channel, error){
            if(error.field === this.props.name){
                this.setState({errorMessage: error.defaultMessage});
            }
        }.bind(this));

        PubSub.subscribe('clean-errors', function(channel){
            this.setState({errorMessage: ''});
        }.bind(this));
    }
}
