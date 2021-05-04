const express = require("express");
const app = express();
require("dotenv").config();

const registryRepo =
  process.env.TEMPLATE_REGISTRY_REPO_URL ||
  "https://github.com/code-server-boilerplates/template-registry";
app.get("/", (req, res) => {
  res.redirect(registryRepo);
});
app.get("/register", (req, res) => {
  res.redirect(registryRepo + "/issues/new/choose");
});

app.get("/hearbeat", (req, res) => res.redirect("/api/hearbeat"));

app.get("/api/heartbeat", (req, res) => {
  console.log("server-info: Heartbeat ping was received");
  res.status(200).json({ ok: true, description: "I'm up!" });
});

// WIP: Webhook handler, but for now it just log stuff
app.post("/api/webhookHandler", (req, res) => {
  const webhookHandlerEnabled = process.env.ENABLE_WEBHOOK_ENDPOINT;
  console.log(req.body);
  if (webhookHandlerEnabled != "true") {
    res
      .status(404)
      .json({
        ok: false,
        description: "Server doesn't accept webhooks from anyone, even GitHub",
      });
  } else {
    const isNewIssue = "owo";
    res.send({ ok: true });
  }
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
  // implement better hit counting handler here
  console.log(
    "server-log-analytics: Request slug: ${req.params.boilerplateSlug}",
  );
  // if it's example-project, use the starter-pack repo.
  if (req.params.boilerplateSlug == "example-project") {
    res.redirect(
      "https://railway.app/new?template=https%3A%2F%2Fgithub.com%2Fcode-server-boilerplates%2Fstarter-pack&envs=PASSWORD%2CGIT_REPO&PASSWORDDesc=Your+password+to+log+in+to+code-server+with&GIT_REPODesc=A+git+repo+to+clone+and+open+in+code-server+%28ex.+https%3A%2F%2Fgithub.com%2Fcdr%2Fdocs.git%29",
    );
    // otherwise, the defaults will apply
  } else {
    res.redirect(
      "https://railway.app/new?template=https%3A%2F%2Fgithub.com%2Fcode-server-boilerplates%2F" +
        req.params.boilerplateSlug +
        "&envs=PASSWORD%2CGIT_REPO&PASSWORDDesc=Your+password+to+log+in+to+code-server+with&GIT_REPODesc=A+git+repo+to+clone+and+open+in+code-server+%28ex.+https%3A%2F%2Fgithub.com%2Fcdr%2Fdocs.git%29",
    );
  }
});

const repo =
  process.env.REPO_URL ||
  "https://github.com/code-server-boilerplates/cdrs-deploy.repohubdev.tk";
app.get("/source", (req, res) => {
  res.redirect(repo);
});

// WIP
app.get("/bootstrapper/:boilerplateSlug", (req, res) => {
  res.sendFile(
    __dirname + "/src/bootstrapper-scripts/" + req.params.boilerplateSlug,
  );
});

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
  console.log(`server-up: Now listening at port ${port}`);
});
