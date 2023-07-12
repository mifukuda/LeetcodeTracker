const express = require('express');
const app = express();
 
app.get('/', (req, res) => {
  res.send("Hello");
});
 
app.listen(process.env.PORT || 4000, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 4000));
});