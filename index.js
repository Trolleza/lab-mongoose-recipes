const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    //Iteration II
    Recipe.create({
      title: "Bolinho de Arroz",
      level: "Amateur Chef",
      ingredients: [
        "2 xícaras (chá) de arroz cozido",
        "1/2 xícara (chá) de queijo ralado",
        "1/2 xícara (chá) de leite",
        "2 colheres (sopa) de cheiro-verde picado",
        "1 colher (sopa) de fermento em pó",
        "1/2 xícara (chá) de amido de milho",
        "1/2 xícara (chá) de farinha de trigo",
        "3 ovos",
        "óleo para fritar",
      ],
      cuisine: "Brasileira",
      dishType: "main_course",
      image:
        "https://s2.glbimg.com/PiQjmv_CNRurQMf8stNnxem3tyw=/0x0:600x387/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/P/D/hgO8L8SAKl5Ty9IQs9nA/bolinho-de-arroz-crocante.jpg",
      duration: 30,
      creator: "Vovózinha",
      created: "1800/05/05",
    }).then((result) => {
      console.log("Receita Criada - ", result);

      //Iteration III
      //db.collectionName.insertMany(json, function(err,result)
      Recipe.insertMany(data).then((allRecipes) => {
        console.log("Todas as Receitas - ", allRecipes);

        //Iteration IV
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { $set: { duration: 100 } },
          { new: true }
        ).then((updateRecipe) => {
          console.log("Recipe Atualizada - ", updatedRecipe);

          //Iteration V
          Recipe.deleteOne({
            title: "Carrot Cake",
          }).then((deletedRecipe) => {
            console.log("Recipe Deletada - ", deleteRecipe);

            //Iteration VI
            mongoose.connection.close();
          });
        });
      });
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
