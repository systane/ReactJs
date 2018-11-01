import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import FormInput from './components/FormInput';

class App extends Component {

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


  /* 
  lifecycle methods:
    componentWillMount()   --> É invocada antes do componente ser renderizado no DOM pela primeira vez
    componentDidMount()    --> É invocada logo após o componente ser renderizado no DOM pela primeira vez --> Normalmente utilizado para requisições assincronas, pois permitir primeiro renderizar o html e somente após atualizar o html com a resposta de alguma request realizada.
    componentWillUnmount() --> É invocada logo após o componente ser desmontado - removido - do DOM
  */

 componentDidMount(){
    fetch("http://localhost:8080/api/autores")
      .then(res => res.json()) /*.then(function(response) { return response.json(); }) res.json() --> retorna o body da response "parseado" como JSON*/
      .then(result => {
        this.setState({authorList: result});
      },
      (error) => {
        console.log({failedToLoadAuthors: error});
      }
    )
  }


  submitForm(event){
    event.preventDefault();
    fetch("http://localhost:8080/api/autores",{
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        nome: this.state.name, 
        email: this.state.email, 
        senha: this.state.password
      })
    })
    .then(res => res.json())
    .then((updatedAuthorList) => {
      this.setState({authorList: updatedAuthorList});
    }, (error) => {
      console.log({failedToSaveAuthor: error});
    })

  }

  setName(event){
    this.setState({name: event.target.value});
  }

  setEmail(event){
    this.setState({email: event.target.value});
  }

  setPassword(event){
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        {/*Side-menu*/}
        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Author</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Books</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Contact</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Author</h1>
          </div>
        </div>

        {/*Form*/}
        <div className="content" id="content">
          <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.submitForm} method="post">
              <FormInput id="name" type="text" name="name" value={this.state.name} onChange={this.setName} label="Name"/>
              <FormInput id="email" type="text" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>
              <FormInput id="password" type="text" name="password" value={this.state.password} onChange={this.setPassword} label="Password"/>
              <div className="pure-control-group">
                <label></label>
                <button type="submit" className="pure-button pure-button-primary">Submit</button>
              </div>
            </form>
          </div>

          {/*Records*/}
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
                  this.state.authorList.map(function (author) {
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
      </div>
    );
  }
}

export default App;
