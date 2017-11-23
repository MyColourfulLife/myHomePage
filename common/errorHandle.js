var errorHandle = function (err, req, res, next) {
    const errorDetails = err.stack || err;
  
    res.status(err.status || 500).format({

      json() {
        const errorInfo = {
          details: err,
          error: err.toString()
        };
        res.send(errorInfo);
      },

      html() {
        const message = `<pre>${errorDetails}</pre>`;
        res.send(`<h1>500 Internal server error</h1>\n${message}`);
      },
  
      default() {
        const message = errorDetails;
        res.send(`500 Internal server error:\n${message}`);
      }
    });
  
  }
  
  module.exports = errorHandle;