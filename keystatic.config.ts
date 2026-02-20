import { config, fields, collection, singleton } from '@keystatic/core';

const storageKind = process.env.NEXT_PUBLIC_NCP_STORAGE_KIND?.trim().toLowerCase() || 'local';

export default config({
  storage: storageKind === 'local' ? {
    kind: 'local',
  } : {
    kind: 'github',
    repo: `${process.env.NEXT_PUBLIC_NCP_GITHUB_USERNAME}/${process.env.NEXT_PUBLIC_NCP_REPO_NAME || 'no-code-portfolio'}` as `${string}/${string}`,
  },
  ui: {
    brand: {
      name: 'NCP Admin',
    },
    navigation: {
      'Basic': ['profile', 'socialLinks', 'contact'],
      'Content': ['workExperience', 'projects', 'openSource', 'articles'],
      'Settings': ['features', 'globalNav', 'siteConfig', 'analytics'],
    },
  },
  collections: {
    workExperience: collection({
      label: 'Work Experience',
      slugField: 'role',
      path: 'ncp/content/work/*/',
      format: { contentField: 'impact' },
      columns: ['role', 'company', 'startDate'],
      schema: {
        role: fields.slug({ name: { label: 'Role', validation: { isRequired: true } } }),
        company: fields.text({ label: 'Company', validation: { isRequired: true } }),
        companyUrl: fields.url({ label: 'Company URL' }),
        companyLocation: fields.text({ label: 'Location' }),
        startDate: fields.date({ label: 'Start Date' }),
        endDate: fields.date({ label: 'End Date' }),
        current: fields.checkbox({ label: 'Current Role', defaultValue: false, description: 'Check this if you currently work here. This marks the role as ongoing.' }),
        impact: fields.document({
          label: 'Impact / Description',
          formatting: {
            inlineMarks: {
              bold: true,
              italic: true,
              strikethrough: true,
            },
            listTypes: {
              ordered: true,
              unordered: true,
            },
          },
          links: true,
        }),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'ncp/content/projects/*/',
      format: { contentField: 'summary' },
      columns: ['title', 'liveUrl'],
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/ncp/images/projects',
          publicPath: '/ncp/images/projects',
          description: 'Use compressed JPG/WEBP under ~500KB for fast loads. Resize/compress with Squoosh (squoosh.app).',
        }),
        stack: fields.array(fields.text({ label: 'Stack Item', validation: { isRequired: true }, description: 'Tools used to deliver the project (e.g., React, Figma, Blender).' }), {
          label: 'Stack',
          itemLabel: (props) => props.value,
        }),
        liveUrl: fields.url({ label: 'Live URL' }),
        githubUrl: fields.url({ label: 'GitHub URL', description: 'Optional. Provide a repository link if this is a technical project.' }),
        summary: fields.document({
          label: 'Summary',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    openSource: collection({
      label: 'Open Source',
      slugField: 'name',
      path: 'ncp/content/oss/*/',
      columns: ['name', 'primaryStack'],
      schema: {
        name: fields.slug({ name: { label: 'Name', validation: { isRequired: true } } }),
        link: fields.url({ label: 'Link', validation: { isRequired: true } }),
        description: fields.text({ label: 'Description', multiline: true }),
        primaryStack: fields.text({ label: 'Primary Stack', description: 'Can be Javascript, Figma or Blender' }),
        targetBlank: fields.checkbox({ label: 'Open in new tab', defaultValue: true }),
      },
    }),
    articles: collection({
      label: 'External Articles',
      slugField: 'title',
      path: 'ncp/content/articles/*/',
      columns: ['title', 'externalUrl'],
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
        externalUrl: fields.url({ label: 'External Article URL', validation: { isRequired: true } }),
        targetBlank: fields.checkbox({ label: 'Open in new tab', defaultValue: true }),
      },
    }),
  },
  singletons: {
    profile: singleton({
      label: 'Profile',
      path: 'ncp/content/profile/',
      format: { contentField: 'summary' },
      schema: {
        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
        title: fields.text({ label: 'Title / Role', description: 'Keep this short and specific (e.g.,  Content Creator, Product Designer, Software Engineer).' }),
        summary: fields.document({
          label: 'Professional Summary',
          formatting: {
            inlineMarks: {
              bold: true,
              italic: true,
              strikethrough: true,
            },
          },
          links: true,
        }),
        photo: fields.image({
          label: 'Photo',
          directory: 'public/ncp/images/profile',
          publicPath: '/ncp/images/profile',
          description: 'Use compressed JPG/WEBP under ~500KB for fast loads. Resize/compress with Squoosh (squoosh.app).',
        }),
        expertise: fields.array(fields.text({ label: 'Area of Expertise' }), {
          label: 'Areas of Expertise',
          description: 'Use these like tags to highlight your core values, principles, causes, or focus areas.',
          itemLabel: (props) => props.value,
        }),
        cta: fields.object({
          label: fields.text({ label: 'Label' }),
          url: fields.text({
            label: 'URL or Email Address',
            validation: {
              pattern: {
                regex:
                  /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|https?:\/\/\S+|\/\S*|#\S+)$/,
                message: 'Enter a URL (https://..., /path, #anchor) or an email address (name@domain.com).',
              },
            },
          }),
          openExternal: fields.checkbox({ label: 'Open in new tab', defaultValue: false }),
        }, {
          label: 'Call to Action',
          description: 'The primary button shown in the profile section',
        }),
      },
    }),
    contact: singleton({
      label: 'Contact Options',
      path: 'ncp/content/contact/',
      schema: {
        email: fields.object({
          enabled: fields.checkbox({ label: 'Enabled', defaultValue: true }),
          address: fields.text({ label: 'Email Address', validation: { isRequired: true, pattern: { regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Please enter a valid email address' } } }),
          label: fields.text({ label: 'Email Button Label', defaultValue: 'Send an Email' }),
        }, { label: 'Email Settings' }),
      },
    }),
    socialLinks: singleton({
      label: 'Social Links',
      path: 'ncp/content/socials/',
      schema: {
        position: fields.select({
          label: 'Social Links Position',
          options: [
            { label: 'Hero', value: 'hero' },
            { label: 'Bottom', value: 'bottom' },
          ],
          defaultValue: 'bottom',
        }),
        socialDisplay: fields.select({
          label: 'Social Links Display',
          options: [
            { label: 'Icon Only', value: 'icon' },
            { label: 'Text Only', value: 'text' },
            { label: 'Icon + Text', value: 'both' },
          ],
          defaultValue: 'both',
        }),
        links: fields.array(
          fields.object({
            url: fields.url({ label: 'URL', validation: { isRequired: true } }),
            openExternal: fields.checkbox({ label: 'Open in new tab', defaultValue: true }),
          }),
          {
            label: 'Social Links',
            itemLabel: (props) => props.fields.url.value || 'Link',
          }
        ),
      },
    }),
    features: singleton({
      label: 'Features',
      path: 'ncp/core/features/',
      schema: {
        workExperience: fields.object({
          enabled: fields.checkbox({ label: 'Work Experience', defaultValue: true }),
          sectionId: fields.text({ label: 'Section ID', defaultValue: 'experience', description: 'Unique ID for navigation scrolling' }),
          sectionTitle: fields.text({ label: 'Section Title', defaultValue: 'Experience', description: 'Edit the heading text (e.g., Experience, Resume, Work History).' }),
          showSectionTitle: fields.checkbox({ label: 'Show Section Title', defaultValue: true, description: 'Toggle the heading on/off for a cleaner link-in-bio layout.' }),
        }, { label: 'Work Experience' }),
        projects: fields.object({
          enabled: fields.checkbox({ label: 'Projects', defaultValue: true }),
          sectionId: fields.text({ label: 'Section ID', defaultValue: 'projects', description: 'Unique ID for navigation scrolling' }),
          sectionTitle: fields.text({ label: 'Section Title', defaultValue: 'Projects', description: 'Rename for a link-in-bio focus (e.g., YouTube Videos, Client Work, Resource Links).' }),
          showSectionTitle: fields.checkbox({ label: 'Show Section Title', defaultValue: true, description: 'Toggle the heading on/off for a cleaner link-in-bio layout.' }),
        }, { label: 'Projects' }),
        openSource: fields.object({
          enabled: fields.checkbox({ label: 'Open Source', defaultValue: false }),
          sectionId: fields.text({ label: 'Section ID', defaultValue: 'opensource', description: 'Unique ID for navigation scrolling' }),
          sectionTitle: fields.text({ label: 'Section Title', defaultValue: 'Open Source', description: 'Rename to fit your use (e.g., Templates, Tools, Freebies).' }),
          showSectionTitle: fields.checkbox({ label: 'Show Section Title', defaultValue: true, description: 'Toggle the heading on/off for a cleaner link-in-bio layout.' }),
        }, { label: 'Open Source' }),
        articles: fields.object({
          enabled: fields.checkbox({ label: 'Articles', defaultValue: true }),
          sectionId: fields.text({ label: 'Section ID', defaultValue: 'articles', description: 'Unique ID for navigation scrolling' }),
          sectionTitle: fields.text({ label: 'Section Title', defaultValue: 'Articles', description: 'Rename for your content (e.g., Articles, Guides, Reads, Blog).' }),
          showSectionTitle: fields.checkbox({ label: 'Show Section Title', defaultValue: true, description: 'Toggle the heading on/off for a cleaner link-in-bio layout.' }),
        }, { label: 'Articles' }),
        contact: fields.object({
          enabled: fields.checkbox({ label: 'Contact / Get in Touch', defaultValue: true }),
          sectionId: fields.text({ label: 'Section ID', defaultValue: 'contact', description: 'Unique ID for navigation scrolling' }),
          sectionTitle: fields.text({ label: 'Section Title', defaultValue: 'Get in Touch', description: 'Edit the heading text (e.g., Contact, Links, Say Hello).' }),
          showSectionTitle: fields.checkbox({ label: 'Show Section Title', defaultValue: true, description: 'Toggle the heading on/off for a cleaner link-in-bio layout.' }),
        }, { label: 'Contact Section' }),
      },
    }),
    analytics: singleton({
      label: 'Analytics',
      path: 'ncp/core/analytics/',
      schema: {
        googleAnalyticsId: fields.text({ label: 'Google Analytics ID (G-XXXXXXXXXX)', description: 'Tracks site traffic in Google Analytics (example: G-1A2B3C4D5E).' }),
        googleTagManagerId: fields.text({ label: 'Google Tag Manager ID (GTM-XXXXXXX)', description: 'Loads tags and scripts via Google Tag Manager (example: GTM-ABCDE12).' }),
      },
    }),
    siteConfig: singleton({
      label: 'Configuration',
      path: 'ncp/core/settings/',
      schema: {
        defaultTheme: fields.select({
          label: 'Default Theme',
          description: 'Sets the initial theme. Choose Dark/Light for a fixed look, or System to follow the user’s OS setting.',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
            { label: 'System', value: 'system' },
          ],
          defaultValue: 'light',
        }),
      },
    }),
    globalNav: singleton({
      label: 'Global Navigation',
      path: 'ncp/core/navigation/',
      schema: {
        enableNavigation: fields.checkbox({ label: 'Enable Navigation', defaultValue: true }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label', validation: { isRequired: true } }),
            url: fields.text({ label: 'URL', validation: { isRequired: true }, description: 'Use a full URL, a page path, or a section anchor (e.g., https://site.com, /about, #projects).' }),
            targetBlank: fields.checkbox({ label: 'Open in new tab', defaultValue: false }),
          }),
          {
            label: 'Nav Links',
            itemLabel: (props) => props.fields.label.value,
            description: 'Available Section IDs: experience, projects, opensource, articles. Check "Features" settings to customize them.',
          }
        ),
      },
    }),
  },
});
