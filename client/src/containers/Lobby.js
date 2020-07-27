import React from 'react';
import { connect } from "react-redux";
import { getTournaments } from "../redux/actions/tournament.actions";
import { createEntry } from "../redux/actions/entry.actions";
import { loginWithToken } from "../redux/actions/auth.actions";
import Countdown from "../components/Countdown";
import { Link } from "react-router-dom";
import TournamentModal from "../components/TournamentModal";
// MATERIAL UI 
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = () => ({
  table: {
    minWidth: 650,
  },
  row: {
    textDecoration: 'none'
  }
});

class Lobby extends React.Component {
  
  state = {
    modalOpen: false,
    tournamentClickedInfo: {}
  }

  componentDidMount() {
    this.props.getTournaments();
    console.log("mount")
    
  }

  componentWillUpdate() {
  
  }

  handleEnter = async (tournamentId) => {
    await this.props.createEntry(tournamentId, localStorage.token)
    await this.props.getTournaments()
    await this.props.loginWithToken(localStorage.token)
  }

  handleClickTournamentRow = (tournamentInfo) => {
    this.setState({
      tournamentClickedInfo: tournamentInfo,
      modalOpen: true
    })
  }

  handleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render() {
    const { classes } = this.props;
    console.log(this.state)
    return (
      <div>
        <Button 
          variant="contained" 
          color="secondary"
          component={Link}
          to={`/create-tournament`}
        >
          Create Tournament
        </Button> 
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tournament</TableCell>
                <TableCell align="right">Entry Fee</TableCell>
                <TableCell align="right">Entries</TableCell>
                <TableCell align="right">Total Prize</TableCell>
                <TableCell align="right">Start</TableCell>
                <TableCell align="right">End</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.tournamentsArr.map((tournament) => {
                return (
                  <TableRow onClick={() => this.handleClickTournamentRow(tournament)} className={classes.row} key={tournament.id} >
                    <TableCell scope="row">
                      {tournament.name}
                    </TableCell>
                    <TableCell align="right">{tournament.entryFee}</TableCell>
                    <TableCell align="right">{tournament.entries.length + " / " + tournament.entryLimit}</TableCell>
                    <TableCell align="right">{tournament.entryFee * tournament.entries.length}</TableCell>
                    <TableCell align="right">
                      <Countdown countDownEnd={new Date(tournament.startTime).getTime()} overMsg={"Started!"}/>
                    </TableCell>
                    <TableCell align="right">
                      <Countdown countDownEnd={new Date(tournament.endTime).getTime()} overMsg={"Ended!"} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TournamentModal
          handleModal={this.handleModal}
          open={this.state.modalOpen}
          tournamentInfo={this.state.tournamentClickedInfo}
          handleEnter={this.handleEnter}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournamentsArr: state.tournament.tournamentsArr,
  entryData: state.entry,
  currentUser: state.auth.currentUser
});

export default connect(
  mapStateToProps,
  { getTournaments, createEntry, loginWithToken }
)(withStyles(useStyles)(Lobby))
