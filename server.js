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
  auth: {
    user: 'tongquangthanh1994@gmail.com',
    pass: 'quangthanh94'
  }
});


app.post("/mail", (req, res, next) => {
  const mailOptions = {
    from: 'tongquangthanh1994@gmail.com',
    to: 'minhvu450@gmail.com',
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
  transporter.sendMail(mailOptions, function(error, info){
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