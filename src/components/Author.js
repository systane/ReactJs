import React, { Component } from 'react';
import PubSub from 'pubsub-js';

//Components
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import HandlerError from './HandlerError';
import api from '../service/api';

class AuthorsForm extends Component {
    constructor() {
        super();
        this.state = {
            authorList: [],
            name: '',
            email: '',
            password: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    setName(event) {
        this.setState({ name: event.target.value });
    }

    setEmail(event) {
        this.setState({ email: event.target.value });
    }

    setPassword(event) {
        this.setState({ password: event.target.value });
    }

    submitForm(event) {
        event.preventDefault();
        PubSub.publish('clean-errors', {});
        fetch(api + "autores", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: this.state.name,
                email: this.state.email,
                senha: this.state.password
            })
        })
            .then(res => res.json())
            .then((response) => {
                if (response.status === 400) {
                    new HandlerError().publishError(response);
                }
                else {
                    var updatedAuthorList = response;
                    PubSub.publish('update-author-list', updatedAuthorList); //Publish a warning to communicate the components that are subscribed in the channel or topic that the authorList have been updated
                    this.setState({ name: '', email: '', password: '' });
                }
            })
    }

    render() {
        return (
            <div className="pure-form pure-form-stacked">
                <form className="pure-form pure-form-stacked" onSubmit={this.submitForm} method="post">
                    <FormInput id="nome" type="text" name="nome" value={this.state.name} onChange={this.setName} label="Name" />
                    <FormInput id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
                    <FormInput id="senha" type="password" name="senha" value={this.state.password} onChange={this.setPassword} label="Password" />
                    <FormSubmitButton label="Submit" />
                </form>
            </div>
        );
    }
}

class AuthorsTable extends Component {
    render() {
        return (
            <div>
                <div>
                    <table className="pure-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.authorList.map(function (author) {
                                    return (
                                        <tr key={author.id}>
                                            <td>{author.nome}</td>
                                            <td>{author.email}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default class AuthorBox extends Component {
    constructor() {
        super();
        this.state = { authorList: [] };
    }

    /* 
    lifecycle methods:
      componentWillMount()   --> É invocada antes do componente ser renderizado no DOM pela primeira vez
      componentDidMount()    --> É invocada logo após o componente ser renderizado no DOM pela primeira vez --> Normalmente utilizado para requisições assincronas, pois permitir primeiro renderizar o html e somente após atualizar o html com a resposta de alguma request realizada.
      componentWillUnmount() --> É invocada logo após o componente ser desmontado - removido - do DOM
    */
    componentDidMount() {
        fetch(api + "autores")
            .then(res => res.json()) /*.then(function(response) { return response.json(); }) res.json() --> retorna o body da response "parseado" como JSON*/
            .then(result => {
                if (result.type === 'error') {
                    new HandlerError().publishError(result.responseJSON);
                }
                else {
                    this.setState({ authorList: result });
                }
            })


        //Subscribe to the channel or topic interested and execute an action
        PubSub.subscribe('update-author-list', function (channel, newAuthorList) {
            this.setState({ authorList: newAuthorList });
        }.bind(this));
    }

    updatedAuthorList(newAuthorList) {
        this.setState({ authorList: newAuthorList });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Author Registration</h1>
                </div>
                <AuthorsForm />
                <AuthorsTable authorList={this.state.authorList} />
            </div>
        );
    }
}