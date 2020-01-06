import React, {Component} from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import TeamsData from '../Ressources/motocheat-362c9-teams-export.json';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  }
});

class Team extends Component {
  constructor(props) {
    super();
    this.state={
      teams:undefined,
      favs:[]
    };
  };
  componentDidMount() {
    var arr = [];
    Object.keys(TeamsData).forEach(function(key) {
      arr.push(TeamsData[key]);
    });
    this.setState({teams:arr})
    if(this.props.username !== "" && this.props.username !== undefined){
      var f = JSON.parse(localStorage.getItem('favsTeams'+this.props.username));
      if(f!==null){this.setState({favs:f})}
    }
  }
  addFav=event=>{
    console.log(this.props.username);
    if(this.props.username !== "" && this.props.username !== undefined){
      var arrFavs = this.state.favs
      arrFavs.push(event.currentTarget.value)
      this.setState({favs:arrFavs})
      localStorage.setItem('favsTeams'+this.props.username, JSON.stringify(this.state.favs))
    }else{
      alert("Veuillez vous connecter pour ajouter des favoris")
    }
  }
  removeFav=event=>{
    var arrFavs = this.state.favs
    var index = arrFavs.indexOf(event.currentTarget.value)
    arrFavs.splice(index,1)
    this.setState({favs:arrFavs})
    localStorage.setItem('favsTeams'+this.props.username, JSON.stringify(this.state.favs))
  }
  render(){
    return(
      <div>
        <h1>Teams</h1>
        {this.state.teams !== undefined &&
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
                {this.state.favs !== null && this.state.favs.includes(e.name) && this.props.username !== "" ? (
                  <Button onClick={this.removeFav} value={e.name}>
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
      </div>
    )
  }
};
export default Team;
