require("dotenv").config();
const express = require("express");
const cors = require("cors");
const figlet = require("figlet");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const config = require("./config/app");

const app = express();
app.use(express.json());
app.use(cors()); // adicionar corsOptions

const controllers = require("./src/controllers");
Object.keys(controllers).forEach((controllerName) => {
  controllers[controllerName](app);
});

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(config.port || 8080, () => {
  figlet.text(
    "FIAP - Trabalhadores",
    {
      font: "Standard",
      horizontalLayout: "fitted",
      verticalLayout: "fitted",
      width: 200,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log("FIAP - Trabalhadores");
        return;
      }
      console.log(data);
      console.log("\n\n");
      console.log(`Listening on port ${config.port}`);
    }
  );
});
