# Server-side code for `cdrs-deploy.repohubdev.tk`

This is the canonical source code for [the Code Server Deploy](https://cdrs-deploy.repohubdev.tk) Express.js server,
hosted on Divio.

## Available endpoints

* `/` - redirects to <https://github.com/code-server-boilerplates/template-registry>, change it via `TEMPLATE_REGISTRY_REPO_URL`.
* `/source` - redirects to here, or any repo via `REPO_URL` variable, preferrly your fork of this repo.
* `/railway/slug-here` - redirects to <https://railway.app/new?template=https%3A%2F%2Fgithub.com%2Fusername%2Fslug-here&envs=PASSWORD%2CGIT_REPO&PASSWORDDesc=Your+password+to+log+in+to+code-server+with&GIT_REPODesc=A+git+repo+to+clone+and+open+in+code-server+%28ex.+https%3A%2F%2Fgithub.com%2Fcdr%2Fdocs.git%29>, where `username/slug-here` (in URL-decoded form) is the GitHub
repo path for specific Code Server template, which the server usually handles it through `if-else` magic (e.g. `/railway/nodejs-yarnified` for Yarnified Node.js)
* `/heroku/slug-here` - redirects to <https://heroku.com/deploy?template=https://github.com/username/slug-here>, where `username/slug-here` (in URL-decoded form) is the GitHub repo path
for specific Code Server template, which the server usually handles it through `if-else` magic (e.g. `/heroku/electron-builder` for building Electron apps like VS Code or Theia)
* `/api/heartbeat` - use this endpoint to check server status (even there's an endpoint specifically for health checking services,
there's no way to detect issues in the code through this API endpoint
unless you're using an modern IDE like VS Code or Atom or even going to every single endpoint listed above
* `/register` - redirects to `process.env.TEMPLATE_REGISTRY_REPO_URL + "/issues/new/choose"`
(by default, <https://github.com/code-server-boilerplates/template-registry/issues/new/choose>)
* `/api/webhookHandler` - Reserved for GitHub webhook handling. Will develop an code handling for tnat soon.

## Development

You need [Node.js](https://nodejs.org) atleast v12.x (we'll raise the requirement once the minimum required LTS version goes EOL 2 months after) but we recommend 14.x or higher.
If Node.js is not installed, please install it through the [Node Version Manager](https://github.com/nvm-sh/nvm)
([use this one instead for Windows users](https://todo) unless going to
use WSL 2 instead).

1. Clone the nice repo.

```sh
git clone git+ssh://git@github.com/code-server-boilerplates/cdrs-deploy.repohubdev.tk.git ~/cdrs-deploy
cd ~/cdrs-deploy
```

2. Install dependencies with Yarn

```sh
# we use Yarn to manage this chaotic server code
# if you installed Node.js as root, please add sudo or
# su if needed
npm i -g yarn

# now hit the road (some packages don't play well with
# Plug 'n Play, so we'll use the node-modules linker for
# meanwhile)
yarn install
```

3. Start the development server.

```
# copy the dotenv template and edit
cp .env.example .env && nano .env

# now start the dev server (btw we use Nodemon)
yarn dev

# on another session, edit the server.js file to handle
# more slugs for redirection
# just remember, no tabs or we'll eject you into an black hole
# somehwere in Stellapent Galaxy (holy $#!t we added an
# Gildedguy Lore reference)
nano server.js

# and also from there, check if its up
curl http://localhost:${SERVER_PORT:8080}/heartbeat -i --verbose

# now have fun testing if things are fine
xdg-open http://localhost:${SERVER_PORT:8080}/heroku/example-project
```

4. We format our server-side code using Prettier, so here are the cheat sheet to our workflow:

```
# run all of them
yarn lint

# or run one-by-one
yarn lint-check # check if we fucked up
yarn lint-ci # preview the formatted server code before saving	
yarn lint-format # hit the road
```

5. Ready to lift off to other galaxies? Commit your work, push into your fork (or into your branch here
if you have write access) and send an merge request to get it peer-reviewed.

```
# use Commitizen to make your live easier
yarn commit # it's same as doing yarn cz --signoff

# if you're Yoopia and want chaos, remember to follow
# AngularJS' conventional-commits format, found at
# https://rtapp.tk/conventional-commits-ref
git commit --signoff

# now publish your contributions
git push
```

## Contributing

By contributing to this repo, you agree to both the [Developer's Certificate of Origin][dco] and our [Community Code of Conduct][codeofconduct]. You may optionally [sign our unified DcO+CLA][cla] if needed. Your contributions is automagically licensed under the MIT License.

[dco]: https://developercertificate.org
[codeofconduct]: https://rtapp.tk/codeofconduct
[cla]: https://rtapp.tk/oss-cla
