var mongoose = require("mongoose");
var express = require("express");

var app = express();

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
// mongoose.connect(process.env.mongo_url);
const url = process.env.MONGO_URL || "mongodb://localhost:27017/thuctapcongnhan";
mongoose.connect(url, {useUnifiedTopology: true ,useNewUrlParser:true});

//models
var User = require("./models/user.model");

//route
var adminAuthRoute = require("./routes/admins/auth/login.admin.route");
var adminUserRoute = require("./routes/admins/users/user.route");
var loginRoute = require("./routes/auth/login.route");
var registerRoute = require("./routes/auth/register.route");
var logoutRoute = require("./routes/auth/logout.route");
const productsRoute = require("./routes/products.route");
const adminProductRoute = require("./routes/admins/products/products.route");
const historyRoute = require("./routes/users/history.route")

//middleware
var authAdminMiddleware = require("./middlewares/admins/auth.admin.middleware");

const { logout } = require("./controllers/logout.controller");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser("helios1704"));
app.use(express.static("public"));
app.use("/img", express.static(path.join(__dirname, "public/images")));
app.use("/js", express.static(path.join(__dirname, "public/javascripts")));
app.use("/css", express.static(path.join(__dirname, "public/stylesheets")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/AdminLTE", express.static(path.join(__dirname, "public/AdminLTE")));
// app.use(sessionMiddleware);

app.set("views", "./views");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: null,
    partialsDir: path.join(__dirname, "views/admins/partials/"),
  })
);

app.set("view engine", "handlebars");
// app.get("/", (req, res) => {
//   var userName = req.cookies.userName;
//   if (userName) {
//     res.render("index", {
//       name: userName,
//     });
//   } else {
//     res.render("index", {});
//   }
// });


app.get("/about", async (req, res) => {
  var userName = req.cookies.userName;
  if (userName) {
    res.render("about", {
      name: userName,
    });
  } else {
    res.render("about", {});
  }
});

app.get("/contact", async (req, res) => {
  var userName = req.cookies.userName;
  if (userName) {
    res.render("contact", {
      name: userName,
    });
  } else {
    res.render("contact", {});
  }
});

app.get("/cart", async (req, res) => {
  var userName = req.cookies.userName;
  if (userName) {
    res.render("cart", {
      name: userName,
    });
  } else {
    res.render("cart", {});
  }
});
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/", productsRoute);
app.use("/histories", historyRoute);
app.use("/admin/users", authAdminMiddleware.requireAuth, adminUserRoute);
app.use("/admin", adminAuthRoute);
app.use("/admin/products", authAdminMiddleware.requireAuth, adminProductRoute);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Example Listen at: " + port);
});