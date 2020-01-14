import React, {Component} from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import RidersData from '../Ressources/motocheat-362c9-riders-export.json';

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
class Rider extends Component {
  constructor(props) {
    super();
    this.state={
      riders:undefined,
      favs:[],
      orderOption:['c_Num','c_Points','c_Team','c_NOC'],
    };
  };
  changeOrder=event=>{
    var tri = event.target.value;
    var riders = this.state.riders;
    switch(tri){
      case this.state.orderOption[0]:
       // tri par numéro
        riders.sort((a,b)=>{
          if(parseInt(a.c_Num)<parseInt(b.c_Num))return -1;
          if(parseInt(a.c_Num)>parseInt(b.c_Num))return 1;
          return 0;
        })
        this.setState({riders:riders})
        break;
      case this.state.orderOption[1]:
        // triparPoint
        riders.sort((a,b)=>{
          if(parseInt(a.c_Points)<parseInt(b.c_Points))return 1;
          if(parseInt(a.c_Points)>parseInt(b.c_Points))return -1;
          return 0;
        })
        this.setState({riders:riders})
        break;
      case this.state.orderOption[2]:
        // tri Par Team
        riders.sort((a,b)=>{
          if(a.c_Team<b.c_Team)return -1;
          if(a.c_Team>b.c_Team)return 1;
          return 0;
        })
        this.setState({riders:riders})
        break;
      case this.state.orderOption[3]:
        // triPar nationalité
        riders.sort((a,b)=>{
          if(a.c_NOC<b.c_NOC)return -1;
          if(a.c_NOC>b.c_NOC)return 1;
          return 0;
        })
        this.setState({riders:riders})
        break;
    }
  }
  componentDidMount(){
      var arr = [];
      Object.keys(RidersData).forEach(function(key) {
        arr.push(RidersData[key]);
      });
      this.setState({riders:arr})
      if(this.props.username !== "" && this.props.username !== undefined){
        var f = JSON.parse(localStorage.getItem('favsRiders'+this.props.username));
        if(f!==null){this.setState({favs:f})}
      }
  }
  addFav=event=>{
    console.log(this.props.username);
    if(this.props.username !== "" && this.props.username !== undefined){
      var arrFavs = this.state.favs
      arrFavs.push(event.currentTarget.value)
      this.setState({favs:arrFavs})
      localStorage.setItem('favsRiders'+this.props.username, JSON.stringify(this.state.favs))
    }else{
      alert("Veuillez vous connecter pour ajouter des favoris")
    }
  }
  removeFav=event=>{
    var arrFavs = this.state.favs
    var index = arrFavs.indexOf(event.currentTarget.value)
    arrFavs.splice(index,1)
    this.setState({favs:arrFavs})
    localStorage.setItem('favsRiders'+this.props.username, JSON.stringify(this.state.favs))
  }

  render(){
    return(
      <div style={{margin:30}}>
        <h1>Pilotes</h1>
        {this.state.riders !== undefined &&
        <div>
          <FormControl>
            <InputLabel>Tri</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              onChange={this.changeOrder}
              style={{width:120}}
            >
              <MenuItem value={'c_Num'}>Numéro</MenuItem>
              <MenuItem value={'c_Points'}>Points</MenuItem>
              <MenuItem value={'c_Team'}>Équipe</MenuItem>
              <MenuItem value={'c_NOC'}>Nationalité</MenuItem>
            </Select>
          </FormControl>
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
                  {this.state.favs !== null && this.state.favs.includes(e.c_Num) && this.props.username !== "" ? (
                    <Button onClick={this.removeFav} value={e.c_Num}>
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
        </div>
        }
      </div>
    )
  }
};
export default Rider;
