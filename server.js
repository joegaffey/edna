import express from 'express';
import pkg from 'better-sse';
const {createSession} = pkg;

const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.json({"msg": "Hello world"});
});

app.get("/events", async (req, res) => {
	const session = await createSession(req, res);
  setInterval(() => {
    session.push(new Date().toLocaleTimeString(), 'time');
  }, 1000);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});