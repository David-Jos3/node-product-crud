import express from 'express';
import data from './data.js'
const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Pagina Home</h1>')

})

app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = data.find(product => product.id === id);
  product ? res.json(product) : res.status(404).end();
})

app.get('/products', (req, res) => {
  res.json(data);
})


app.post('/products', (req, res) => {
  const body = req.body
  const index = data.findIndex(index => index.id === body.id);

  if (index === -1) {
    data.push(body);
    res.status(200).end();
    return
  } return res.status(400).json({ error: 'ID duplicado' })

});


app.delete('/products/:id', (req, res) => {

  const id = Number(req.params.id);
  const index = data.findIndex(index => index.id === id)
  const delItem = data.splice(index, 1)

  res.json(delItem);
  res.status(204).end()

})

app.put('/products/:id', (req, res) => {

  const id = Number(req.params.id);
  const { price, stock, description } = req.body;
  const productIndex = data.findIndex(product => product.id === id);

  data[productIndex] = {
    ...data[productIndex],
    price,
    stock,
    description
  }

  res.json(data)

})


app.listen(port, () => {
  console.log(`Server running on port  ${port}`)
})
