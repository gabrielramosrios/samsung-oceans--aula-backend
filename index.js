const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = "ocean_bancodedados";
//mongodb+srv://admin:LdQHrR3iAM9u4Mtw@cluster0.ih1f4.mongodb.net

async function main () { 
  /*
  console.log("conectando ao banco de dados...");

 const client = await MongoClient.connect(url);
 const db = client.db(dbName);
 const collection = db.collection("herois");
 
 console.log ("banco de dados conectado com sucesso")
 */
 
 //aplicação Backend com Express)

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
  app.get("/herois", async function(req, res) { 
     const documentos = await collection.find().toArray();
      res.send(documentos);
  } );

  //[GET] /herois/:id -> REad By ID (ler pelo ID)
  app.get("/herois/:id", async function (req, res){
    //pegamos o ID pela Rota
    const id = req.params.id

    //Acessar o registro na lista, usando o ID
    const item = await collection.findOne({ _id: new ObjectId(id) });
    //Enviar o registro encontrado
    res.send(item);

    res.send("ler pelo ID");
  });

  //[post] /herois -> create (criar)
  app.post("/herois", async function (req, res){
    console.log(req.body);

    //acessamos o valor que foi enviado na request

    const item = req.body;

    //Insere esse valor na collection
   await collectiom.insertOne(item);
    //Exibe uma mensagem de sucesso
    res.send(item);

  });

  //[put] /herois/:id -> update (Atualizar)

  app.put("/herois/:id", function(req, res) {
    //pegar o Id
    const id = req.params.id;

    //pegar item a ser atualizado
    const item = req.body;

    //atualizar na collection o valor recebido
    collection.updateOne(
      {
        _id: new ObjectId(id),
      }, 
      {
        $set: item,
      });
    //Envio uma mensagem de sucesso
    res.send("Item atualizado com sucesso!");
  });

  //[DELETE] /herois/:id -> Delete (Remover)
  app.delete("/herois/:id", async function (req, res) {
    //Pegar o ID
    const id = req.params.id;

    //Remove o item da lista
    await collection.deleteOne({_id: new ObjectId(id)});

    //Exibimos uma mensagem de sucesso
    res.send("Item removido com sucesso!");
    
  })

  app.listen( process.env.PORT || 3000, function () {
    console.log("aplicação rodando em http://localhost:3000");
  });

  //api pokemon 
  //https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0 

}

main();