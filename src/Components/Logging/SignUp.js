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
    display: 'flex'
  }
});

class SignUp extends Component{
  constructor(props){
    super();
    this.state={email:"",password:"",confirm:"",redirect:false}
  }
  handleSignUp = async event =>{
    event.preventDefault();
    if(this.state.password !== this.state.confirm){
      alert("Les mots de passe ne correspondent pas")
      return
    };
    try{
      await Firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
        this.props.onChange(this.state.email);
        this.setState({redirect:true})
        //set global state to loggeed
    }catch (error){
      alert("Une erreur est survenue")
      console.log(error)
    }
  }
  render(){
    return(
      <div className={useStyles.root}>
      {this.state.redirect === true &&
        <Redirect to='/'/>
      }
        <TextField id="filled-basic" label="Email" variant="filled" onChange={(event)=>this.setState({email:event.target.value})}/><br/>
        <TextField id="filled-basic" label="Validez le mot de passe" variant="filled" type="password" onChange={(event)=>this.setState({password:event.target.value})}/><br/>
        <TextField id="filled-basic" label="Mt de passe" variant="filled" type="password" onChange={(event)=>this.setState({confirm:event.target.value})}/><br/>
        <Button variant="outlined" onClick={this.handleSignUp}>Connexion</Button>
      </div>
    )
  }

}
export default SignUp;
