const express = require("express");
const app = express();
require('dotenv').config()

app.get("/", (req, res) => {
    res.reditect("https://github.com/code-server-boilerplates/template-registry")
});

app.get("/heartbeat", (req, res) => {
    res.status(200).json({ok: true})
})

app.get("/heroku/:boilerplateSlug", (req, res) => {
    // TODO: Implement if-else stuff if the boilerplate is outside
    // of the code-server-boilerplates GitHub repo
    res.redirect("https://heroku.com/deploy?template=https://github.com/code-server-boilerplate/" +
    req.parms.boilerplateSlug)
});

app.get("/railway/:boilerplateSlug", (req, res) => {
    // TODO: Implement if-else stuff if the boilerplate is outside
    // of the code-server-boilerplates GitHub repo
    req.redirect("https://railway.app/new?template=https%3A%2F%2Fgithub.com%2Fcode-server-boilerplates%2F" + 
    req.parms.boilerplateSlug +
    "&envs=PASSWORD%2CGIT_REPO&PASSWORDDesc=Your+password+to+log+in+to+code-server+with&GIT_REPODesc=A+git+repo+to+clone+and+open+in+code-server+%28ex.+https%3A%2F%2Fgithub.com%2Fcdr%2Fdocs.git%29")
})

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
  console.log(`server-up: Now listening at http://localhost:${port}`);
});