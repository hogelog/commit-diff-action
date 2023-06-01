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
        uses: hogelog/commit-diff-action@0.1.2
        with:
          include-pattern: ^src/.+
          exclude-pattern: ^src/tmp/.+
      - run: |
          echo '${{ steps.compare.outputs.diffsJSON }}'
          echo '${{ steps.compare.outputs.diffs }}'
```

## Inputs

### `include-patter`

(Optional) Include path pattern regular expression.

### `exclude-pattern`

(Optional) Exclude path pattern regular expression.

### `github-token`

(Optional) GitHub token for API request.

## Outputs

### `diffs`

Commit diffs separated by newline.

### `diffsJSON`

Commit diffs as JSON Array.
