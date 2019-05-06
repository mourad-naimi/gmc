import React, { Component } from 'react'
import './articles.css';
import axios from 'axios';

class Article extends Component {

    constructor(props) {
        super(props)
        this.state={
            typeArticle:"",
            prix:"",
            image:"",
            quantite:""
        }
      }

handleChange = stateName => e => {
    this.setState({
      [stateName]: e.target.value
    })
}
handleSubmit = () => {
    axios.post("/article", {
        typeArticle:this.state.typeArticle,
        prix:this.state.prix,
        image:this.state.image,
        quantite:this.state.quantite
    })
    .then( () => alert(this.state.typeArticle + " is aded"))
    .catch(err => console.log(err))
}

render() {
    return (
      <div>
        <form>
            <div className="global-field">
                <label> Type d'article {' '} <input type="text" onChange={this.handleChange('typeArticle')}/> </label>
                <label> Prix {' '} <input type="text"  onChange={this.handleChange('prix')}/> </label>
                <label> Image {' '} <input type="text"  onChange={this.handleChange('image')}/> </label>
                <label> Quantité en stock {' '} <input type="text"  onChange={this.handleChange('quantite')}/> </label>
            </div>        
            <button onClick={ () => {this.handleSubmit()}} >Ajouter</button>
        </form>
      </div>
    )
  }
}

export default Article