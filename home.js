import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom"
import Navbar from './component/navbar/navbar'
import Article from './component/articles/articles'
import Form from './component/form/form'



class Home extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Route exact path = "/home" component = {Home} />
        <Route path = "/article" component = {Article} />
        <Route path = "/form" component = {Form} />
      </div>
      </BrowserRouter>
    );
  }
}

export default Home