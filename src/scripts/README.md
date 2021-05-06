# Script files for `/bootstrapper/:boilerplateSlug`

This directory is where the bootstrapper scripts for that specific endpoint in the cdrs-deploy Express.js server are being mounted onto. Please do not manually edit here because the CI might nuked your changes here.

## How to update them?

### With GitHub Actions

The automation stuff is on [this workflow file](/.github/workflows/download-scripts.yml). To trigger, either make an commit for `.trigger-rebuild` file or manually trigger it via `workflow_dispatch` API call on the UI or via API.

### Manually / On-hand

```sh
# nuke everything, but ensure .gitkeep
# run these from the root directory of this repo locally
rm -rv src/scripts/ && mkdir src/scripts && touch src/scripts/.gitkeep

# since we nuked this documentation, we need to do some wget magic, but `git restore src/scripts/README.md`
# is the another way around.
wget https://raw.githubusercontent.com/code-server-boilerplates/cdrs-deploy.repohubdev.tk/main -O src/scripts/README.md

# finally, run the script, commit and push
curl -sL https://raw.githubusercontent.com/code-server-boilerplates/template-registry/main/scripts/index-bootstrapper.sh | bash
git commit --signoff -m "chore(bootstrapper-scripts): update scripts with GitHub Actions [skip ci]"
git push
```
