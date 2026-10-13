<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep original Wix page copy in a published-content snapshot and share the site shell across distinct TanStack routes, because this Wix site has no CMS collections.
- Read public Wix business properties through a server function and the linked connector gateway; never expose workspace credentials or non-public Wix resources to the browser.
- Store downloaded original Wix media as Lovable asset pointers, preserving source asset IDs for traceability.
