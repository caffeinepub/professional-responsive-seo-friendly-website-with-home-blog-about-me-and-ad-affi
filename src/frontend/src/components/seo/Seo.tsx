import { useEffect } from 'react';
import { siteConfig } from '../../lib/siteConfig';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  path?: string;
}

export function Seo({
  title,
  description = siteConfig.description,
  image = siteConfig.defaultImage,
  type = 'website',
  publishedTime,
  path = '',
}: SeoProps) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const canonicalUrl = `${siteConfig.url}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.href = href;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('robots', 'index,follow');

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', siteConfig.name, true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Article specific tags
    if (type === 'article' && publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true);
    }

    // Canonical URL
    updateLinkTag('canonical', canonicalUrl);
  }, [fullTitle, description, image, type, publishedTime, canonicalUrl]);

  return null;
}
