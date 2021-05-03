const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.redirect("https://github.com/code-server-boilerplates/template-registry");
});

app.get("/register", (req, res) => {
  res.redirect("https://github.com/code-server-boilerplates/template-registry/issues/new/choose");
});

app.get("/heartbeat", (req, res) => {
  res.status(200).json({ ok: true, description: "I'm up!" });
});

app.get("/heroku/:boilerplateSlug", (req, res) => {
  // if it's example-project, use the starter-pack repo.
  if (req.params.boilerplateSlug == "example-project") {
    res.redirect(
      "https://heroku.com/deploy?template=https://github.com/code-server-boilerplate/starter-pack",
    );
  } else {
    res.redirect(
      "https://heroku.com/deploy?template=https://github.com/code-server-boilerplate/" +
        req.params.boilerplateSlug,
    );
  }
});

app.get("/railway/:boilerplateSlug", (req, res) => {
  // if it's example-project, use the starter-pack repo.
  if (req.params.boilerplateSlug == "example-project") {
    res.redirect(
      "https://railway.app/new?template=https%3A%2F%2Fgithub.com%2Fcode-server-boilerplates%2Fstarter-pack&envs=PASSWORD%2CGIT_REPO&PASSWORDDesc=Your+password+to+log+in+to+code-server+with&GIT_REPODesc=A+git+repo+to+clone+and+open+in+code-server+%28ex.+https%3A%2F%2Fgithub.com%2Fcdr%2Fdocs.git%29",
    );
  } else {
    res.redirect(
      "https://railway.app/new?template=https%3A%2F%2Fgithub.com%2Fcode-server-boilerplates%2F" +
        req.params.boilerplateSlug +
        "&envs=PASSWORD%2CGIT_REPO&PASSWORDDesc=Your+password+to+log+in+to+code-server+with&GIT_REPODesc=A+git+repo+to+clone+and+open+in+code-server+%28ex.+https%3A%2F%2Fgithub.com%2Fcdr%2Fdocs.git%29",
    );
  }
});

const repo = process.env.REPO_URL || "https://github.com/code-server-boilerplates/cdrs-deploy.repohubdev.tk";
app.get("/source", (req, res) => {
  res.redirect(repo)
})

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
  console.log(`server-up: Now listening at http://localhost:${port}`);
});
