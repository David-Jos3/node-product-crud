const express = require('express');
const app = express();
const fs = require('fs')



app.get('/', (req, res) => {
  res.send('<h1>Pagina Home</h1>')

})


app.get('/data', (req, res) => {
  fs.readFile('db.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      res.status(500).send('Erro ao Processar a solicitação')
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData)
  })

})

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`)
})