/**  -*- mode: react; -*-
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Question.css';

class Header extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.string,
    handleOptionChange: PropTypes.func.isRequired,
  };

  render() {
    const index = this.props.index;
    const text = this.props.text;
    const status = this.props.status;
    return (
      <Row key={index} className={s.questionItem}>
        <Col md={8} mdOffset={1} className={`text-right ${s.vcenter}`}>
          <p>{index + 1}. {text}</p>
        </Col>
        <Col md={2} className={`text-center ${s.vcenter}`}>
          <ButtonGroup>
            <Button
              className={status === 'no' && 'btn-primary'}
              onClick={() => this.props.handleOptionChange(index, 'no')}
            >
              خیر
            </Button>
            <Button
              className={status === 'yes' && 'btn-primary'}
              onClick={() => this.props.handleOptionChange(index, 'yes')}
            >
              بله
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}

export default withStyles(s)(Header);
