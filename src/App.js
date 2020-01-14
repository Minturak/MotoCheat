import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import './App.css';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Rider from './Components/Rider';
import Team from './Components/Team';
import Home from './Components/Home';
import LogIn from './Components/Logging/LogIn';
import SignUp from './Components/Logging/SignUp';

// const MyContext = React.createContext(defaultValue);

class App extends Component {
  constructor(props){
    super();
    this.state={
      value:0,
      anchorEl:null,
      logged:false,
      username:""
    }
  }
  handleChange = (event, newValue) =>{
    this.setState({value:newValue});
  };
  handleClick = event => {
    this.setState({anchorEl:event.currentTarget});
  };
  handleClose = event => {
    this.setState({anchorEl:null});
  };
  handleLogin = (email) =>{
    this.setState({logged:true,username:email})
    console.log(email)
  }
  handleLogout = _=>{
    this.setState({logged:false,username:""})
    console.log("Logged out");
  }
  render(){
    return (

      <>
      <Router>
        <div styles={{flexGrow:1}}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleClick}>
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <NavLink to="/"><MenuItem onClick={this.handleClose} value="Home">Accueil</MenuItem></NavLink>
                <NavLink to="/riders"><MenuItem onClick={this.handleClose}>Pilotes</MenuItem></NavLink>
                <NavLink to="/teams"><MenuItem onClick={this.handleClose}>Equipes</MenuItem></NavLink>
              </Menu>
              <Typography variant="h6">

              <div styles={{float:"left"}}>
                {this.state.logged &&
                  <NavLink to="/"><Button onClick={this.handleLogout}>Déconnexion</Button></NavLink>
                }
                {!this.state.logged &&
                  <>
                  <NavLink to="/login"><Button >Connexion</Button></NavLink>
                  <NavLink to="/signup"><Button >Créer un compte</Button></NavLink>
                  </>
                }
              </div>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
          <Route path="/" exact strict render={()=>(<Home username={this.state.username}/>)}/>
          <Route path="/login" exact strict render={()=>(<LogIn onChange={this.handleLogin}/>)}/>
          <Route path="/signup" exact strict render={()=>(<SignUp onChange={this.handleLogin}/>)}/>
          <Route path="/riders" exact strict render={()=>(<Rider username={this.state.username}/>)}/>
          <Route path="/teams" exact strict render={()=>(<Team username={this.state.username}/>)}/>
        </Router>
      </>
  );}
}
export default App;
