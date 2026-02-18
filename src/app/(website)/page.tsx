import { Container } from "@/components/Container/Container";
import { Section } from "@/components/Section/Section";
import { H1 } from "@/components/Typography/H1";
import { H2 } from "@/components/Typography/H2";
import { H3 } from "@/components/Typography/H3";
import { H4 } from "@/components/Typography/H4";
import { Text } from "@/components/Typography/Text";
import { Link } from "@/components/Link/Link";
import { ArrowUpRight, GithubLogo } from "@/components/Icons/Icons";
import {
  reader,
  type ContactEntry,
  type ProfileEntry,
  type SocialLinksEntry,
} from "@/lib/keystatic";
import { ProfilePhoto } from "@/components/profile/ProfilePhoto";
import { RichText } from "@/components/RichText/RichText";
import { getSocialIcon } from "@/lib/social-icons";
import { ExperienceList } from "@/components/experience/ExperienceList";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail/ObfuscatedEmail";

import { Tag } from "@/components/Tag/Tag";
import { buildDescription } from "@/helpers/buildDescription";
import { buildJsonLd } from "@/helpers/buildJsonLd";
import { sortWorkExperience } from "@/helpers/sortWorkExperience";

import { ProjectCardImage } from "@/components/projects/ProjectCardImage";
import { SocialLinks } from "@/components/SocialLinks";

export default async function Page() {
  const [profile, contact, socialLinks, features] = await Promise.all([
    reader.singletons.profile.read(),
    reader.singletons.contact.read(),
    reader.singletons.socialLinks.read(),
    reader.singletons.features.read(),
  ]);

  const profileSummary = profile?.summary ? await profile.summary() : [];

  const [projects, openSource, articles, workExperience] = await Promise.all([
    features?.projects?.enabled ? reader.collections.projects.all() : [],
    features?.openSource?.enabled ? reader.collections.openSource.all() : [],
    features?.articles?.enabled ? reader.collections.articles.all() : [],
    features?.workExperience?.enabled ? reader.collections.workExperience.all() : [],
  ]);
  // otherVentures logic will be added when the section is re-enabled in UI

  const sortedExperience = sortWorkExperience(workExperience);

  const baseUrl = process.env.NEXT_PUBLIC_NCP_APP_URL || 'http://localhost:3000';

  const description = buildDescription(profileSummary);

  const currentRoles = sortedExperience.filter(role => role.entry.current);

  const jsonLd = buildJsonLd({ profile, socialLinks, description });

  const experienceItems = await Promise.all(
    sortedExperience.map(async (job) => ({
      slug: job.slug,
      entry: {
        role: job.entry.role,
        company: job.entry.company,
        companyUrl: job.entry.companyUrl,
        companyLocation: job.entry.companyLocation,
        startDate: job.entry.startDate,
        endDate: job.entry.endDate,
        current: job.entry.current,
      },
      impact: await job.entry.impact(),
    })),
  );

  const projectCards = await Promise.all(
    projects.map(async (project) => {
      const summary = await project.entry.summary();

      return (
        <div
          key={project.slug}
          className="squircle flex flex-col gap-4 bg-shadow-grey-50 p-6 dark:bg-shadow-grey-900 overflow-hidden"
        >
          {project.entry.coverImage && (
            <div className="-mx-6 -mt-6">
              <ProjectCardImage
                src={project.entry.coverImage}
                alt={project.entry.title || "Project Image"}
                className=""
              />
            </div>
          )}

          <div className="flex flex-1 flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <H3 className="">
                {project.entry.liveUrl ? (
                  <Link
                    href={project.entry.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    {project.entry.title}
                  </Link>
                ) : (
                  project.entry.title
                )}
              </H3>

              <div>
                <RichText document={summary} paragraphClassName="mt-3 first:mt-0 text-sm md:text-base" />
              </div>

              <div className="flex flex-wrap gap-2">
                {project.entry.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              {project.entry.githubUrl && (
                <a
                  href={project.entry.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="squircle-sm inline-flex h-10 w-10 items-center justify-center border border-shadow-grey-200 text-shadow-grey-700 hover:bg-shadow-grey-100 hover:text-shadow-grey-900 dark:border-shadow-grey-800 dark:text-shadow-grey-200 dark:hover:bg-shadow-grey-900 dark:hover:text-white"
                  aria-label="View Code"
                >
                  <GithubLogo size={18} weight="bold" className="text-shadow-grey-600 dark:text-shadow-grey-300" />
                </a>
              )}
              {project.entry.liveUrl && (
                <a
                  href={project.entry.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="squircle-sm inline-flex h-10 w-10 items-center justify-center border border-shadow-grey-200 text-shadow-grey-700 hover:bg-shadow-grey-100 hover:text-shadow-grey-900 dark:border-shadow-grey-800 dark:text-shadow-grey-200 dark:hover:bg-shadow-grey-900 dark:hover:text-white"
                  aria-label="View Live"
                >
                  <ArrowUpRight size={18} weight="bold" className="text-shadow-grey-600 dark:text-shadow-grey-300" />
                </a>
              )}
            </div>
          </div>
        </div>
      );
    }),
  );

  const isEmailEnabled = Boolean(contact?.email?.enabled && contact?.email?.address);
  const hasSocialLinks = Boolean(socialLinks?.links && socialLinks.links.length > 0);
  const hasContactOptions = isEmailEnabled || hasSocialLinks;
  const socialLinksPosition = socialLinks?.position || "bottom";

  const contactBody = !hasContactOptions ? (
    <div className="">
      <Text className="">No contact information available.</Text>
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      {isEmailEnabled && (
        <ObfuscatedEmail
          email={(contact as ContactEntry).email.address}
          label={(contact as ContactEntry).email.label || "Send an Email"}
        />
      )}
    </div>
  );

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section id="home" className="hero-wash pb-16 pt-24 md:pb-24 md:pt-40">
        <Container className="mx-auto max-w-6xl px-6">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-10 md:max-w-6xl md:grid-cols-[1fr_auto] md:items-center md:gap-8">
            <div className="order-1 flex flex-col items-center gap-6 md:order-2 md:items-end">
              {profile?.photo && (
                <ProfilePhoto
                  src={profile.photo}
                  alt={profile.name || "Profile Photo"}
                  className="w-full max-w-56 sm:max-w-64 md:max-w-[27rem]"
                />
              )}
            </div>

            <div className="order-2 flex flex-col items-center gap-6 text-center md:order-1 md:items-start md:text-left">
              <H1 className="text-balance text-5xl md:text-7xl">{profile?.name || "Your Name"}</H1>

              {profile?.title && <H2 className="max-w-xl text-balance text-4xl text-shadow-grey-500 md:text-5xl dark:text-shadow-grey-400">{profile.title}</H2>}

              {profile?.expertise && profile.expertise.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  {profile.expertise.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              )}

              <div className="w-full">
                <RichText document={profileSummary} paragraphClassName="mt-4 first:mt-0 text-base md:text-lg leading-relaxed" />
              </div>

              {profile?.cta?.url && profile?.cta?.label && (
                <div className="mt-2 flex items-center justify-center md:justify-start">
                  {/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(profile.cta.url) ? (
                    <ObfuscatedEmail email={profile.cta.url} label={profile.cta.label} />
                  ) : (
                    <a
                      href={profile.cta.url}
                      target={profile.cta.openExternal ? "_blank" : undefined}
                      rel={profile.cta.openExternal ? "noopener noreferrer" : undefined}
                      className="squircle-sm inline-flex items-center gap-2 border border-shadow-grey-200 bg-shadow-grey-900 px-6 py-4 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-shadow-grey-800 dark:border-shadow-grey-800 dark:bg-white dark:text-shadow-grey-950 dark:hover:bg-shadow-grey-100"
                    >
                      {profile.cta.label}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {hasSocialLinks && socialLinksPosition === "hero" && (
            <div className="mt-16 flex flex-wrap items-center justify-center gap-2">
              <SocialLinks
                links={socialLinks!.links!}
                displayMode={socialLinks?.socialDisplay}
              />
            </div>
          )}
        </Container>
      </Section>

      {features?.workExperience?.enabled && (
        <Section id={features.workExperience.sectionId || "experience"} className="py-16 md:py-24">
          <Container className="mx-auto max-w-6xl px-6">
            <div className="space-y-8">
              <div className="flex items-end justify-between gap-6">
                {features?.workExperience?.showSectionTitle && (
                  <H2 className="">{features.workExperience.sectionTitle || "Experience"}</H2>
                )}
              </div>
              <ExperienceList items={experienceItems} />

              {sortedExperience.length === 0 && (
                <p className="text-sm text-shadow-grey-600 dark:text-shadow-grey-300">No experience found.</p>
              )}
            </div>
          </Container>
        </Section>
      )}

      {features?.projects?.enabled && (
        <Section id={features.projects.sectionId || "projects"} className="py-16 md:py-24">
          <Container className="mx-auto max-w-6xl px-6">
            <div className="space-y-8">
              <div className="flex items-end justify-between gap-6">
                {features?.projects?.showSectionTitle && (
                  <H2 className="">{features.projects.sectionTitle || "Projects"}</H2>
                )}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projectCards}

                {projects.length === 0 && <Text className="">No projects found.</Text>}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {(features?.openSource?.enabled || features?.articles?.enabled) && (
        <Section className="py-16 md:py-24">
          <Container className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              {features?.openSource?.enabled && (
                <div id={features.openSource.sectionId || "opensource"} className="space-y-6">
                  {features?.openSource?.showSectionTitle && (
                    <H2 className="text-2xl md:text-3xl">
                      {features.openSource.sectionTitle || "Open Source"}
                    </H2>
                  )}
                  <div className="space-y-3">
                    {openSource.map((oss) => (
                      <a
                        key={oss.slug}
                        href={oss.entry.link || "#"}
                        target={oss.entry.targetBlank ? "_blank" : undefined}
                        rel={oss.entry.targetBlank ? "noopener noreferrer" : undefined}
                        className="squircle block border border-shadow-grey-200 bg-shadow-grey-25 p-5 dark:border-shadow-grey-800 dark:bg-shadow-grey-950"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-2">
                              <GithubLogo size={20} className="shrink-0" />
                              <H4 className="truncate text-base">
                                {oss.entry.name}
                              </H4>
                              {oss.entry.primaryStack && (
                                <span className="shrink-0 text-sm text-shadow-grey-500 dark:text-shadow-grey-400">
                                  {oss.entry.primaryStack}
                                </span>
                              )}
                            </div>
                            <ArrowUpRight size={16} className="shrink-0 text-shadow-grey-500 dark:text-shadow-grey-400" />
                          </div>
                          {oss.entry.description && (
                            <p className="text-sm text-shadow-grey-600 dark:text-shadow-grey-300">
                              {oss.entry.description}
                            </p>
                          )}
                        </div>
                      </a>
                    ))}

                    {openSource.length === 0 && <Text className="">No open source contributions found.</Text>}
                  </div>
                </div>
              )}

              {features?.articles?.enabled && (
                <div id={features.articles.sectionId || "articles"} className="space-y-6">
                  {features?.articles?.showSectionTitle && (
                    <H2 className="text-2xl md:text-3xl">
                      {features.articles.sectionTitle || "Articles"}
                    </H2>
                  )}
                  <div className="space-y-3">
                    {articles.map((article) => (
                      <a
                        key={article.slug}
                        href={article.entry.externalUrl || "#"}
                        target={article.entry.targetBlank ? "_blank" : undefined}
                        rel={article.entry.targetBlank ? "noopener noreferrer" : undefined}
                        className="group flex items-center justify-between rounded-2xl bg-shadow-grey-50 p-4 transition-colors hover:bg-shadow-grey-100 dark:bg-shadow-grey-900 dark:hover:bg-shadow-grey-800"
                      >
                        <H4 className="text-base font-medium">
                          {article.entry.title}
                        </H4>
                        <ArrowUpRight 
                          size={18} 
                          className="text-shadow-grey-400 opacity-0 transition-all duration-300 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 dark:text-shadow-grey-500" 
                        />
                      </a>
                    ))}

                    {articles.length === 0 && <Text className="">No articles found.</Text>}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}



      {(features?.contact?.enabled ?? true) && (
        <Section id={features?.contact?.sectionId || "contact"} className={hasSocialLinks && socialLinksPosition === "bottom" ? "pt-16 md:pt-24" : "py-16 md:py-24"}>
          <Container className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-center text-center">
              {(features?.contact?.showSectionTitle ?? true) && (
                <H2 className="">{features?.contact?.sectionTitle || "Get in Touch"}</H2>
              )}
              <div className="mt-8">
                {contactBody}
              </div>
            </div>
        </Container>
      </Section>
      )}

      {hasSocialLinks && socialLinksPosition === "bottom" && (
        <Section className="py-16 md:py-24">
          <Container className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <SocialLinks
                links={socialLinks!.links!}
                displayMode={socialLinks?.socialDisplay}
              />
            </div>
          </Container>
        </Section>
      )}
      <div className="py-10">
        <a href="/llms.txt" className="mx-auto block w-fit text-sm text-shadow-grey-500 hover:text-shadow-grey-900 hover:underline dark:text-shadow-grey-400 dark:hover:text-shadow-grey-50">
          llms.txt
        </a>
      </div>
    </main>
  );
}
