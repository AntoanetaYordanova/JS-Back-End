const http = require('http');
const aboutController = require('./controllers/aboutController');
const catalogController = require('./controllers/catalogController');
const createController = require('./controllers/createController');
const homeController = require('./controllers/homeController');
const router = require('./router');

const server = http.createServer(requestHandler);
const port = 3000;

router.get('/', homeController);
router.get('/about', aboutController);
router.get('/catalog', catalogController);
router.post('/create', createController);

function requestHandler(req, res) {
    console.log('>>>', req.method, req.url);
    const handler = router.match(req.method, req.url);
    handler(req, res);
}

server.listen(port, () => console.log('Server listening on port ' + port));