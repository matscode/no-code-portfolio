import { MetadataRoute } from 'next';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = process.env.NEXT_PUBLIC_NCP_APP_URL || 'http://localhost:3000';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/keystatic/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
