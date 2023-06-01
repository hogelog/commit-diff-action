const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const includePattern = core.getInput('include-pattern');
  const excludePattern = core.getInput('exclude-pattern');
  const githubToken = core.getInput('github-token');
  const octokit = github.getOctokit(githubToken)

  var base, head;
  if (github.context.payload.pull_request) {
    base = github.context.payload.pull_request.base.sha;
    head = github.context.payload.pull_request.head.sha;
  } else {
    base = github.context.payload.before;
    head = github.context.payload.after;
  }

  const { data: comparison } = await octokit.rest.repos.compareCommits({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    base,
    head,
  });
  let diffs = comparison.files.map(file => (file.filename));
  if (includePattern) {
    const includeRe = new RegExp(includePattern);
    diffs = diffs.filter(diff => includeRe.test(diff));
  }
  if (excludePattern) {
    const excludesRe = new RegExp(excludePattern);
    diffs = diffs.filter(diff => !excludesRe.test(diff));
  }

  const diffsString = diffs.join('\n');
  const diffsJSON = JSON.stringify(diffs, null, 0);

  console.log(diffsString);

  core.setOutput('diffs', diffsString);
  core.setOutput('diffsJSON', diffsJSON);
}

run();
