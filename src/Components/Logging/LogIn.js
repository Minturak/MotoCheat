import React, {Component} from "react";
import Firebase from 'firebase';
import {Redirect} from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LogIn extends Component{
  constructor(props){
    super();
    this.state={email:"",password:"",redirect:false}
  }
  handleLogIn = async event =>{
    event.preventDefault();
    try{
      await Firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
        this.props.onChange(this.state.email);
        this.setState({redirect:true})
    }catch (error){
      alert("Adresse email inconnu ou mot de passe incorrect")
      console.log(error)
    }
  }
  render(){
    return(

      <div style={{margin:30}}>
      {this.state.redirect === true &&
        <Redirect to='/'/>
      }
        <TextField id="email" label="Email" variant="filled" onChange={(event)=>this.setState({email:event.target.value})}/><br/><br/>
        <TextField id="password" label="Mot de passe" variant="filled" type="password" onChange={(event)=>this.setState({password:event.target.value})}/><br/><br/>
        <Button variant="outlined" onClick={this.handleLogIn}>Connexion</Button>
      </div>
    )
  }
}
export default LogIn;
