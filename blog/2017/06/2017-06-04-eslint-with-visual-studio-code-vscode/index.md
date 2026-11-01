---
title: ESLint with Visual Studio Code (vscode)
Date: "2017-06-04"
categories:
  - developer
utcDate: "2017-06-04T00:00:00.000Z"
dateModified: "2026-10-30"
description: "Configure ESLint for a small JavaScript project, verify a real diagnostic, and keep VS Code and command-line linting aligned."
---

Linting is useful when it catches a mistake before the application runs. An editor extension alone does not establish those checks: the repository needs a local ESLint installation, a configuration, and a command that other developers can reproduce.

**Updated October 30, 2026:** this note was originally published in 2017. The image-only setup has been replaced with a JavaScript flat-config example. Older `.eslintrc` projects should use the [ESLint migration guide](https://eslint.org/docs/latest/use/configure/migration-guide), not mix both configuration formats.

<!-- truncate -->

## Set up the project before the editor

In a new directory, initialize a package and install ESLint locally:

```shell
npm init -y
npm install --save-dev eslint
```

Use a Node.js release supported by the ESLint version you install. The [current getting-started documentation](https://eslint.org/docs/latest/use/getting-started) lists the supported versions; check that before diagnosing extension errors.

Create `eslint.config.mjs` in the project root:

```javascript
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { console: "readonly" },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
    },
  },
];
```

This deliberately small configuration enables two checks rather than pretending to be a complete production ruleset. `console` is explicitly allowed; other environment globals are not. A browser or Node application should configure the globals for its actual runtime. TypeScript also needs its own parser and configuration; this JavaScript example is not a TypeScript setup.

## Verify a diagnostic you can explain

Create `example.js`:

```javascript
const answer = 42;
console.log(answr);
```

Run:

```shell
npx eslint example.js
```

Expect two errors: `answer` is declared but unused, and `answr` is not defined. Correct the second line to `console.log(answer)` and run the same command again. It should exit successfully without diagnostics.

Neither error should be solved by blindly accepting an automatic fix. ESLint cannot know whether the intended correction was a renamed variable, a missing declaration, or different application behavior.

## Connect VS Code to the same checks

Install the [Microsoft ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), open the project folder, and open `example.js`. Approve workspace library execution only if you trust the repository. The Problems panel should report the same diagnostics as the command line.

If it does not:

1. Confirm the file matches the configuration's `files` pattern.
2. Check the ESLint output channel for configuration or runtime errors.
3. Confirm VS Code has opened the directory containing the package and configuration. Monorepos may need explicit working-directory settings.
4. Run the CLI again before changing editor settings. If it fails there too, the extension is not the root problem.

## Make the check reproducible

Add a package script, `"lint": "eslint ."`, and run `npm run lint` locally and in CI. Commit the lockfile so collaborators resolve the same tool versions.

A formatter handles layout; these rules catch a different class of mistakes. Keep those responsibilities clear instead of adding conflicting formatting rules to make the editor appear busier.
