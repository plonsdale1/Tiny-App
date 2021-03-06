const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};



app.post('/login', function (request, response) {
response.cookie("username", request.body["username"]);
// response.redirect("/urls")
let templateVars = {
  username: request.cookies["username"],
  urls: urlDatabase
};
response.render("urls_index", templateVars);

});



app.get("/urls/:shortURL", (request, response) => {
  let templateVars = {shortURL: request.params.shortURL, longURL: urlDatabase[request.params.shortURL],username: request.cookies["username"],};
  console.log(templateVars);
  response.render("urls_show.ejs", templateVars);
})


app.get("/urls.json", (request, response) => {
  response.json(urlDatabase);
});

app.get("/urls", (request, response) => {
  let templateVars = { urls: urlDatabase, username: request.cookies["username"] };
  response.render("urls_index", templateVars)
});



app.get("/u/:shortURL", (request, respond) => {
  console.log(request.params["shortURL"])

  const key = request.params["shortURL"];

  respond.redirect(urlDatabase[key]);
});

app.get("/hello", (request, response) => {
  response.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/", (request, response) => {
  response.send("Hello!");
});

app.post("/urls", (request, response) => {
  let shortUrl = generateRandomString(6, characters);
  response.redirect(`/urls/${shortUrl}`);
  urlDatabase[shortUrl] = request.body.longURL;
});

app.post("/login", (request, response) =>{
  response.redirect("/urls")
})

app.post("/logout", (request, response) =>{
  response
});

app.post("/urls/:id", (request, response) =>{
  // <%= longURL %>
});

app.post("/urls/:shortURL/delete", (request, response) => {
  delete urlDatabase[request.params.shortURL];
  console.log("delete", request.params.shortURL);
 response.redirect("/urls");

})

const characters = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
function generateRandomString(length, chars) {
   newUrl = '';
  for (let i = length; i > 0; --i) newUrl += chars[Math.floor(Math.random() * chars.length)];
    return newUrl;
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});