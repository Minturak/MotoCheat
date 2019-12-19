import React, {Component} from "react";
import Firebase from 'firebase';
import config from '../Firebase/config';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SignUp extends Component{
  constructor(props){
    super();
    this.state={email:"",password:"",confirm:""}
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
        //set global state to loggeed
    }catch (error){
      alert("Une erreur est survenue")
    }
  }
  render(){
    return(
      <div>
        <TextField id="filled-basic" label="Email" variant="filled" onChange={(event)=>this.setState({email:event.target.value})}/><br/>
        <TextField id="filled-basic" label="Validez le mot de passe" variant="filled" type="password" onChange={(event)=>this.setState({password:event.target.value})}/><br/>
        <TextField id="filled-basic" label="Mt de passe" variant="filled" type="password" onChange={(event)=>this.setState({confirm:event.target.value})}/><br/>
        <Button variant="outlined" onClick={this.handleSignUp}>Connexion</Button>
      </div>
    )
  }

}
export default SignUp;
