# GROOVESTREET DESIGN — 60-Point Launch Checklist

**Version 1.0 · Binding before any page ships. Mirrors `design.md`.**

> This is the checklist referenced in the marketing copy: `/about` ("every page ships only when it
> passes our 60-point checklist on real devices"), `/process` stage 04 ("a 60-point checklist: every
> link, form, phone number and WhatsApp button tested on real devices") and the pricing FAQ
> ("a UGX 200,000 landing page passes the same 60-point checklist as a UGX 3,000,000 build").

## How to use

- **Sixty items, no more, no fewer.** The number is a public claim, so it cannot drift. If you add an
  item, remove one and update this line.
- **Same list on every project.** A UGX 200,000 landing page and a UGX 3,000,000 build run the same
  sixty. Items that genuinely do not apply are marked `n/a` **with a written reason** — they are
  never quietly skipped.
- **Real devices, not just the browser.** A mid-range Android on mobile data is the primary target
  (design.md §1.4). Desktop-only testing does not satisfy section D.
- **Two people, one sign-off.** Whoever built the page does not tick their own section D items.

## Pass criteria

| Gate              | Threshold                               | Source              |
| ----------------- | --------------------------------------- | ------------------- |
| LCP (mobile, 4G)  | ≤ 2.0s                                  | design.md §13       |
| CLS               | ≤ 0.05                                  | design.md §13       |
| INP               | ≤ 200ms                                 | design.md §13       |
| First-visit JS    | ≤ 140KB gzipped                         | design.md §13       |
| Lighthouse mobile | ≥ 95 Perf / 100 A11y / 100 SEO / 100 BP | design.md §13       |
| Contrast          | WCAG 2.2 AA                             | design.md §3.3, §11 |
| Palette lint      | zero errors                             | design.md §5, §15   |

A page ships when **60/60 pass**. Anything less is a bug with a ticket, not a caveat.

---

## A. Links and navigation (1–10)

> Backs the process-page claim "every link … tested".

1. [ ] Every internal link resolves to a real page — no 404s, no dead `#` anchors. Crawl the built
       site, do not eyeball it.
2. [ ] Every external link opens the right destination and carries `rel="noopener"`.
3. [ ] Any link that opens in a new tab says so in its link text or accessible name.
4. [ ] The skip link is the first tab stop on every page and moves focus into `<main>`.
5. [ ] Header navigation matches the agreed sitemap — no duplicates, no orphans, correct order.
6. [ ] The logo returns to the home page from every page, including the home page itself.
7. [ ] The footer link tree resolves completely on every page.
8. [ ] Where breadcrumbs exist, they reflect the real hierarchy and mark the current page.
9. [ ] No link text is "click here", "read more" or "here" on its own (design.md §11).
10. [ ] Back and forward navigation preserves scroll position and never traps the user.

## B. Forms and submissions (11–20)

> Backs the process-page claim "every form … tested".

11. [ ] Every input has a real `<label for>`; no placeholder is doing a label's job (§7.3).
12. [ ] Required fields show `*` **and** carry the `required` attribute — not one or the other.
13. [ ] Submitting with an empty required field shows an inline error beside that field.
14. [ ] Errors use `danger` text on `danger-tint` and are wired with `aria-describedby`.
15. [ ] Validation messages say how to fix the problem, not just "invalid".
16. [ ] Success is announced in an `aria-live="polite"` region. Never `alert()` (§11).
17. [ ] A real submission against the **live** URL reaches the delivery endpoint and is readable.
18. [ ] With no endpoint configured, the email and WhatsApp fallbacks carry the submitted content.
19. [ ] Invalid input blocks submission; valid input submits once, with no double-fire.
20. [ ] Spam protection is active and does not block a genuine submission from a real address.

## C. Phone and WhatsApp (21–28)

> Backs the process-page claim "phone number and WhatsApp button tested".

21. [ ] Every `tel:` link dials the correct number in E.164 — digits only, no `+`, spaces or dashes.
22. [ ] The phone number a visitor **reads** is the number the `tel:` link **dials**.
23. [ ] Every WhatsApp link uses `https://wa.me/<digits>` with no `+`, spaces or dashes.
24. [ ] WhatsApp messages are prefilled and correctly URL-encoded, with no stray characters.
25. [ ] Call, email and WhatsApp are all reachable within one scroll from the top of every page.
26. [ ] The mobile action bar shows all three channels at every width below 768px.
27. [ ] Numbers come from the env config (`src/lib/site.ts`), not hard-coded in a component.
28. [ ] Each number is dialled from a **real handset**, not merely verified in the markup.

## D. Real devices and responsive behaviour (29–36)

> Backs "on real devices". Not satisfiable from a desktop browser alone.

29. [ ] Every page lays out at 360px with no horizontal scroll (§1.4).
30. [ ] Nothing overlaps, clips or collides at 360, 390, 768, 1024 and 1440px.
31. [ ] The mobile drawer opens, moves focus inside, closes on `Esc`, and returns focus to its
        trigger (§7.4).
32. [ ] Navigation and action tap targets are at least 44×44px (§11).
33. [ ] Tested on a **real mid-range Android** handset on mobile data.
34. [ ] Tested on a **real iPhone** on mobile data.
35. [ ] Tested on a real tablet, portrait and landscape.
36. [ ] The layout holds with content at its **longest realistic length** — real copy, never lorem.

## E. Accessibility — WCAG 2.2 AA (37–46)

> Non-negotiable per design.md §11. AA is the floor, not the target.

37. [ ] Exactly one `<h1>` per page, and no heading level is skipped (§4.2).
38. [ ] Landmarks are present and unique: `header`, `nav`, `main`, `footer`.
39. [ ] The document language is set, and every page title is unique.
40. [ ] Body text meets 4.5:1; large text and UI borders meet 3:1 (§3.3).
41. [ ] Never white text on the accent fill — accent fills take `--color-ink` (§3.2).
42. [ ] Focus is visible on every interactive element and is never removed (§7.3).
43. [ ] The whole page is operable by keyboard alone, in a sensible tab order.
44. [ ] The page is usable at 200% zoom with no loss of content or function.
45. [ ] Colour is never the only way information is conveyed.
46. [ ] Motion respects `prefers-reduced-motion`; reveals run once and never re-animate (§8).

## F. Performance (47–52)

> The budget in design.md §13 is a hard gate, not an aspiration.

47. [ ] LCP ≤ 2.0s on mobile 4G.
48. [ ] CLS ≤ 0.05 with fonts and images arriving late.
49. [ ] INP ≤ 200ms.
50. [ ] First-visit JavaScript ≤ 140KB gzipped.
51. [ ] Images are AVIF/WebP, correctly sized, `sizes` set, none delivered unscaled (§9).
52. [ ] Fonts are self-hosted — two families, `display: swap`, latin subset, no CDN request (§4).

## G. SEO and metadata (53–56)

53. [ ] Every page has a unique title and meta description.
54. [ ] Canonical, Open Graph and Twitter tags are correct and absolute.
55. [ ] `sitemap.xml` lists every public route; `robots.txt` permits them.
56. [ ] Structured data (JSON-LD) validates with no errors.

## H. Content and brand rules (57–60)

57. [ ] No placeholder text, lorem ipsum, `TODO` or studio-internal notes survive to production.
58. [ ] Every phone number, price, date, name and claim traces to the client's written approval
        (§1.5, §15).
59. [ ] No banned word from the voice list appears, and no hero or CTA sentence exceeds 30 words
        (§2, §15).
60. [ ] Every colour comes from a `@theme` token — the palette lint rule passes with zero errors
        (§5, §15).

---

## Sign-off

| Field                       | Value                                                |
| --------------------------- | ---------------------------------------------------- |
| Project                     |                                                      |
| Page or route               |                                                      |
| Build / deploy URL          |                                                      |
| Date                        |                                                      |
| Checked by                  |                                                      |
| Second sign-off (section D) |                                                      |
| Result                      | ☐ 60/60 pass ☐ shipped with `n/a` items listed below |

**`n/a` items — each needs a written reason:**

| #   | Reason |
| --- | ------ |
|     |        |

> A tick here is a claim the studio stands behind. "Shipped with known failures" is not a valid
> outcome of this checklist — it is a bug with a ticket.
