# Contributing to MyImpact

Thank you for your interest in contributing to MyImpact and to the open-source projects of the Institut du Numérique Responsable (INR) and the Institutes for Sustainable IT (ISIT).

## How to contribute

Bug fixes, new features, translations, documentation and factor updates should follow this workflow:

1. Fork the repository.
2. Create a dedicated branch for your change.
3. Follow the existing HTML, CSS and JavaScript conventions.
4. Document the source, scope, unit and date of any environmental factor you add or change.
5. Check that you have the right to redistribute every dependency, font, icon, image and dataset included in your contribution.
6. Run the available checks and test all affected languages.
7. Sign every commit as described below.
8. Open a pull request explaining the purpose, sources and validation of the change.

Do not commit secrets, analytics credentials, personal data or third-party assets whose redistribution terms are unclear.

## Authorship and development tools

The person signing a contribution remains responsible for its content, origin and licensing. Development and automation tools must not be listed as authors or co-authors. Commit authorship and `Signed-off-by` lines must identify the human contributor who reviewed and submits the work.

## Developer Certificate of Origin

Developer Certificate of Origin, Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I have the right to submit it under the open source license indicated in the file; or

(b) The contribution is based upon previous work that, to the best of my knowledge, is covered under an appropriate open source license and I have the right under that license to submit that work with modifications, whether created in whole or in part by me, under the same open source license (unless I am permitted to submit under a different license), as indicated in the file; or

(c) The contribution was provided directly to me by some other person who certified (a), (b) or (c) and I have not modified it; and

(d) I understand and agree that this project and the contribution are public and that a record of the contribution, including all personal information I submit with it, including my sign-off, is maintained indefinitely and may be redistributed consistently with this project or the open source license(s) involved.

## Signing commits

Add a `Signed-off-by` line to every commit by using Git's `-s` option:

```bash
git commit -s -m "Describe the contribution"
```

Git will append a line in this form:

```text
Signed-off-by: Your Name <your.email@example.com>
```

Pull requests containing unsigned commits cannot be merged. If the latest commit is missing its sign-off, use `git commit --amend -s`. Older commits can be corrected with an interactive rebase.
