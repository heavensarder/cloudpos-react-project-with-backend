import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api.ts';

interface SEOProps {
  page: string;
}

interface SeoData {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  schema_markup?: string;
  canonical_url?: string;
  robots?: string;
  og_type?: string;
  twitter_card?: string;
}

const SEO: React.FC<SEOProps> = ({ page }) => {
  const [seo, setSeo] = useState<SeoData | null>(null);

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const { data } = await api.get(`/seo/${page}`);
        setSeo(data);
      } catch (error) {
        console.error('Failed to fetch SEO data', error);
      }
    };

    fetchSeo();
  }, [page]);

  if (!seo) return null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      
      {/* Robots */}
      {seo.robots && <meta name="robots" content={seo.robots} />}
      
      {/* Canonical URL */}
      {seo.canonical_url && <link rel="canonical" href={seo.canonical_url} />}

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta property="og:type" content={seo.og_type || 'website'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={seo.twitter_card || 'summary_large_image'} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}

      {/* Schema.org Structured Data */}
      {seo.schema_markup && (
        <script type="application/ld+json">
          {seo.schema_markup}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
