// core server
const express = require("express");
const app = express();
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");

// database logic
const mongoose = require("mongoose");
const visits = require("./lib/visitsModel");

// function for hit counter stuff
countNewVisit = function (collection, slug) {
  visits
    .findOneAndUpdate(
      { page: slug },
      { $inc: { counter: 1 } },
      { new: true },
    )
    .then((data) => {
      console.log("server-log-analytics: " + data);
    })
    .catch((err) => {
      console.log("server-errors: " + err);
    });
};

const registryRepo =
  process.env.TEMPLATE_REGISTRY_REPO_URL ||
  "https://github.com/code-server-boilerplates/template-registry";
app.get("/", (req, res) => {
  res.redirect(registryRepo);
});
app.get("/register", (req, res) => {
  res.redirect(registryRepo + "/issues/new/choose");
});

app.get("/heartbeat", (req, res) => res.redirect("/api/heartbeat"));

app.get("/api/heartbeat", (req, res) => {
  console.log("server-info: Heartbeat ping was received");
  console.log(req);
  res.status(200).json({ ok: true, description: "I'm up!", code: 200 });
});

// WIP: Webhook handler, but for now it just log stuff
app.post("/api/webhookHandler", (req, res) => {
  const webhookHandlerEnabled = process.env.ENABLE_WEBHOOK_ENDPOINT;
  console.log(req.body);
  if (webhookHandlerEnabled != "true") {
    res.status(404).json({
      ok: false,
      description: "Server doesn't accept webhooks from anyone, even GitHub",
    });
  } else {
    const isNewIssue = "owo";
    res.send({ ok: true });
  }
});

app.get("/api/webhookHandler", (req, res) => {
  res
    .status(405)
    .json({ ok: false, description: "Method not supported", code: 405 });
});

app.get("/heroku/:boilerplateSlug", (req, res) => {
  // TODO: better handle hig counting in the future
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(
    "server-log-analytics: Requested slug: " +
      req.params.boilerplateSlug +
      " | Request type: heroku.com/deploy | Request ID: " +
      uuidv4() +
      " | IP Address: " +
      ip,
  );
  var slugVisitName = "heroku-" + req.params.boilerplateSlug;
  countNewVisit(slugVisitName);
  // if it's example-project, use the starter-pack repo.
  if (req.params.boilerplateSlug == "example-project") {
    res.redirect(
      "https://heroku.com/deploy?template=https://github.com/code-server-boilerplate/starter-pack",
    );
  } else if (req.params.boilerplateSlug == "deploy-code-server-upstream") {
    res.redirect(
      "https://heroku.com/deploy?template=https://github.com/cdr/deploy-code-server",
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
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(
    "server-log-analytics: Requested slug: " +
      req.params.boilerplateSlug +
      " | Request type: railway.app | Request ID: " +
      uuidv4() +
      " | IP Address: " +
      ip,
  );
  var slugVisitName = "heroku-" + req.params.boilerplateSlug;
  countNewVisit(slugVisitName);
  // if it's example-project, use the starter-pack repo.
  if (req.params.boilerplateSlug == "example-project") {
    res.redirect(
      "https://railway.app/new?template=https%3A%2F%2Fgithub.com%2Fcode-server-boilerplates%2Fstarter-pack&envs=PASSWORD%2CGIT_REPO&PASSWORDDesc=Your+password+to+log+in+to+code-server+with&GIT_REPODesc=A+git+repo+to+clone+and+open+in+code-server+%28ex.+https%3A%2F%2Fgithub.com%2Fcdr%2Fdocs.git%29",
    );
  } else if (req.params.boilerplateSlug == "starter-pack") {
    res.redirect("/railway/example-project");
  } else if (req.params.boilerplateSlug == "upstream") {
    res.redirect("/railway/deploy-code-server-upstream");
  } else if (req.params.boilerplateSlug == "deploy-code-server-upstream") {
    res.redirect(
      "https://railway.app/new?template=https%3A%2F%2Fgithub.com%2Fcdr%2Fdeploy-code-server&envs=PASSWORD%2CGIT_REPO&PASSWORDDesc=Your+password+to+log+in+to+code-server+with&GIT_REPODesc=A+git+repo+to+clone+and+open+in+code-server+%28ex.+https%3A%2F%2Fgithub.com%2Fcdr%2Fdocs.git%29",
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
  res.sendFile(__dirname + "/src/scripts/" + req.params.boilerplateSlug);
});

const port = process.env.SERVER_PORT || 8080;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    retryWrites: true,
  })
  .then(() => {
    console.log(`server-log-analytics: Conncted to MongoDB`);
    app.listen(port, () =>
      console.log(`server-up: Now listening at port ${port}`),
    );
  });
