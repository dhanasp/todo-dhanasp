const DefaultHandler = require('./defaultHandler.js');
class GetLoginHandler extends DefaultHandler {
  constructor(fs) {
    super();
    this.fs=fs;
  }
  execute(req, res) {
    if (req.method == 'GET' && req.url == '/login') {
      let error = req.cookie.error || '';
      if (error) {
        let expireDate = new Date(0).toUTCString();
        res.setHeader('Set-Cookie', `error=; Expires=${expireDate}`)
      }
    }
  }
}
module.exports = GetLoginHandler;