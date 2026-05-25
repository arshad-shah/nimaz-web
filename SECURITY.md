# Security Policy

## Reporting a vulnerability

`nimaz-web` is a static marketing/companion website with no backend, no user
accounts, and no server-side data handling. If you discover a security issue
(for example in a dependency, the build/deploy pipeline, or the deployed site),
please report it privately rather than opening a public issue.

- Preferred: open a [private security advisory](https://github.com/arshad-shah/nimaz-web/security/advisories/new).
- Or email: **info@arshadshah.com**

Please include steps to reproduce and the affected version/commit. We aim to
acknowledge reports within a few days. As a personal open-source project,
response times may vary.

## Supported versions

The latest commit on the `main` branch (and the most recent tagged release) is
the only supported version.

## Scope

In scope: this repository's source, dependencies, GitHub Actions workflows, and
the generated static site. Out of scope: the separate Nimaz Android application
and third-party services (Google Play, Cloudflare).
