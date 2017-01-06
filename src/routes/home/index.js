/**  -*- mode: react; -*-
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

export default {

  path: '/',

  async action() {
    /* const resp = await fetch('/graphql', {
     *   method: 'post',
     *   headers: {
     *     Accept: 'application/json',
     *     'Content-Type': 'application/json',
     *   },
     *   body: JSON.stringify({
     *     query: '{question{text,score{type, score, status}}}',
     *   }),
     *   credentials: 'include',
     * });
     * const { data } = await resp.json();
     * if (!data || !data.news) throw new Error('Failed to load the news feed.');*/
    const data = {};
    data.questions = [];
    data.questions.push({
      text: 'اخیراً، حتی صبح ها احساس ضعف و بی حالی می کنم.',
      score: [{
        type: 'H',
        status: 'yes',
        score: 1,
      }],
    });
    data.questions.push({
      text: 'اخیراً، حتی صبح ها احساس ضعف و بی حالی می کنم.',
      score: [{
        type: 'Z',
        status: 'no',
        score: 1,
      }],
    });
    data.questions.push({
      text: 'اخیراً، حتی صبح ها احساس ضعف و بی حالی می کنم.',
      score: [{
        type: 'ZZ',
        status: 'yes',
        score: 1,
      }],
    });
    data.questions.push({
      text: 'اخیراً، حتی صبح ها احساس ضعف و بی حالی می کنم.',
      score: [{
        type: 'H',
        status: 'yes',
        score: 1,
      }],
    });
    data.questions.push({
      text: 'اخیراً، حتی صبح ها احساس ضعف و بی حالی می کنم.',
      score: [{
        type: 'H',
        status: 'yes',
        score: 1,
      }],
    });
    return {
      title: 'React Starter Kit',
      component: <Layout><Home questions={data.questions} /></Layout>,
    };
  },

};
