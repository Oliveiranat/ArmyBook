const express = require("express"); //Importando o express
const exphbs = require("express-handlebars"); //Importando o handlebars
const sequelize = require("./db/conn");
const conn = require("./db/conn");
const User = require("./models/User");
const user = require("./models/User");

const app = express(); //Criando conexão com o express
//Configurando o Express para pegar o body do Handlebars
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.engine("handlebars", exphbs.engine()); //Criando conexão com o Handlebars

app.set("view engine", "handlebars"); //Setando a view engine no handlebars

app.use(express.static("public")); //Criando uma ponte para arquivos staticos

//QUERYS

/////////Adicionar usuarios (INSERT INTO LIVROS VALUES())
app.post("/users/create", async (req, res) => {
  const name = req.body.name;
  const contact = req.body.contact;
  const tipo = req.body.tipo;
  const detail = req.body.detail;
  const quantity = req.body.quantity;

  await User.create({ name, contact, tipo, detail, quantity });

  res.redirect("/");
});

/////// LER USUARIOS (SELECT* FROM LIVROS)
app.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true });
  console.log(users);
  res.render("home", { users: users });
});

////// DELETE FROM...
app.post("/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id: id } });
  res.redirect("/");
});

//ROTAS

/// SUM - Detalhe TOTAL
app.get("/quantity", async (req, res) => {
  const users = await User.findAll({
    attributes: [
      "tipo",
      [sequelize.fn("sum", sequelize.col("quantity")), "total"],
    ],
    distinct: true,
    raw: true,
  });
  res.render("quantity", { users: users });
});

/// SUM - Detalhe TOTAL
app.get("/quantity/:tipo", async (req, res) => {
  const tipo = req.params.tipo;
  const users = await User.findAll({
    attributes: [
      "tipo",
      [sequelize.fn("sum", sequelize.col("quantity")), "totalTipo"],
    ],
    where: { tipo: tipo },
    distinct: true,
    raw: true,
  });
  res.render("quantity", { users: users });
});

//////////Criando a rota DE adcionar usuarios
app.get("/users/create", (req, res) => {
  res.render("adduser");
});


app.get("/about", (req, res) => {
  res.render("about");
});

/////// Criando Rota de Visualizar usuario individualmente
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } });
  res.render("userview", { user });
});

///EDIT
app.get("/users/edit/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } });
  res.render("useredit", { user });
});

//UPDATE

app.post("/users/update", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const contact = req.body.contact;
  const tipo = req.body.tipo;
  const detail = req.body.detail;
  const quantity = req.body.quantity;

  const userData = {
    id,
    name,
    contact,
    tipo,
    detail,
    quantity,
  };

  await User.update(userData, { where: { id: id } });

  res.redirect("/");
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
