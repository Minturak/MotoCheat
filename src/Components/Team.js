import React, {Component} from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import TeamsData from '../Ressources/motocheat-362c9-teams-export.json';
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
    this.state={teams:undefined};
  };
  componentDidMount() {
    var arr = [];
    Object.keys(TeamsData).forEach(function(key) {
      arr.push(TeamsData[key]);
    });
    //console.log(arr)
    this.setState({teams:arr})
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
