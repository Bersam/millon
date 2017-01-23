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
import s from './Feedback.css';

class Feedback extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {/* <a
              className={s.link}
              href="https://gitter.im/kriasoft/react-starter-kit"
              >Ask a question</a>
              <span className={s.spacer}>|</span> */}
          <a
            className={s.link}
            href="mailto:info@bersam.org?subject=Millon%20Test"
          >اگر ایرادی در این وبسایت دیدید به ما گزارش دهید</a>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feedback);
