/**  -*- mode: react; -*-
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
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
    this.state.questions = props.questions;
  }

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
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>سوال‌ها</h1>
          <p>به همه‌ی سوالات پاسخ دهید.</p>
          <ul>
            {this.state.questions.map((item, index) => (
              <Question
                index={index}
                text={item.text}
                status={this.state.questions[index].status}
                handleOptionChange={this.handleOptionChange}
              />
            ))}
          </ul>
          <Result result={this.state.result} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
