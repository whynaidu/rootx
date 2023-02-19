const express = require("express");
const CreatorLinks = require("./schema/linksSchema");
const ProfileSchema = require("./schema/profileSchema")
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors())
require("./db/config");



// app.use("/",(req, res, next) => {
//     res.send("This is the express server")
// })
  
app.post("/addlink", async (req, res) => {
  const { linkname, linkurl, linkimagename, Visible, creatorusername } = req.body;
  const addlink = await new CreatorLinks({
    linkName: linkname,
    linkUrl: linkurl,
    linkImagName: linkimagename,
    visible: Visible,
    creatorUsername: creatorusername,
  }).save();
 return res.status(200).json(addlink);
})

app.post("/adduser", async (req, res) =>
{
  const { creatorname, logo, username, bio, password,creatoremail } =
    req.body;
  const addCreator = await new ProfileSchema({
    creatorname: creatorname,
    logo: logo,
    username: username,
    bio: bio,
    password: password,
    creatoremail: creatoremail,
  }).save();
  return res.status(200).json(addCreator);

})

app.post("/updateLink", async (req, res) => {
  const {linkimagename} =req.body;
  const data = await CreatorLinks.update({
    linkImagName: linkimagename,
  });
  return res.status(200).json(data);
});




app.post("/deleteLink/:id", async (req, res) => {
  const id = req.params.id;
  const deleteLink = await CreatorLinks.findByIdAndDelete(id);
  console.log(deleteLink);
  res.send(deleteLink);


})



app.get("/:username", async (req, res) => {
  const username= req.params.username
  const data = await CreatorLinks.find({ creatorUsername: username });
  res.send(data)
    console.log(data);
});


app.post("/deleteall", async (req, res) => {
  const data = await CreatorLinks.deleteMany();
  console.log(data);
  res.send(data);
});


app.listen(3001, () => {
  console.log(`server is runnig at port no 3001`);
});


