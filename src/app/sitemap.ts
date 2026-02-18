import { MetadataRoute } from 'next';
import { reader } from '@/lib/keystatic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const features = await reader.singletons.features.read();
  
  // Base URL
  const baseUrl = process.env.NEXT_PUBLIC_NCP_APP_URL || 'http://localhost:3000';
  
  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // Add section anchors if enabled
  if (features?.workExperience?.enabled) {
    routes.push({
      url: `${baseUrl}/#${features.workExperience.sectionId || 'experience'}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  if (features?.projects?.enabled) {
    routes.push({
      url: `${baseUrl}/#${features.projects.sectionId || 'projects'}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  if (features?.openSource?.enabled) {
    routes.push({
      url: `${baseUrl}/#${features.openSource.sectionId || 'opensource'}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  if (features?.articles?.enabled) {
    routes.push({
      url: `${baseUrl}/#${features.articles.sectionId || 'articles'}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  if (features?.otherVentures?.enabled) {
    routes.push({
      url: `${baseUrl}/#${features.otherVentures.sectionId || 'ventures'}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return routes;
}
