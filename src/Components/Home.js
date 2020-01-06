import React, {Component} from 'react';

import RidersData from '../Ressources/motocheat-362c9-riders-export.json';
import TeamsData from '../Ressources/motocheat-362c9-teams-export.json';

import {NavLink} from "react-router-dom";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '50%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
    width: '50%'
  }
});
class Home extends Component {
  constructor(props) {
    super();
    this.state={
      teams:undefined,
      favsTeams:[],
      riders:undefined,
      favsRiders:[]
    };
  };
  componentDidMount() {
    if(this.props.username !== "" && this.props.username !== undefined){
      var ft = JSON.parse(localStorage.getItem('favsTeams'+this.props.username));
      if(ft!==null){this.setState({favsTeams:ft})}
      var arrTeams = [];
      Object.keys(TeamsData).forEach(function(key) {
        if(ft.includes(TeamsData[key].name)){arrTeams.push(TeamsData[key])}
      });
      this.setState({teams:arrTeams})
    }

    if(this.props.username !== "" && this.props.username !== undefined){
      var f = JSON.parse(localStorage.getItem('favsRiders'+this.props.username));
      if(f!==null){this.setState({favsRiders:f})}
      var arrRiders = [];
      Object.keys(RidersData).forEach(function(key) {
        if(f.includes(RidersData[key].c_Num)){arrRiders.push(RidersData[key])}
      });
      this.setState({riders:arrRiders})
    }
  }
  removeFavRider=event=>{
    var arrFavs = this.state.favsRiders
    var index = arrFavs.indexOf(event.currentTarget.value)
    arrFavs.splice(index,1)
    this.setState({favsRiders:arrFavs})
    localStorage.setItem('favsRiders'+this.props.username, JSON.stringify(this.state.favsRiders))
  }
  removeFavTeam=event=>{
    var arrFavs = this.state.favsTeams
    var index = arrFavs.indexOf(event.currentTarget.value)
    arrFavs.splice(index,1)
    this.setState({favsTeams:arrFavs})
    localStorage.setItem('favsTeams'+this.props.username, JSON.stringify(this.state.favsTeams))
  }
  render(){
      return(
        <div>
          <h1>Accueil</h1>
          {this.props.username === "" &&
            <p>Veuillez vous connecter pour voir vos favoris</p>
          }
          {this.state.favsTeams.length === 0 && this.state.favsRiders.length === 0 &&
            <p>Vous n'avez aucun favoris pour le moment!
            Visitez les pages <NavLink to="/riders"><Button >pilotes</Button></NavLink> et <NavLink to="/teams"><Button >equipes</Button></NavLink> pour en ajouter</p>
          }
          {this.state.favsTeams !== [0] && this.state.teams !== undefined &&
            <Table className={useStyles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Chasis</TableCell>
                  <TableCell align="left">Pays</TableCell>
                  <TableCell align="left">Site</TableCell>
                  <TableCell align="left">Favori</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.teams.map(e => (
                  <TableRow>
                    <TableCell component="th" scope="row">{e.name}</TableCell>
                    <TableCell align="left">{e.vehicle_chassis}</TableCell>
                    <TableCell align="left">{e.nationality}</TableCell>
                    <TableCell align="left">
                      <Link href={e.url_official} target="_blank">
                        Official website
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      {this.state.favsTeams !== null && this.state.favsTeams.includes(e.name) && this.props.username !== "" ? (
                        <Button onClick={this.removeFavTeam} value={e.name}>
                            <StarIcon/>
                        </Button>
                      ):(
                        <Button onClick={this.addFav} value={e.name}>
                            <StarBorderIcon/>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
            </Table>
          }
          {this.state.favsRiders !== [0] && this.state.riders !== undefined &&
            <Table className={useStyles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell>Numéro</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell align="left">Prénom</TableCell>
                <TableCell align="left">Pays</TableCell>
                <TableCell align="left">Equipe</TableCell>
                <TableCell align="left">Points</TableCell>
                <TableCell align="left">Favori</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.riders.map(e => (
                  <TableRow>
                    <TableCell component="th" scope="row">{e.c_Num}</TableCell>
                    <TableCell align="left">{e.c_PersonLastname}</TableCell>
                    <TableCell align="left">{e.c_PersonFirstname}</TableCell>
                    <TableCell align="left">{e.c_NOC}</TableCell>
                    <TableCell align="left">{e.c_Team}</TableCell>
                    <TableCell align="left">{e.c_Points}</TableCell>
                    <TableCell align="left">
                    {this.state.favsRiders !== null && this.state.favsRiders.includes(e.c_Num) && this.props.username !== "" ? (
                      <Button onClick={this.removeFavRider} value={e.c_Num}>
                          <StarIcon/>
                      </Button>
                    ):(
                      <Button onClick={this.addFav} value={e.c_Num}>
                          <StarBorderIcon/>
                      </Button>
                    )}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
            </Table>
          }
        </div>
      )

  }
};
export default Home;
