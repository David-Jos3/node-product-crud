const express = require('express');
const app = express();
const fs = require('fs')
const port = 8080;



app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Pagina Home</h1>')

})


app.get('/products', (req, res) => {
  fs.readFile('db.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      res.status(500).send('Erro ao Processar a solicitação')
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData)
  })
})


app.post('/products', (req, res) => {
  fs.readFile('db.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      res.status(500).send('Erro ao Processar a solicitação')
    }
    const jsonData = JSON.parse(data)
    const newData = req.body

    jsonData.products.push(newData)

    fs.writeFile('db.json', JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err)
        return
      }
      res.json(newData);
    });
  });
});


app.listen(port, () => {
  console.log(`Server running on port  ${port}`)
})