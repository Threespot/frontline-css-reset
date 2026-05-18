# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## General Behavior

When answering WordPress/PHP questions, provide a direct answer first before exploring the codebase. Only investigate files if the user asks for project-specific context or if the question genuinely requires it.

## Code Style / Conventions

Never introduce Unicode smart quotes or curly quotes in any code file (PHP, JS, SCSS, Blade, JSON, etc.). Always use straight quotes (' and "). Do not alter existing comments solely to replace curly quotes with straight quotes — only avoid introducing new ones. A PostToolUse hook in `.claude/settings.json` scans added lines after every Edit and will block if any contain curly quotes.

## Project overview

Frontline CSS Reset is a single-file CSS reset published to npm as `frontline-css-reset`. The hand-authored source `frontline-css-reset.css` is also the published artifact — there is no build step, no preprocessor, no test suite, and no linter.

Toolchain is pinned in `.tool-versions` (Node 22.15.0, Yarn 1.22.22). The project uses Yarn Classic, not npm — a `package-lock.json` in the working tree is incidental and not the source of truth.

## Commands

- `yarn patch` / `yarn minor` / `yarn major` — interactive release prompts. Each confirms (y/n), then runs `npm version <bump>`, which triggers:
  - `postversion` hook: `git push && git push --tags`
  Do not invoke these unless the user explicitly asks to cut a release — they push to the remote and to npm tags.

## Architecture notes

The reset is structured around two deliberate specificity tiers:

1. **Zero-specificity rules** wrapped in `:where()` — the bulk of the file. These reset element defaults (`h1-h6`, `p`, lists, tables, form fields, etc.) without making them harder for consumers to override. Browser support requires `:where()`; for older browsers v6.0.1 (without `:where()`) is the supported fallback.
2. **Non-`:where()` rules** — used intentionally where higher specificity is needed. The header comment of each such block usually explains why. Examples: the universal selector `*` (margin/padding/box-sizing inherit), `*:before / *:after` (must work pre-`:where()` to avoid breaking old-browser layout), the `cursor:` block (intended to be hard to accidentally override, and `::file-selector-button` needs ≥10 specificity to beat UA styles), `::placeholder`, `::file-selector-button`, `[aria-busy]`/`[disabled]`/`[readonly]` cursor states, and `[hidden] { display: none !important }`.

When editing, preserve this tiering: default to `:where()` for element resets; only drop it (or add `!important`) when there is a concrete reason, and document it inline like the existing comments do. Several rules also include numbered footnote-style annotations (`/* 1 */`) tied to comment blocks above — keep that convention when adding similar rules.
