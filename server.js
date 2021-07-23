const express = require('express');
const nunjucks = require('nunjucks');

const videos = require('./data');

const server = express();

server.use(express.static('public'));
server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
});

server.get('/', (req, res) => {
  const about = {
    avatar_url: 'https://github.com/pduartesilva2005.png',
    name: 'Pedro Duarte',
    role: 'Student - Rocketseat & Curso em Vídeo',
    description:
      'Programador full-stack, Gamer que estuda entre comunidades de tecnologia como <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a> e <a href="https://rocketseat.com.br" target="_blank">Curso em Vídeo</a>',
    links: [
      { name: 'Github', url: 'https://github.com/pduartesilva2005/' },
      { name: 'Instagram', url: 'https://instagram.com/pduartesilva2005/' },
      { name: 'Twitter', url: 'https://twitter.com/pedroduarte2005/' },
      { name: 'Linkedin', url: 'https://www.linkedin.com/in/pduartesilva2005/' }
    ]
  };

  return res.render('about', { about });
});

server.get('/portfolio', (req, res) =>
  res.render('portfolio', { items: videos })
);

server.get('/video', (req, res) => {
  const id = req.query.id;

  const video = videos.find(video => video.id == id);

  if (!video) {
    return res.send('Video not found!');
  }

  return res.render('video', { item: video });
});

server.listen(3333, () => {
  console.log('server Started at http://localhost:3333');
});
