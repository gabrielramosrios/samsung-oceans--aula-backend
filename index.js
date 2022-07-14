const express = require('express')
const app = express()

//registrar que estamos usando JSOn noBody da requisição
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function (req, res) {
  res.send('Olá, mundo')
});

//endpoints de hérois

const herois = ["Mulher Maravilha", "capitao america", "Homem de Ferro"];
//[GET] /herois -> Read ALL (ler tudo)
app.get("/herois", function(req, res) { 
    res.send(herois.filter(Boolean));
} );

//[GET] /herois/:id -> REad By ID (ler pelo ID)
app.get("/herois/:id", function (req, res){
  //pegamos o ID pela Rota
  const id = req.params.id

  //Acessar o registro na lista, usando o ID
  const item = herois[id-1];
  //Enviar o registro encontrado
  res.send(item);

  res.send("ler pelo ID");
});

//[post] /herois -> create (criar)
app.post("/herois", function (req, res){
  console.log(req.body);

  //acessamos o valor que foi enviado na request

  const item = req.body.nome;

  //Insere esse valor na lista
  herois.push(item);
  //Exibe uma mensagem de sucesso
  res.send("item enviado com sucesso");

});

//[put] /herois/:id -> update (Atualizar)

app.put("/herois/:id", function(req, res) {
  //pegar o Id
  const id = req.params.id;

  //pegar item a ser atualizado
  const item = req.body.nome;

  //atualizar na lista o valor recebido
  herois[id - 1] = item;
  //Envio uma mensagem de sucesso
  res.send("Item atualizado com sucesso!");
});

//[DELETE] /herois/:id -> Delete (Remover)
app.delete("/herois/:id", function (req, res) {
  //Pegar o ID
  const id = req.params.id;

  //Remove o item da lista
  delete herois [id - 1];

  //Exibimos uma mensagem de sucesso
  res.send("Item removido com sucesso!");
  
})

app.listen(3000, function () {
  console.log("aplicação rodando em http://localhost:3000");
});

//api pokemon 
//https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0 