const getActualRequestDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const customLogger = (req, res, next) => {
  // middleware function

  const method = req.method;
  const url = req.url;
  const cloneBody = JSON.parse(JSON.stringify(req.body));
  const status = res.statusCode;
  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  const log = `[${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;
  delete cloneBody.password;

  console.log(log, cloneBody);

  next();
};

const logResponseBody = (req, res, next) => {
  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = (chunk, ...args) => {
    chunks.push(chunk);
    return oldWrite.apply(res, [chunk, ...args]);
  };

  res.end = (chunk, ...args) => {
    if (chunk) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString('utf8');
    console.log(req.path, body);
    return oldEnd.apply(res, [chunk, ...args]);
  };

  next();
};

const exportableHandlers = {
  customLogger,
  logResponseBody,
};

// All exportable stored as an array (e.g., for including in Express app.use())
const all = Object.keys(exportableHandlers).map(
  (key) => exportableHandlers[key]
);

module.exports = {
  all,
};
