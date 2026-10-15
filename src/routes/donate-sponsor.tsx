import { createFileRoute, Link } from '@tanstack/react-router';
import { Site, wixSiteOptions } from '@/components/wix-site';
import { Button } from '@/components/ui/button';
import { kindness, pageText, between, pageHead, donationHero, breadcrumbSchema } from '@/lib/wix-content';

export const Route = createFileRoute('/donate-sponsor')({
  head: () => {
    const baseHead = pageHead(
      'Donate / Sponsor',
      'Your kindness changes a story. Support and sponsor vulnerable children and orphans in Kumi, Uganda through donations, school fees, and food support.',
      '/donate-sponsor'
    );
    return {
      ...baseHead,
      links: [
        ...(baseHead.links ?? []),
        { rel: 'preload', as: 'image', href: donationHero, type: 'image/webp', fetchPriority: 'high' },
      ],
    };
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(wixSiteOptions),
  component: Donate,
});

const breadcrumbs = breadcrumbSchema([{ name: 'Donate & Sponsor', path: '/donate-sponsor' }]);

function Donate() {
  return (
    <Site>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <section className="donation-hero">
        <img
          className="donation-cover"
          src={donationHero}
          alt="Children smiling at Happy Children's Home – Support and sponsor a child in Kumi, Uganda"
          width={2048}
          height={1024}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div>
          <h1>
            Your Kindness Changes
            <br />a Story
          </h1>
          <p>{kindness}</p>
        </div>
      </section>

      <section className="give-section">
        <div className="bank-transfer">
          <h3>How to Give</h3>
          <p className="bank-details">
            Bank Transfer
            <br />
            Account Name: Happy Children's Home
            <br />
            Bank: Centenary Rural Development Bank
            <br />
            Branch: Kumi Branch
            <br />
            Account number: 3205584409
          </p>
          <p>
            To sponsor a child or give items such as a school bag, uniform shoes or a blanket, please
            contact us.
          </p>
        </div>
      </section>

      <section className="support-mission">
        <h2>Support Our Mission</h2>
        <p>{between(pageText('Donate / Sponsor'), 'Support Our Mission', 'Contact Us')}</p>
        <Button asChild variant="wixOutline">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </section>
    </Site>
  );
}