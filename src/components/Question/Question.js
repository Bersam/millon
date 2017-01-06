/**  -*- mode: react; -*-
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Question.css';

class Header extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    handleOptionChange: PropTypes.func.isRequired,
  };

  render() {
    const index = this.props.index;
    const text = this.props.text;
    const status = this.props.status;
    return (
      <li key={index} className={s.questionItem}>
        <p>{text}</p>
        <ButtonGroup>
          <Button
            className={status === 'yes' && 'btn-primary'}
            onClick={() => this.props.handleOptionChange(index, 'yes')}
          >
            بله
          </Button>
          <Button
            className={status === 'no' && 'btn-primary'}
            onClick={() => this.props.handleOptionChange(index, 'no')}
          >
            خیر
          </Button>
        </ButtonGroup>
      </li>
    );
  }
}

export default withStyles(s)(Header);
