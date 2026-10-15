import { createFileRoute } from '@tanstack/react-router';
import { Site, wixSiteOptions, CallToAction } from '@/components/wix-site';
import { servicePhotos, pageText, between, pageHead, breadcrumbSchema } from '@/lib/wix-content';

export const Route = createFileRoute('/services')({
  head: () =>
    pageHead(
      'Our Services',
      'Explore our core outreach programs: educational support, balanced nutrition, safe shelter, and medical care for children in Kumi, Uganda.',
      '/services'
    ),
  loader: ({ context }) => context.queryClient.ensureQueryData(wixSiteOptions),
  component: Services,
});

const names = [
  'Educational Support',
  'Food & Balanced Nutrition',
  'Shelter & Bedding',
  'Essential Medical Care',
];

const serviceAlts: Record<string, string> = {
  'Educational Support': 'Educational Support – School fees, exercise books, uniforms, and scholastic supplies in Kumi',
  'Food & Balanced Nutrition': 'Food and Balanced Nutrition – Nutritious daily meals for orphans and vulnerable children',
  'Shelter & Bedding': 'Safe Shelter and Bedding – Clean accommodations, mattresses, blankets, and protective mosquito nets',
  'Essential Medical Care': 'Essential Medical Care – Emergency healthcare, checkups, and wellness clinic support',
};

const breadcrumbs = breadcrumbSchema([{ name: 'Our Services', path: '/services' }]);

function Services() {
  const text = pageText('Services');
  return (
    <Site>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <section className="services-page">
        <h1>Our Services</h1>
        <div className="services-grid">
          {names.map((name, i) => (
            <article className="service-card" key={name}>
              <img
                src={servicePhotos[i]}
                alt={serviceAlts[name] ?? `${name} program at Happy Children's Home`}
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
              />
              <h3>{name}</h3>
              <p>{between(text, name, names[i + 1] ?? 'Your Kindness Changes a Story')}</p>
            </article>
          ))}
        </div>
      </section>
      <CallToAction />
    </Site>
  );
}