import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type WorkEntry = CollectionEntry<'work'>;
export type CvEntry = CollectionEntry<'cv'>;
export type CvRole = CvEntry['data']['roles'][number];

const isProd = import.meta.env.PROD;

/** Drafts are visible while developing and hidden from the built site. */
const shipped = <T extends { data: { draft?: boolean } }>(e: T) => !isProd || !e.data.draft;

export async function getProfile() {
  const entry = await getEntry('profile', 'profile');
  if (!entry) throw new Error('src/content/profile/profile.md is missing.');
  return entry;
}

export async function getCv() {
  const entry = await getEntry('cv', 'main');
  if (!entry) throw new Error('src/content/cv/cv.yaml is missing or has no `main` entry.');
  return entry;
}

/** Case studies in display order. Order is editorial, not chronological. */
export async function getWork(): Promise<WorkEntry[]> {
  const entries = (await getCollection('work')).filter(shipped);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export interface EmployerGroup {
  /** The cv.yaml role this group joins to. */
  cvKey: string;
  /** Display name from the work entries — not the CV's formatting. */
  employer: string;
  /** Employment title and span, from the CV. Authoritative. */
  title: string;
  start: string;
  end: string;
  location?: string;
  /** The employer's own site, from cv.yaml. Absent when none was verified. */
  url?: string;
  entries: WorkEntry[];
}

/** "https://broom.id/" -> "broom.id". The bare domain is its own external-link indicator. */
export function displayDomain(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/**
 * Groups case studies by employer for the work index.
 *
 * Employment title and dates come from cv.yaml so the site and the CV cannot drift.
 * Each work entry's own `year` is its *business-line* span, which is a different and
 * narrower thing — Broom employment starts Jul 2023, but BLC launched Nov 2023 and
 * Taktis Jul 2024.
 *
 * A cvKey with no matching CV role throws rather than rendering a blank header.
 */
export async function getWorkByEmployer(): Promise<EmployerGroup[]> {
  const [work, cv] = await Promise.all([getWork(), getCv()]);
  const roles = new Map(cv.data.roles.map((r) => [r.key, r]));

  const groups: EmployerGroup[] = [];
  for (const entry of work) {
    const { cvKey, employer } = entry.data;
    let group = groups.find((g) => g.cvKey === cvKey);

    if (!group) {
      const role = roles.get(cvKey);
      if (!role) {
        throw new Error(
          `${entry.id}: cvKey "${cvKey}" has no matching role in cv.yaml. ` +
            `Known keys: ${[...roles.keys()].join(', ')}`,
        );
      }
      group = {
        cvKey,
        employer,
        title: role.title,
        start: role.start,
        end: role.end,
        location: role.location,
        url: role.url,
        entries: [],
      };
      groups.push(group);
    }
    group.entries.push(entry);
  }
  return groups;
}

/** CV roles that have no case study — they appear on /cv only. */
export async function getRolesWithoutStudies(): Promise<CvRole[]> {
  const [work, cv] = await Promise.all([getWork(), getCv()]);
  const covered = new Set(work.map((e) => e.data.cvKey));
  return cv.data.roles.filter((r) => !covered.has(r.key));
}
