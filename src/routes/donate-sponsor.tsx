import { createFileRoute, Link } from '@tanstack/react-router';
import { Site, wixSiteOptions } from '@/components/wix-site';
import { Button } from '@/components/ui/button';
import { kindness, pageText, between, pageHead, donationHero } from '@/lib/wix-content';

export const Route = createFileRoute('/donate-sponsor')({
  head: () =>
    pageHead(
      'Donate / Sponsor',
      'Your kindness changes a story. Support vulnerable children through donations or child sponsorship.'
    ),
  loader: ({ context }) => context.queryClient.ensureQueryData(wixSiteOptions),
  component: Donate,
});

function Donate() {
  return (
    <Site>
      <section className="donation-hero">
        <img
          className="donation-cover"
          src={donationHero}
          alt="Happy Children's Home"
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