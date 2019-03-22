const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const imdb = require("../src/imdb");
const importation = require("../sandbox");

var cors = require("cors");
//const DENZEL_IMDB_ID = "nm0000243";

const CONNECTION_URL =
  "mongodb+srv://LeaRomano:30041991@cluster-denzel-08kky.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "ListOfMovies";
const DENZEL_IMDB_ID = "nm0000243";

async function ImplementData() {
  const movies = await imdb(DENZEL_IMDB_ID);
  const awesome = movies.filter(movie => movie.metascore >= 70);
}

var app = Express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;
app.listen(9292, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection("Movie");

      console.log("Connected to " + DATABASE_NAME + "!");
    }
  );
});

app.get("/movies/populate", (request, response) => {
  /*collection.insert(ImplementData(), null, function(error, results) {
    if (error) throw error;
  });*/
  // importation();
  collection.find({}).toArray((error, result) => {
    if (error) {
      throw response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get("/movies", (request, response) => {
  collection.findOne({ metascore: { $gt: 70 } }, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get("/movies/search", (request, response) => {
  var limite = request.query.limit;
  if (limite == null) limite = 5;
  else {
    limite = Number(request.query.limit);
  }
  var metascore = request.query.metascore;
  if (metascore == null) metascore = 0;
  else {
    metascore = Number(request.query.metascore);
  }
  collection
    .find({ metascore: { $gt: metascore } })
    .sort({ metascore: -1 })
    .limit(limite)
    .toArray((error, result) => {
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
    });
});

app.get("/movies/:id", (request, response) => {
  collection.findOne(
    { _id: new ObjectId(request.params.id) },
    (error, result) => {
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
    }
  );
});

app.post("/movies/:id", (request, response) => {
  req = request.body;
  collection.updateOne(
    { id: request.params.id },
    { $set: { date: req.date, review: req.review } },
    (error, result) => {
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
    }
  );
});
