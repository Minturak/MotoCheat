import React, {Component} from "react";
import Firebase from 'firebase';
import config from '../Firebase/config';
import {Redirect} from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  }
});
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
        //set global state to logged
    }catch (error){
      alert("Adresse email inconnu ou mot de passe incorrect")
      console.log(error)
    }
  }
  render(){
    return(

      <div className={useStyles.root}>
      {this.state.redirect === true &&
        <Redirect to='/'/>
      }
        <TextField id="email" label="Email" variant="filled" onChange={(event)=>this.setState({email:event.target.value})}/><br/>
        <TextField id="password" label="Mot de passe" variant="filled" type="password" onChange={(event)=>this.setState({password:event.target.value})}/><br/>
        <Button variant="outlined" onClick={this.handleLogIn}>Connexion</Button>
      </div>
    )
  }
}
export default LogIn;
