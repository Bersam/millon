/**  -*- mode: react; -*-
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { Pagination, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Result from '../../components/Result';
import Question from '../../components/Question';

class Home extends React.Component {
  static propTypes = {
    questions: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      score: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })),
    })).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.state.result = {};
    this.state.activePage = 1;
    this.state.gender = 'male';
    this.state.questions = props.questions;
  }

  handlePageChange = (eventKey) => {
    this.setState({
      activePage: eventKey,
    });
  };

  handleGenderChange = (status) => {
    this.setState({
      gender: status,
    });
  };

  handleOptionChange = (index, status) => {
    if (this.state.questions[index].status === status) {
      return;
    }
    const newState = this.state;
    newState.questions[index].score.forEach((score) => {
      if (newState.result[score.type] === undefined) {
        newState.result[score.type] = {};
        newState.result[score.type].sum = 0;
        newState.result[score.type].name = score.name;
      }
      if (score.status === status) {
        newState.result[score.type].sum += score.score;
      } else if (newState.questions[index].status !== undefined) {
        newState.result[score.type].sum -= score.score;
      }
    });
    newState.questions[index].status = status;
    this.setState(newState);
  };


  render() {
    const fromNo = (this.state.activePage - 1) * 10;
    const toNo = this.state.activePage * 10;
    const questions = this.state.questions.slice(fromNo, toNo);
    const maxPage = parseInt((this.state.questions.length / 10) + 1, 0);
    const gender = this.state.gender;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>سوال‌ها</h1>
          <Row>
            <Col md={4}>
              <p>به همه‌ی سوالات پاسخ دهید.</p>
            </Col>
            <Col md={4} className="text-left">
              <p>جنسیت خود را مشخص کنید</p>
            </Col>
            <Col md={4} className="text-right">
              <ButtonGroup>
                <Button
                  className={gender === 'male' && 'btn-primary'}
                  onClick={() => this.handleGenderChange('male')}
                >
                  مرد
                </Button>
                <Button
                  className={gender === 'female' && 'btn-primary'}
                  onClick={() => this.handleGenderChange('female')}
                >
                  زن
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className="text-center">
              <Pagination
                bsSize="medium"
                items={maxPage}
                activePage={this.state.activePage}
                onSelect={this.handlePageChange}
              />
            </Col>
          </Row>
          <br />
          {questions.map((item, index) => (
            <Question
              key={index}
              index={index + fromNo}
              text={item.text}
              status={questions[index].status}
              handleOptionChange={this.handleOptionChange}
            />
           ))}
          <hr />
          {(this.state.activePage === maxPage) &&
          <Result result={this.state.result} gender={this.state.gender} />
          }
          <Row>
            <Col className="text-center">
              <Pagination
                bsSize="medium"
                items={maxPage}
                activePage={this.state.activePage}
                onSelect={this.handlePageChange}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
