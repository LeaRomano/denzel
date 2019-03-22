const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const imdb = require("./src/imdb");

const CONNECTION_URL =
  "mongodb+srv://LeaRomano:30041991@cluster-denzel-08kky.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "DenzelMongo";
const DENZEL_IMDB_ID = "nm0000243";

const importationData = () => {
  var movieLoading = new Promise(function(resolve, reject) {
    console.log(`📽️  fetching filmography...`);
    var myMovies = imdb(DENZEL_IMDB_ID);
    resolve(myMovies);
  });
  movieLoading.then(function(movies) {
    console.log("Movies loaded !");
    var app = Express();

    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: true }));

    var database, collection;
    MongoClient.connect(
      CONNECTION_URL,
      { useNewUrlParser: true },
      (error, client) => {
        if (error) {
          throw error;
        }
        database = client.db(DATABASE_NAME);
        console.log("Connected to `" + DATABASE_NAME + "`!");
        collection = client.db("ListOfMovies").collection("Movie");
        collection.insert(movies, null, function(error, results) {
          if (error) throw error;
          console.log("data imported in mongodb");
        });
        client.close();
      }
    );
  });
};

module.exports = importationData;

//importationData();
