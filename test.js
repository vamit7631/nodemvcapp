const Agenda = require('agenda');
const { MongoClient } = require('mongodb');

async function run() {
  const db = await MongoClient.connect('mongodb://localhost:27017/testdatabase');
  const agenda = new Agenda().mongo(db, 'jobs');

  agenda.define('hello', () => {
    console.log('Hello, World!');
    process.exit(0);
  });


  await new Promise(resolve => agenda.once('ready', resolve));


  agenda.schedule('in 30 seconds', 'hello');
  agenda.start();
}

run().catch(error => {
  console.error(error);
  process.exit(-1);
});