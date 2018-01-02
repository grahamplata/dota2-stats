import React, { Component } from 'react';
import { Container, Table, Header, Loader } from "semantic-ui-react";
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import 'moment-duration-format'

import Performance from '../BestPerformance'

import heroes from '../../data/heroes'
import games from '../../data/games'

const NUMBER_OF_MATCHES = 2;

class TableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      loading: true,
      wins: 0,
      kills: 0,
      deaths: 0,
      assists: 0
    }
  }

  componentDidMount() {
    this.getLastMatchData("https://api.opendota.com/api/players/29597998/recentMatches?limit=" + NUMBER_OF_MATCHES)
  }

  getLastMatchData(url) {
    axios.get(url).then(response => {
      this.setState({ matches: response.data, loading: false })
    })
  }

  setPlayerTeam(slot) {
    if (slot <= 4) { return 'Radiant' }
    return 'Dire'
  }

  setMatchWinner(match) {
    if (match === true) { return 'Radiant' }
    return 'Dire'
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
        return "Not Available"
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

  setGameType(game_mode) {
    var gameType = games.find(game => game.id === game_mode);
    if (gameType !== 'undefined') {
      return gameType.name
    } else {
      return "Unavailable"
    }
  }

  setHeroName(hero_id) {
    var heroObject = heroes.find(hero => hero.id === hero_id);
    if (heroObject !== 'undefined') {
      return heroObject.localized_name
    } else {
      return "Unavailable"
    }
  }

  loss(player, match) {
    if (player !== match) {
      return true
    } else {
      return false
    }
  }

  win(player, match) {
    if (player === match) {
      return true
    } else {
      return false
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
              <Header.Subheader>{moment.unix(match.start_time).fromNow()} on {this.setPlayerTeam(match.player_slot)}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell textAlign='center'>{this.setGameType(match.game_mode)}</Table.Cell>
        <Table.Cell><a href={`https://www.opendota.com/matches/${match.match_id}`}>{match.match_id}</a></Table.Cell>
        <Table.Cell textAlign='center'
          positive={this.win(this.setPlayerTeam(match.player_slot), this.setMatchWinner(match.radiant_win))}
          negative={this.loss(this.setPlayerTeam(match.player_slot), this.setMatchWinner(match.radiant_win))}>
          {this.setMatchWinner(match.radiant_win)}
        </Table.Cell>
        <Table.Cell textAlign='center'>{moment.duration(match.duration, 'seconds').format("h [hrs], m [min]")}</Table.Cell>
        <Table.Cell textAlign='center'>{match.kills}</Table.Cell>
        <Table.Cell textAlign='center'>{match.deaths}</Table.Cell>
        <Table.Cell textAlign='center'>{match.assists}</Table.Cell>
        <Table.Cell textAlign='center'>{this.setSkill(match.skill)}</Table.Cell>
        <Table.Cell textAlign='center'>{this.setLobbyType(match.lobby_type)}</Table.Cell>
      </Table.Row>
    ))
    return matches
  }

  render() {
    if (this.state.loading) {
      return (
        <Container style={{ margin: 150 }}>
          <Loader large size="large" active={true}>Fetching Matches</Loader>
        </Container>
      );
    } else {
      return (
        <Container style={{ marginTop: 10 }}>
          <Table compact celled definition selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>GameType</Table.HeaderCell>
                <Table.HeaderCell>MatchID</Table.HeaderCell>
                <Table.HeaderCell>Result</Table.HeaderCell>
                <Table.HeaderCell>Duration</Table.HeaderCell>
                <Table.HeaderCell>Kills</Table.HeaderCell>
                <Table.HeaderCell>Deaths</Table.HeaderCell>
                <Table.HeaderCell>Assists</Table.HeaderCell>
                <Table.HeaderCell>Skill Rating</Table.HeaderCell>
                <Table.HeaderCell>Lobby Type</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderMatches()}
            </Table.Body>
          </Table>
        </Container>
      )
    }
  }
}
export default TableData;
