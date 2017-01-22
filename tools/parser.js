import minimist from 'minimist';
import fs from 'fs';
import babyparse from 'babyparse';
import jsonfile from 'jsonfile';

const argv = minimist(process.argv.slice(2));

const questionparser = () => {
  const fileContents = fs.readFileSync(argv.csv);
  let questions = fileContents.toString();
  questions = babyparse.parse(questions).data;
  const heads = questions[0];
  questions = questions.slice(1, -1);
  questions = questions.map((question) => {
    const obj = {};
    obj.text = question[0].trim().replace(/­/gi, '‌'); // replacing %shy; with zwnj
    obj.score = [];
    for (let step = 1; step < question.length; step += 1) {
      if (question[step] !== '') {
        const score = {};
        score.score = parseInt(question[step], 0);
        score.type = (step % 2 === 0) ? heads[step - 1].trim() : heads[step].trim();
        score.name = (step % 2 === 0) ? heads[step] : heads[step + 1];
        score.status = (step % 2 === 0) ? 'yes' : 'no';
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

const brparser = () => {
  const fileContents = fs.readFileSync(argv.csv);
  let brdata = fileContents.toString();
  brdata = babyparse.parse(brdata).data;
  let heads = brdata[0];
  brdata = brdata.slice(1, -1);
  heads = heads.slice(1, 27);
  const result = {};
  brdata.forEach((item) => {
    const question = item.slice(1, 29);
    for (let step = 0; step < heads.length; step += 1) {
      if (!result[heads[step]]) {
        result[heads[step]] = {};
        console.log(heads[step]);
      }
      if (question[step] !== '') {
        result[heads[step]][question[26]] = parseInt(question[step], 0);
      }
      // const range = question[27].split('-');
      // range[0] = parseInt(range[0], 0);
      // range[1] = (range[1]) ? parseInt(range[1], 0) : range[0];
      // for (let i = range[0]; i <= range[1]; i += 1) {
      //   if (question[step] !== '') {
      //     result[heads[step]][i] = parseInt(question[step], 0);
      //   }
      // }
    }
    // return obj;
  });

  const file = `./src/data/br-${argv.gender}.json`;
  const json = {};
  json.data = result;
  jsonfile.writeFile(file, json, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

if (argv.type === 'question') {
  questionparser();
} else if (argv.type === 'br' && (argv.gender === 'male' || argv.gender === 'female')) {
  brparser();
} else {
  console.log('Use it like this:\n ./tools/parser.js --type [question, br] --csv path-to-filename.csv --gender [male, female]');
}
