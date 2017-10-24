import React, { Component } from 'react';
import { render } from 'react-dom';
import { Header, Image, Table, Icon, Loader } from 'semantic-ui-react'
import axios from 'axios'
import moment from 'moment'
import 'moment-duration-format'
import heroes from '../data/heroes.json'
import _ from 'lodash'

const NUMBER_OF_MATCHES = 10;

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      averages: [],
      loading: true
    }
  }

  componentDidMount() {
    this.getLastMatchData("https://api.opendota.com/api/players/29597998/matches?limit=" + NUMBER_OF_MATCHES)
  }

  getLastMatchData(url) {
    axios.get(url).then(response => {
      this.setState({ matches: response.data, loading: false })
    })
  }

  setGameType(game) {
    switch (game) {
      case 0:
        return "Unknown"
        break;
      case 1:
        return "All pick"
        break;
      case 2:
        return "Captains mode"
        break;
      case 3:
        return "Random draft"
        break;
      case 4:
        return "Single draft"
        break;
      case 5:
        return "All random"
        break;
      case 6:
        return "Intro"
      case 7:
        return "The Diretide"
        break;
      case 8:
        return "Reverse captains mode"
        break;
      case 9:
        return "Greeviling"
        break;
      case 10:
        return "Tutorial"
        break;
      case 11:
        return "Least played"
        break;
      case 12:
        return "New player pool"
        break;
      case 13:
        return "New player pool"
      case 14:
        return "Compendium matchmaking"
        break;
      case 15:
        return "Custom"
        break;
      case 16:
        return "Captains draft"
        break;
      case 17:
        return "Balanced draft"
        break;
      case 18:
        return "Ability draft"
        break;
      case 19:
        return "Event"
        break;
      case 20:
        return "All random death match"
      case 21:
        return "1 vs. 1 solo mid"
        break;
      case 22:
        return "All Draft"
        break;
    }
  }

  setMatchWinner(match) {
    if (match === true) {
      return 'Radiant'
    } else {
      return 'Dire'

    }
  }

  setPlayerTeam(slot) {
    if (slot <= 4) {
      return 'Radiant'
    } else {
      return 'Dire'
    }
  }

  playerMatchResult(match, slot) {
    if (match == slot) {
      this.setState({ wins: this.state.count + 1 })
      return <Table.Cell positive>Victory</Table.Cell>
    }
    return <Table.Cell negative>Loss</Table.Cell>
  }

  setHeroName(hero_id) {
    return _.find(heroes.heroes, { id: hero_id }).localized_name
  }

  setLobbyType(lobby_type) {
    switch (lobby_type) {
      case 0:
        return "Public matchmaking"
        break;
      case 1:
        return "Practice"
        break;
      case 2:
        return "Tournament"
        break;
      case 3:
        return "Tutorial"
        break;
      case 4:
        return "Co-op with bots"
        break;
      case 5:
        return "Team match"
        break;
      case 6:
        return "Solo queue"
        break;
      case 7:
        return "Ranked"
        break;
      case 8:
        return "Solo mid 1 vs. 1"
        break;
    }
  }
  setSkill(skill) {
    switch (skill) {
      case null:
        return "Status Not Available"
        break;
      case 0:
        return "Low Skill"
        break;
      case 1:
        return "Normal Skill"
        break;
      case 2:
        return "High Skill"
        break;
      case 3:
        return "Very High Skill"
        break;
    }
  }

  partySize(party) {
    if (party > 1) {
      return <i className="fa fa-users" aria-hidden="true" />
    } else {
      return <i className="fa fa-user" aria-hidden="true" />
    }
  }

  renderMatches() {

    const matches = this.state.matches.map(match => (
      <Table.Row key={match.match_id}>
        <Table.Cell>
          <Header as='h4'>
            <i className={`d2mh hero-${match.hero_id}`} />
            <Header.Content>
              {this.setHeroName(match.hero_id)}
              <Header.Subheader>{moment.unix(match.start_time).fromNow()}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>
          <Header as='h4' image>
            <Header.Content>
              {this.setGameType(match.game_mode)}
              <Header.Subheader>{this.setPlayerTeam(match.player_slot)}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>
          <a href={`https://www.opendota.com/matches/${match.match_id}`}>{match.match_id}</a>
        </Table.Cell>
        {this.playerMatchResult(this.setMatchWinner(match.radiant_win), this.setPlayerTeam(match.player_slot))}
        <Table.Cell>
          {moment.duration(match.duration, 'seconds').format("h [hrs], m [min]")}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {match.kills}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {match.deaths}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {match.assists}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {this.partySize(match.party_size)}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {this.setSkill(match.skill)}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {this.setLobbyType(match.lobby_type)}
        </Table.Cell>
      </Table.Row>
    ))
    return matches
  }

  renderFooter() {
    const assists = this.state.matches.reduce((total, match) => total + match.assists, 0);
    const deaths = this.state.matches.reduce((total, match) => total + match.deaths, 0);
    const kills = this.state.matches.reduce((total, match) => total + match.kills, 0);
    const time = this.state.matches.reduce((total, match) => total + match.duration, 0);
    const winPercentage = this.state.matches.reduce((total, match) => total + match.radiant_win, 0);

    const footer = (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell textAlign='center'>Averages</Table.HeaderCell>
          <Table.HeaderCell />
          <Table.HeaderCell />
          <Table.HeaderCell />
          <Table.HeaderCell>{moment.duration((time / NUMBER_OF_MATCHES), 'seconds').format("h [hrs], m [min]")}</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>{kills / NUMBER_OF_MATCHES}</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>{deaths / NUMBER_OF_MATCHES}</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>{assists / NUMBER_OF_MATCHES}</Table.HeaderCell>
          <Table.HeaderCell />
          <Table.HeaderCell />
          <Table.HeaderCell />
        </Table.Row>
      </Table.Footer>
    )
    return footer
  }

  render() {
    return (

      <Table compact celled definition selectable >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>GameType</Table.HeaderCell>
            <Table.HeaderCell>MatchID</Table.HeaderCell>
            <Table.HeaderCell>Result</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Kills</Table.HeaderCell>
            <Table.HeaderCell>Deaths</Table.HeaderCell>
            <Table.HeaderCell>Assists</Table.HeaderCell>
            <Table.HeaderCell>Party</Table.HeaderCell>
            <Table.HeaderCell>Skill Rating</Table.HeaderCell>
            <Table.HeaderCell>Lobby Type</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.renderMatches(heroes)}
        </Table.Body>
        {this.renderFooter()}
        <Loader large active={this.state.loading} />
      </Table>
    );
  }
}

export default Results