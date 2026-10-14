import { createFileRoute, Link } from '@tanstack/react-router';
import { queryOptions } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Site, wixSiteOptions, DonateButton, CallToAction, Paragraphs } from '@/components/wix-site';
import { community, brothers, martha, family, homeBlocks, homeServices, pageHead } from '@/lib/wix-content';

// Fallback mock object for wixSiteOptions when Wix context/API is unavailable on localhost
export const fallbackWixSiteOptions = queryOptions({
  queryKey: ['wix-public-site'],
  queryFn: async () => {
    try {
      if (typeof wixSiteOptions?.queryFn === 'function') {
        return await wixSiteOptions.queryFn();
      }
    } catch {
      // Ignore errors when running locally
    }
    return {
      name: "Happy Children's Home",
      email: 'happychildrenshome9@gmail.com',
      phone: '+256 705 775 486',
      description: 'Supporting education, food, healthcare, and love for vulnerable children in Kumi.',
    };
  },
  staleTime: 300_000,
});

// Fallback mock object for homeBlocks when Wix context text is missing or unavailable on localhost
export const fallbackHomeBlocks: string[] = [
  "Happy Children's Home",
  'We give back to the needy community.',
  'From Three Hungry Children to a Sanctuary of Hope: The Inspiring Rise of Kumi’s Happy Children’s Home',
  "What began in 2023 as a desperate knock on a personal compound door in Kumi by three young, abandoned brothers looking for chores in exchange for a meal has blossomed into a vital lifeline for over 40 vulnerable youth. Happy Children’s Home has transformed from a single household's act of compassion into a thriving sanctuary, rescuing orphans and children of single mothers from the grips of extreme poverty, child labor, and family breakdown to restore their dignity through education, healthcare, and unconditional love.",
  'From Child Labor to Learning: 14-Year-Old Martha’s Battle for Her Siblings’ Future Sparks Urgent Call for Community Support',
  'When a tragic construction accident left her father paralyzed, 14-year-old Martha and her brother Isaac were forced into manual labor in community gardens just to buy basic school supplies and feed their family. Now, backed by the lifeline of Happy Children’s Home, this resilient young girl and her three siblings are fighting to escape the cycle of extreme hardship, prompting a powerful community appeal for school fees, medical care, and necessities to protect their right to an education and restore their chance to dream.',
];

export const Route = createFileRoute('/')({
  head: () =>
    pageHead(
      'Home',
      'We give back to the needy community. Supporting education, food, healthcare, and love for vulnerable children in Kumi.'
    ),
  // Option 1: Commented out loader for running purely client-side without Wix context:
  // loader: ({ context }) => context.queryClient.ensureQueryData(wixSiteOptions),

  // Option 2: Fallback mock query data so route loader succeeds on localhost:
  loader: ({ context }) => context.queryClient.ensureQueryData(fallbackWixSiteOptions),
  component: Index,
});

function Index() {
  const blocks = Array.isArray(homeBlocks) && homeBlocks.length >= 4 ? homeBlocks : fallbackHomeBlocks;

  const storyTitle = blocks[2] ?? fallbackHomeBlocks[2];
  const storyBody = blocks[3] ?? fallbackHomeBlocks[3];
  const rawMarthaTitle =
    blocks.find((t) => t?.includes('From Child Labor')) ?? fallbackHomeBlocks[4];
  const marthaTitle = rawMarthaTitle.replace(/^See All Services\s*/i, '').trim();
  const marthaStory =
    blocks.find((t) => t?.includes('When a tragic')) ?? fallbackHomeBlocks[5];

  return (
    <Site>
      <section className="home-opening">
        <div className="home-actions">
          <DonateButton>Donate Now</DonateButton>
          <Button asChild variant="wixOutline" className="program-button">
            <Link to="/services">Explore Our Programs</Link>
          </Button>
        </div>
        <img
          className="community-image"
          src={community}
          alt="Happy Children's Home community gathering"
          width={741}
          height={375}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </section>

      <section className="statistics">
        <div>
          <strong>2023</strong>
          <h3>Year Established</h3>
        </div>
        <div>
          <strong>40+</strong>
          <h3>Children Under Care</h3>
        </div>
        <div>
          <strong>3 to 40</strong>
          <h3>Our Growth Story</h3>
        </div>
      </section>

      <section className="home-story">
        <p className="story-eyebrow">We give back to the needy community.</p>
        <div className="story-grid">
          <div>
            <h2 data-reveal>{storyTitle}</h2>
            <div data-reveal>
              <Paragraphs text={storyBody ?? ''} />
              <Button asChild variant="wixOutline">
                <Link to="/about">Read Our Story</Link>
              </Button>
            </div>
          </div>
          <img
            src={brothers}
            alt="Allan, Shadrack, and Elvis"
            width={521}
            height={286}
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="home-services">
        <h2>What We Do</h2>
        <div className="home-service-grid">
          {homeServices?.map((s) => (
            <article className="service-card" key={s.name}>
              <img
                src={s.icon}
                alt={s.name}
                width={26}
                height={24}
                loading="lazy"
                decoding="async"
              />
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </article>
          ))}
        </div>
        <Button asChild variant="wixOutline" className="text-action">
          <Link to="/services">See All Services</Link>
        </Button>
      </section>

      <section className="martha-story">
        <div className="martha-images">
          <img
            className="martha-portrait"
            src={martha}
            alt="Martha"
            width={361}
            height={513}
            loading="lazy"
            decoding="async"
          />
          <img
            className="family-image"
            src={family}
            alt="Martha and her family"
            width={638}
            height={283}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="martha-copy">
          <h2 data-reveal>{marthaTitle}</h2>
          <p data-reveal>{marthaStory}</p>
          <Button asChild variant="wixOutline">
            <Link to="/about" hash="martha">
              Read Martha's Story
            </Link>
          </Button>
        </div>
      </section>

      <CallToAction />

      <section className="home-contact">
        <Button asChild variant="wixOutline" className="text-action">
          <a href="https://wa.me/256705775486" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </Button>
        <Button asChild variant="wixOutline" className="text-action">
          <a href="mailto:happychildrenshome9@gmail.com">Email Us</a>
        </Button>
        <Button asChild variant="wixOutline" className="text-action">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </section>
    </Site>
  );
}
