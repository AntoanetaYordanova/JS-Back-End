const handlers = {};

function match(method, url) {
    const methods = handlers[url] || {};

    const handler = methods[method];

    if(handler == undefined) {
        return defaultHandler;
    } else {
        return handler;
    }
}

function registerHandler (method, url, handler) {
    let methods = handlers[url];

    if(methods == undefined) {
        methods = {};
        handlers[url] = methods;
    }

    handlers[url][method] = handler;
}

function defaultHandler(req, res) {
    res.statusCode = 404;
    res.write('Not Found');
    res.end();
}

module.exports = {
    get : (...params) => registerHandler('GET', ...params),
    post : (...params) => registerHandler('POST', ...params),
    delete : (...params) => registerHandler('DELETE', ...params),
    match
}