const express = require('express');
const app = express();
const fs = require('fs')


app.get('/', (req, res) => {

})

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`)
})