const express = require('express');
const app = express();
const fs = require('fs')
const port = 8080;



app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Pagina Home</h1>')

})

function error(err, res) {
  console.error(err)
  res.status(500).send('Erro ao Processar a solicitação');
}

app.get('/products/:id', (req, res) => {

  const id = Number(req.params.id);

  fs.readFile('db.json', 'utf-8', (err, data) => {
    if (err) {
      return error(err, res);
    }

    const jsonData = JSON.parse(data);
    const productData = jsonData.products
    const productId = productData.find(product => product.id === id);
    productId ? res.json(productId) : res.status(404).end();


    // fs.writeFile('db.json', JSON.stringify(jsonData), (err) => {
    //   if (err) {
    //     return error(err, res);
    //   }

    // });

  })
})

app.get('/products', (req, res) => {
  fs.readFile('db.json', 'utf-8', (err, data) => {

    if (err) {
      return error(err, res);
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData)
  })
})


app.post('/products', (req, res) => {

  const body = req.body

  fs.readFile('db.json', 'utf-8', (err, data) => {
    if (err) {
      return error(err, res);
    }
    const jsonData = JSON.parse(data)


    jsonData.products.push(body)

    fs.writeFile('db.json', JSON.stringify(jsonData), (err) => {
      if (err) {
        return error(err, res);
      }

      res.status(200).end();
    });
  });
});


app.delete('/products/:id', (req, res) => {

  const id = Number(req.params.id);

  fs.readFile('db.json', 'utf-8', (err, data) => {
    if (err) {
      return error(err, res);
    }

    const jsonData = JSON.parse(data)
    jsonData.products = jsonData.products.filter(product => product.id !== id);

    fs.writeFile('db.json', JSON.stringify(jsonData), (err) => {
      if (err) {
        return error(err, res);
      }
      res.status(204).end();
    })
  })
})

app.put('/products/:id', (req, res) => {

  const id = Number(req.params.id);
  const { preco, estoque } = req.body;

  fs.readFile('db.json', 'utf-8', (err, data) => {
    if (err) {
      return error(err, res)
    }

    const jsonData = JSON.parse(data)
    const productIndex = jsonData.products.findIndex(product => product.id === id);

    jsonData.products[productIndex] = {
      ...jsonData.products[productIndex],
      price,
      stock
    }

    fs.writeFile('db.json', JSON.stringify(jsonData), (err) => {
      if (err) {
        return error(err, res);
      }
      res.status(204).end();

    })
  })
})


app.listen(port, () => {
  console.log(`Server running on port  ${port}`)
})
