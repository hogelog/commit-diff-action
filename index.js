const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const githubToken = core.getInput('github-token');
  const octokit = github.getOctokit(githubToken)

  const { data: comparison } = await octokit.rest.repos.compareCommits({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    base: github.context.payload.before,
    head: github.context.payload.after,
  });
  const diffs = comparison.files
    .filter(file => file.patch)
    .map(file => (file.filename));

  const diffsString = diffs.join('\n');
  const diffsJSON = JSON.stringify(diffs, null, 0);

  console.log(diffsString);

  core.setOutput('diffs', diffsString);
  core.setOutput('diffsJSON', diffsJSON);
}

run();
