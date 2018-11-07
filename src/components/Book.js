import React, { Component } from 'react';
import PubSub from 'pubsub-js';

//Components
import FormInput from './FormInput';
import SelectInput from './SelectInput';
import FormSubmitButton from './FormSubmitButton';
import HandlerError from './HandlerError';
import api from '../service/api';

class BooksForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
            tittle: '',
            price: '',
            authorId: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.setTittle = this.setTittle.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.setAuthorId = this.setAuthorId.bind(this);
    }

    setTittle(event) {
        this.setState({ tittle: event.target.value });
    }

    setPrice(event) {
        this.setState({ price: event.target.value });
    }

    setAuthorId(event) {
        this.setState({ authorId: event.target.value });
    }

    submitForm = (event) => {
        event.preventDefault();
        PubSub.publish('clean-errors', {});
        fetch(api + "livros", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titulo: this.state.tittle,
                preco: this.state.price,
                autorId: this.state.authorId
            })
        })
            .then(res => res.json())
            .then((response) => {
                if (response.status === 400) {
                    new HandlerError().publishError(response);
                }
                else {
                    var updatedBookList = response;
                    PubSub.publish('update-book-list', updatedBookList); //Publish a warning to communicate the components that are subscribed in the channel or topic that the authorList have been updated
                    this.setState({ tittle: '', price: '', authorId: '' });
                }
            })
    }

    render() {
        return (
            <div className="pure-form pure-form-stacked">
                <form className="pure-form pure-form-stacked" onSubmit={this.submitForm} method="post">
                    <FormInput id="titulo" type="text" name="titulo" value={this.state.tittle} onChange={this.setTittle} label="Tittle" />
                    <FormInput id="preco" type="number" min="0" max="10000" step="0.1" name="preco" value={this.state.price} onChange={this.setPrice} label="Price" />
                    <SelectInput id="authorId" value={this.state.authorId} options={this.props.authorList} onChange={this.setAuthorId} label="Author" />
                    <FormSubmitButton label="Submit" />
                </form>
            </div>
        );
    }
}

class BooksTable extends Component {
    render() {
        return (
            <div>
                <div>
                    <table className="pure-table">
                        <thead>
                            <tr>
                                <th>Tittle</th>
                                <th>Price</th>
                                <th>Author</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.bookList.map(function (book) {
                                    return (
                                        <tr key={book.titulo}>
                                            <td>{book.titulo}</td>
                                            <td>{book.preco}</td>
                                            <td>{book.autor.nome}</td>
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

export default class BooksBox extends Component {
    constructor() {
        super();
        this.state = { 
            bookList: [],
            authorList: []
        };
    }

    componentDidMount() {
        fetch(api + "livros")
            .then(res => res.json())
            .then(result => {
                if (result.type === 'error') {
                    new HandlerError().publishError(result.responseJSON);
                }
                else {
                    this.setState({ bookList: result });
                }
            })


        PubSub.subscribe('update-book-list', function (channel, newBookList) {
            this.setState({ bookList: newBookList });
        }.bind(this));


        fetch(api + "autores")
            .then(res => res.json())
            .then(result => {
                if (result.type === 'error') {
                    new HandlerError().publishError(result.responseJSON);
                }
                else {
                    this.setState({ authorList: result });
                }
            })
    }

    updatedBookList(newBookList) {
        this.setState({ bookList: newBookList });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Book Registration</h1>
                </div>
                <BooksForm authorList={this.state.authorList}/>
                <BooksTable bookList={this.state.bookList} />
            </div>
        );
    }
}