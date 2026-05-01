---
name: writing-plans
description: Use when you have a content brief or strategy requirements for a multi-step wiki or content task, before creating any content
---

# Writing Content Plans

## Overview

Write comprehensive content plans assuming the creator has zero context for the knowledge base. Document everything: which wiki pages to consult, what sources to reference, target audience, tone, SEO/GEO keywords, content structure. Give them the whole plan as bite-sized tasks. Focus on research-backed, data-driven content.

**Announce at start:** "I'm using the writing-plans skill to create the content plan."

**Save plans to:** `wiki/strategy/YYYY-MM-DD-<content-name>-plan.md`

## Scope Check

If the brief covers multiple independent content pieces (e.g. landing page + blog series + email sequence), suggest breaking into separate plans — one per content type. Each plan should produce a complete, publishable piece.

## Content Mapping

Before defining tasks, map out:
- Which wiki pages provide relevant background (concepts, entities, strategy)
- Which raw sources should be referenced
- What new research is needed
- Target audience persona(s) from `wiki/strategy/`

## Bite-Sized Task Granularity

**Each step is one action (5-15 minutes):**
- "Research competitor approaches for this content type" — step
- "Draft the headline and subheadline options" — step
- "Write the hero section copy" — step
- "Review against brand voice guide" — step
- "File into wiki/content/" — step

## Plan Document Header

**Every plan MUST start with this header:**

```markdown
# [Content Name] Content Plan

**Goal:** [One sentence describing what this content achieves]

**Target Audience:** [Persona name and key characteristics]

**Content Type:** [Landing page / Blog post / Email / Ad copy / etc.]

**Tone:** [Professional, empathetic, authoritative, etc.]

**Key Messages:** [2-3 core messages to convey]

**SEO/GEO Keywords:** [Primary and secondary keywords]

**Wiki References:** [List of wiki pages to consult]

---
```

## Task Structure

````markdown
### Task N: [Content Section]

**Wiki Pages to Consult:**
- `wiki/concepts/relevant-concept.md`
- `wiki/entities/relevant-entity.md`

**Raw Sources:**
- `raw/articles/source-article.md`

- [ ] **Step 1: Research**
Consult the listed wiki pages and raw sources. Extract:
- Key claims with citations
- Statistics and data points
- Patient testimonials or social proof

- [ ] **Step 2: Outline**
Structure the section with:
- Headline
- Supporting points (3-5)
- Call to action

- [ ] **Step 3: Draft**
Write the full section copy. Include:
- Exact word count target: [X words]
- Tone: [match brand voice guide]
- At least one trust signal (stat, credential, testimonial)

- [ ] **Step 4: Review**
Check against:
- Brand voice guide
- SEO keyword inclusion
- Factual accuracy (trace claims to sources)
- Readability (target audience appropriate)

- [ ] **Step 5: File**
Save to `wiki/content/[filename].md` with proper frontmatter.
Update `index.md` and `log.md`.
````

## No Placeholders

Every step must contain actionable content. These are **plan failures**:
- "Add compelling copy here"
- "Write SEO-optimized content"
- "Include relevant testimonials"
- "Add appropriate CTAs"
- Steps that describe WHAT without showing HOW

## Self-Review

After writing the plan, check:

1. **Brief coverage:** Does every requirement from the brief have a task?
2. **Source backing:** Does every claim-heavy section reference specific wiki pages or raw sources?
3. **Consistency:** Are tone, keywords, and persona references consistent throughout?
4. **Completeness:** Can someone with zero context execute this plan and produce publishable content?

Fix issues inline. No need to re-review.

## Execution

After saving the plan, present it to the user for review. Then execute tasks sequentially, updating wiki/content/ as each section is completed.

## Altınsoy Kalite Kapıları

Her plan otomatik olarak şu kapı kontrollerini içermeli:

| Kapı | Tetikleyici | Zorunlu Rol |
|------|------------|-------------|
| Tıbbi doğruluk | İçerikte tıbbi iddia var | [[trichologist]] |
| Hasta uygunluğu | Hasta temas noktası | [[patient-psychologist]] |
| Regülasyon uyumu | Yayınlanacak içerik | [[health-regulator]] |
| Marka tutarlılığı | Yayınlanacak içerik | [[agency-director]] |
| SEO/GEO uyumu | Dijital yayınlanacak | [[seo-geo-specialist]] |

**Kural:** Plan'da bu kapılar TASK olarak yer almalı. "Review" deyip geçme — hangi rolün ne kontrol edeceğini yaz.

## Handoff Formatı

Plan tamamlandığında:
```
HANDOFF: writing-plans → komutan
Dosya: wiki/strategy/YYYY-MM-DD-[icerik]-plan.md
Özet: [1 cümlede plan kapsamı]
Roller: [Devreye girecek roller listesi]
İlk adım: [Plan'ın ilk task'ı]
```
