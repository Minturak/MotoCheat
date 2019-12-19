import React, {Component} from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RidersData from '../Ressources/motocheat-362c9-riders-export.json';

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
    this.state={riders:undefined};
  };
  componentDidMount(){
    var arr = [];
    Object.keys(RidersData).forEach(function(key) {
      arr.push(RidersData[key]);
    });
    //console.log(arr)
    this.setState({riders:arr})
  }
  render(){
    return(
      <div>
        <h1>Riders</h1>
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
