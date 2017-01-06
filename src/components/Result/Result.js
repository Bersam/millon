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
import s from './Result.css';

class Header extends React.Component {
  static propTypes = {
    result: PropTypes.object.isRequired,
  };

  render() {
    return (
      <table className="table table-striped table-bordered">
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
              مقیاس‌
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.result).map(key => (
            <tr className={s.newsItem}>
              <td>{key}</td>
              <td>{this.props.result[key].sum}</td>
              <td>{this.props.result[key].sum}</td>
              <td>{this.props.result[key].name}</td>
            </tr>
           ))}
        </tbody>
      </table>
    );
  }
}

export default withStyles(s)(Header);
