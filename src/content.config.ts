import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * profile — identity atoms in frontmatter, positioning prose in the body.
 *
 * Contact fields are optional on purpose. PRODUCT.md forbids inventing contact
 * details, and optionality lets ContactActions render a visible "pending" marker
 * instead of a plausible-looking fake.
 */
const profile = defineCollection({
  loader: glob({ pattern: 'profile.md', base: './src/content/profile' }),
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    location: z.string().optional(),
    email: z.email().optional(),
    linkedin: z.url().optional(),
    cv: z
      .object({
        href: z.string(),
        updated: z.string(),
        sizeLabel: z.string().optional(),
      })
      .optional(),
    /** True until the user has approved the drafted copy. Renders a visible draft marker. */
    draft: z.boolean().default(false),
  }),
});

/**
 * work — one case study per file. Bodies start at the first `##`; the headline and
 * dek live here so the work index and the case study cannot drift apart.
 *
 * `cvKey` is an explicit join into the cv collection's role `key`. Never match on
 * company name.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    cvKey: z.string(),
    employer: z.string(),
    /** Only when the business line has its own site, distinct from the employer's. */
    clientUrl: z.url().optional(),
    businessLine: z.string().optional(),
    /** Business-line span, not employment span. Employment dates come from cv.yaml. */
    year: z.string(),
    role: z.string(),
    status: z.string(),
    headline: z.string(),
    dek: z.string(),
    stack: z.array(z.string()).default([]),
    order: z.number().int().default(100),
    draft: z.boolean().default(false),
  }),
});

const cvRole = z.object({
  key: z.string(),
  company: z.string(),
  title: z.string(),
  start: z.string(),
  end: z.string().default('Present'),
  location: z.string().optional(),
  /** The employer's own site. Verified to resolve before being added — never inferred. */
  url: z.url().optional(),
  /** One line. Powers the compact density on / versus the full list on /cv. */
  summary: z.string().optional(),
  context: z.string().optional(),
  bullets: z.array(z.string()).default([]),
});

/**
 * cv — transcribed from the supplied PDF, which is the sole authority for dates,
 * titles and employment history.
 */
const cv = defineCollection({
  loader: file('./src/content/cv/cv.yaml'),
  schema: z.object({
    id: z.string(),
    roles: z.array(cvRole).min(1),
    education: z.array(
      z.object({
        institution: z.string(),
        credential: z.string(),
        year: z.string(),
        detail: z.string().optional(),
      }),
    ).default([]),
    certifications: z.array(z.string()).default([]),
    tools: z.array(
      z.object({ group: z.string(), items: z.array(z.string()).min(1) }),
    ).default([]),
    languages: z.array(z.string()).default([]),
  }),
});

export const collections = { profile, work, cv };
