import minimist from 'minimist';
import fs from 'fs';
import babyparse from 'babyparse';
import jsonfile from 'jsonfile';

const argv = minimist(process.argv.slice(2));

const main = () => {
  const fileContents = fs.readFileSync(argv.csv);
  let questions = fileContents.toString();
  questions = babyparse.parse(questions).data;
  const heads = questions[0];
  questions = questions.slice(1, -1);
  questions = questions.map((question) => {
    const obj = {};
    obj.text = question[0];
    obj.score = [];
    for (let step = 1; step < question.length; step += 1) {
      if (question[step] !== '') {
        const score = {};
        score.score = parseInt(question[step], 0);
        score.type = (step % 2 === 0) ? heads[step - 1] : heads[step];
        score.status = (step % 2 === 0) ? 'no' : 'yes';
        obj.score.push(score);
      }
    }
    return obj;
  });

  const file = './src/data/data.json';
  const json = {};
  json.data = questions;
  jsonfile.writeFile(file, json, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

main();
