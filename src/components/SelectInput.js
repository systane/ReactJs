import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class SelectInput extends Component {
    constructor() {
        super();
        this.state = {
            errorMessage: ''
        }
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <select value={this.props.authorId} id={this.props.id} onChange={this.props.onChange}>
                    <option value="">Selecione</option>
                    {
                        this.props.options.map(function (option) {
                            return (
                                <option key={option.id} value={option.id}>{option.nome}</option>
                            );
                        })
                    }
                </select>
            </div>
        );
    }

    componentDidMount() {
        PubSub.subscribe('error-validation', function (channel, error) {
            if (error.field === this.props.name) {
                this.setState({ errorMessage: error.defaultMessage });
            }
        }.bind(this));

        PubSub.subscribe('clean-errors', function (channel) {
            this.setState({ errorMessage: '' });
        }.bind(this));
    }
}