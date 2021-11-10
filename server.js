/*eslint-env es6*/
const http = require('http');
const nodemailer = require('nodemailer');
const cors = require('cors')
const express = require('express');

const debug = require('debug')("node-angular");
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  // secure: true,
  // host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2',
    user: 'tongquangthanh1994@gmail.com',
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDgDknL5mGitP4p\nteNOeFsqQmfnjcJB5sbF1G2Sqho57jcGhVRJ5KW2gimW96zoltWxGeD7TDtMu3sm\nnQXqHmYYv7cW5awWyhD9ePb0VGhiww0tYO4suWfv0ahb1NuJrh1OrE3YslL+vlZJ\nY3KNPnkZrFYxL/4aH9moIXw4Js/mUjloDI7FogjRai2CWdAtuvsThX1hmgMHM6Af\n6INPpSZWcF4AJUCCFRWS+GedPKN6JWLxyZs7oKpZaZjRInLkZQfMMQTJRZnHPqno\nWcoBzMb9migrgiRJfLBMS23Gk51CCK19we179yFfzLImVYSyjlDe0fdoUnsWVI/P\ncAeHW9rbAgMBAAECggEAIYVhuxTLtLkZcYoZ6OqO0SLAQt9tmch6Iqzme9PhOpuO\nNfaKpseDl2uf50tE3kN60xVJGK/OC2vdP+isMtu7cKZ2MQHJnls68YFAiUt7lpMS\nDKD84UoX58RZSOvusImRLu0OdIYxbpVxeWdcgw8+tP2Yo6FHhgcP3FyuJgSAhDev\nU+TmdDpYIXCHB8hUReQ3MIgkloLSsjAeNsdjzIy5c4WcojpyQ6DFomqyKrahfJAE\nSKVoWoMYlIo9d/NKgUdQheW3knjlztqv1QhobpJrNIwuEHPPXoXCn+I7G28yktea\nDS9czPpNbDt3rB8Gz6d0i+pwAf1hKThX47wxHUkMmQKBgQD4FA1gb3akAxbkGkW/\n+8IJAvyQNt8luUHlVw/e0W2Yd8Fr9IDXGAMcfg5v+tumw57MFtCM9SqA3wIfLGLl\nHjnPo25yJ/yfhSTnS7RqEM5biOfalmt3Y6Myqf5+CcXMVgXygdkgAy61rD1xlCkl\nqqF5nUyZGS3BOUKYJ3h13vtExQKBgQDnNdxlAXoNHG06GTgrtV3u/YTMTfdup1jF\nmK9tYNSgbVDex/cc1ZYuyIKPV//Nw4PTYpd8Z9fphTEkUF6tUz28ZXvOBfnIAS4v\ni+dd07q5fzVa2vxqDL+w6+6avCSuU4deF+M3NHPeb+M4v73aYPn371RxH2fmoAON\nY9HzHFLbHwKBgQCSIs3WdxK+fwtnB4r7EwU0Zcv98DT3dfA5d1Xj/h6/aBxKyddz\n3bNHf4JluLLXw/ixZOcpgeqty7DmSDFhorKPfEi9eoy4M6iPj+sRaCEHjth1zZI0\n3D7ww28lNACO5EXQm2kaEIXdgz8Wvx6WD7Pbfiv3K/vmDSMLmoS9esMtuQKBgQDd\n5YpEgftR8/M8LBIFmMWy5Sp7LWSHlSIUWaobTjAiW2eet8kIqk+9TIBI9Aqzvq2Y\nxOlf4wWLv2FfWabTr6zzT25XVtLXSZK63QlKujZdaqGZNcvEN8INGRFg/aoyiEXF\nXyWYyMVfOICY6SRbHnEoq0+eVabQ5sch/ifzqz41vwKBgQCqsMyUFcn7jFL9jx27\nS7Y53y8Mt3hNZq0Z6Q6+VB37Tf6w1VV8IQgFuVeZLsbBe5ugxCslY3kyBrZlgdFv\nIeoLaWq4zzpW27JSUvdAtcVU5eqO8HK4igZ0gaiJX83JNDHxHm5IUjCEyHGqO9Ny\na20XyFxuEcNxBPXFFBD4yEay5A==\n-----END PRIVATE KEY-----\n",
    serviceClient: '110420376546928496596'
  }
});


app.post("/mail", (req, res, next) => {
  const mailOptions = {
    from: 'tongquangthanh1994@gmail.com',
    to: req.body.to,
    subject: 'HARMONY SQUARE - khach hoi nha',
    html: `
      <b>${req.body.name} (${req.body.phone})</b>
      <br>
      Quan tâm căn 2PN: ${req.body.can2pn}
      <br>
      Quan tâm căn 3PN: ${req.body.can3pn}
      <br>
      Chi tiết: ${req.body.roomName}
    `
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ success: true });
    }
  });
});

const normalizePort = val => {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
}

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " required elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  console.log('Listening on ' + port);
  debug("Listening on " + bind);
}

const port = normalizePort(process.env.PORT || "3000");
app.set('port', port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);