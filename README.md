# hogelog/commit-diff-action
This action shows commit diffs.
This action fetch commit diff from [GitHub API](https://docs.github.com/en/rest/commits/commits#compare-two-commits).

## Usage
```
name: show diffs

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  list:
    runs-on: ubuntu-latest
    steps:
      - id: compare
        uses: hogelog/commit-diff-action@0.1.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
      - run: |
          echo '${{ steps.compare.outputs.diffsJSON }}'
          echo '${{ steps.compare.outputs.diffs }}'
```

## Inputs

### `github-token`

**Required** GitHub token for API request.

`{{ secrets.GITHUB_TOKEN }}` is recommended.

## Outputs

### `diffs`

Commit diffs separated by newline.

### `diffsJSON`

Commit diffs as JSON Array.
