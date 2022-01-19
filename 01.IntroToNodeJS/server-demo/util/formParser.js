async function parse(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (data) => (body += data));
    req.on('end', () => {
      let result;
      try {
        result = body
          .split('&')
          .map((p) => p.split('='))
          .reduce((acc, c) => {
            Object.assign(acc, { [c[0]]: c[1] });
          }, {});
          resolve(result);
      } catch (err) {
          reject(err)
      }
    });
  });
}
