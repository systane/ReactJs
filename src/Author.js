import React, { Component } from 'react';
import FormInput from './components/FormInput';
import FormSubmitButton from './components/FormSubmitButton';

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
        fetch("http://localhost:8080/api/autores", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: this.state.name,
                email: this.state.email,
                senha: this.state.password
            })
        })
            .then(res => res.json())
            .then((updatedAuthorList) => {
                this.props.callbackUpdateAuthorList(updatedAuthorList);
            }, (error) => {
                console.log({ failedToSaveAuthor: error });
            })
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.submitForm} method="post">
                    <FormInput id="name" type="text" name="name" value={this.state.name} onChange={this.setName} label="Name" />
                    <FormInput id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
                    <FormInput id="password" type="password" name="password" value={this.state.password} onChange={this.setPassword} label="Password" />
                    <FormSubmitButton label="Submit" />
                </form>
            </div>
        );
    }
}

class AuthorsTable extends Component {
    render() {
        return (
            <div className="content" id="content">
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
        this.updatedAuthorList = this.updatedAuthorList.bind(this);
    }

    /* 
    lifecycle methods:
      componentWillMount()   --> É invocada antes do componente ser renderizado no DOM pela primeira vez
      componentDidMount()    --> É invocada logo após o componente ser renderizado no DOM pela primeira vez --> Normalmente utilizado para requisições assincronas, pois permitir primeiro renderizar o html e somente após atualizar o html com a resposta de alguma request realizada.
      componentWillUnmount() --> É invocada logo após o componente ser desmontado - removido - do DOM
    */
    componentDidMount() {
        fetch("http://localhost:8080/api/autores")
            .then(res => res.json()) /*.then(function(response) { return response.json(); }) res.json() --> retorna o body da response "parseado" como JSON*/
            .then(result => {
                this.setState({ authorList: result });
            },
                (error) => {
                    console.log({ failedToLoadAuthors: error });
                }
            )
    }

    updatedAuthorList(newAuthorList){
        this.setState({authorList: newAuthorList});
    }

    render() {
        return (
            <div>
                <AuthorsForm callbackUpdateAuthorList={this.updatedAuthorList}/>
                <AuthorsTable authorList={this.state.authorList}/>
            </div>
        );
    }
}