import { reader } from "@/lib/keystatic";
import { NextResponse } from "next/server";
import { buildDescription } from "@/helpers/buildDescription";
import { sortWorkExperience } from "@/helpers/sortWorkExperience";

export async function GET() {
  const [profile, contact, features, socialLinks] = await Promise.all([
    reader.singletons.profile.read(),
    reader.singletons.contact.read(),
    reader.singletons.features.read(),
    reader.singletons.socialLinks.read(),
  ]);

  const profileSummary = profile?.summary ? await profile.summary() : [];

  const [projects, openSource, articles, workExperience] = await Promise.all([
    features?.projects?.enabled ? reader.collections.projects.all() : [],
    features?.openSource?.enabled ? reader.collections.openSource.all() : [],
    features?.articles?.enabled ? reader.collections.articles.all() : [],
    features?.workExperience?.enabled ? reader.collections.workExperience.all() : [],
  ]);

  const sortedExperience = sortWorkExperience(workExperience);

  const baseUrl = process.env.NEXT_PUBLIC_NCP_APP_URL || "http://localhost:3000";
  const name = profile?.name || "Your Name";
  const title = profile?.title || "Who Are You?";
  const description = buildDescription(profileSummary);

  const expertise = profile?.expertise?.filter(Boolean) ?? [];

  const lines: string[] = [];

  lines.push(`# ${name} - ${title}`, "", `> ${title}`, "");

  lines.push("## Bio");
  lines.push(description || "");
  lines.push("");

  lines.push("## Expertise");
  if (expertise.length > 0) {
    lines.push(...expertise.map((skill) => `- ${skill}`));
  } else {
    lines.push("- Software Engineering");
  }
  lines.push("");

  if (features?.contact?.enabled ?? true) {
    lines.push("## Contact");
    lines.push(`- Website: ${baseUrl}`);
    if (contact?.email?.enabled && contact.email.address) {
      lines.push("- Email: Contact via website form");
    }
    const socialUrls = socialLinks?.links?.map((l) => l.url).filter(Boolean) ?? [];
    if (socialUrls.length > 0) {
      lines.push(...socialUrls.map((url) => `- ${url}`));
    }
    lines.push("");
  }

  if (features?.workExperience?.enabled) {
    lines.push("## Work Experience");
    if (sortedExperience.length > 0) {
      lines.push(
        ...sortedExperience.map((job) => {
          const year = job.entry.startDate ? new Date(job.entry.startDate).getFullYear() : "";
          const yearSuffix = year ? ` (${year})` : "";
          return `- ${job.entry.role} at ${job.entry.company}${yearSuffix}`;
        }),
      );
    } else {
      lines.push("- No work experience found.");
    }
    lines.push("");
  }

  if (features?.projects?.enabled) {
    lines.push("## Projects");
    if (projects.length > 0) {
      lines.push(
        ...projects.map((project) => {
          const titlePart = project.entry.title;
          const liveUrl = project.entry.liveUrl ? ` — ${project.entry.liveUrl}` : "";
          const githubUrl = project.entry.githubUrl ? ` (GitHub: ${project.entry.githubUrl})` : "";
          return `- ${titlePart}${liveUrl}${githubUrl}`;
        }),
      );
    } else {
      lines.push("- No projects found.");
    }
    lines.push("");
  }

  if (features?.openSource?.enabled) {
    lines.push("## Open Source");
    if (openSource.length > 0) {
      lines.push(
        ...openSource.map((repo) => {
          const namePart = repo.entry.name;
          const linkPart = repo.entry.link ? ` — ${repo.entry.link}` : "";
          const stackPart = repo.entry.primaryStack ? ` (${repo.entry.primaryStack})` : "";
          const descPart = repo.entry.description ? `: ${repo.entry.description}` : "";
          return `- ${namePart}${linkPart}${stackPart}${descPart}`;
        }),
      );
    } else {
      lines.push("- No open source projects found.");
    }
    lines.push("");
  }

  if (features?.articles?.enabled) {
    lines.push("## Articles");
    if (articles.length > 0) {
      lines.push(
        ...articles.map((article) => {
          const urlPart = article.entry.externalUrl ? ` — ${article.entry.externalUrl}` : "";
          return `- ${article.entry.title}${urlPart}`;
        }),
      );
    } else {
      lines.push("- No articles found.");
    }
    lines.push("");
  }

  lines.push("## Navigation");
  lines.push("- / - Home and Portfolio");
  lines.push("- /llms.txt - LLM Reference");
  if (features?.workExperience?.enabled) {
    lines.push(
      `- /#${features.workExperience.sectionId || "experience"} - ${features.workExperience.sectionTitle || "Experience"}`,
    );
  }
  if (features?.projects?.enabled) {
    lines.push(`- /#${features.projects.sectionId || "projects"} - ${features.projects.sectionTitle || "Projects"}`);
  }
  if (features?.openSource?.enabled) {
    lines.push(
      `- /#${features.openSource.sectionId || "opensource"} - ${features.openSource.sectionTitle || "Open Source"}`,
    );
  }
  if (features?.articles?.enabled) {
    lines.push(`- /#${features.articles.sectionId || "articles"} - ${features.articles.sectionTitle || "Articles"}`);
  }
  if (features?.contact?.enabled ?? true) {
    lines.push(`- /#${features?.contact?.sectionId || "contact"} - ${features?.contact?.sectionTitle || "Contact"}`);
  }

  const content = lines.join("\n").trimEnd() + "\n";

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
