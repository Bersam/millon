/**  -*- mode: react; -*-
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

class Footer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Link className={s.link} to="/">خانه</Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/about">درباره‌ی آزمون</Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/contact">تماس با ما</Link>
          <span className={s.spacer}>·</span>
          <a className={s.link} href="http://bersam.org">سازنده</a>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
