/**  -*- mode: react; -*-
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { ProgressBar } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Result.css';
import brFemale from '../../data/br-female.json';
import brMale from '../../data/br-male.json';

class Header extends React.Component {
  static propTypes = {
    result: PropTypes.object.isRequired,
    gender: PropTypes.string,
  };

  calculateBr = (sum, type) => {
    if (type === 'V') return (33) * sum;
    if (this.props.gender === 'female') {
      return brFemale.data[type][sum];
    }
    if (this.props.gender === 'male') {
      return brMale.data[type][sum];
    }
    try {
      return brMale.data[type][sum];
    } catch (e) {
      console.log(type);
      console.log(sum);
      return 0;
    }
    /* return 0;*/
  }

  progressBarStyle = (br) => {
    if (br <= 61) {
      return 'success';
    }
    if (br <= 75) {
      return 'warning';
    }
    return 'danger';
  };

  progressBarPercentage = (br) => br * (100 / 121);

  render() {
    return (
      <table className={`table table-striped table-bordered table-hover table-condensed ${s.table}`}>
        <thead>
          <tr>
            <th>
              نشانه
            </th>
            <th>
              نمره خام
            </th>
            <th>
              نمره نهایی BR
            </th>
            <th>
              نمره نهایی BR
            </th>
            <th>
              مقیاس‌
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.result).map((key, index) => {
            const sum = this.props.result[key].sum;
            const name = this.props.result[key].name;
            const br = this.calculateBr(sum, key);
            const barPercentage = this.progressBarPercentage(br);
            const barStyle = this.progressBarStyle(br);
            return (
              <tr className={s.newsItem} key={index}>
                <td>{key}</td>
                <td>{sum}</td>
                <td>{br}</td>
                <td>
                  <ProgressBar
                    bsStyle={barStyle}
                    now={barPercentage}
                    className={s.progress}
                  />
                </td>
                <td>{name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default withStyles(s)(Header);
