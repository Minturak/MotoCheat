import React, {Component} from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
      favs:[0]
    };
  };
  componentDidMount(){
    var arr = [];
    Object.keys(RidersData).forEach(function(key) {
      arr.push(RidersData[key]);
    });
    var f = JSON.parse(localStorage.getItem('favsRiders'));
    if(f!==null){this.setState({favs:f})}
    this.setState({riders:arr})
  }
  addFav=event=>{
    var arrFavs = this.state.favs
    // console.log(arrFavs);
    arrFavs.push(event.currentTarget.value)
    // console.log(arrFavs);
    this.setState({favs:arrFavs})
    localStorage.setItem('favsRiders', JSON.stringify(this.state.favs))
  }
  removeFav=event=>{
    var arrFavs = this.state.favs
    var index = arrFavs.indexOf(event.currentTarget.value)
    // console.log(arrFavs);
    // console.log(event.currentTarget.value);
    // console.log(index);
    arrFavs.splice(index,1)
    this.setState({favs:arrFavs})
    localStorage.setItem('favsRiders', JSON.stringify(this.state.favs))
  }
  render(){
    return(
      <div>
        <h1>Riders</h1>
        {
          console.log(this.state.favs)
        }
        {this.state.riders !== undefined &&
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
                  {this.state.favs !== null && this.state.favs.includes(e.c_Num) ? (
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
        }
      </div>
    )
  }
};
export default Rider;
