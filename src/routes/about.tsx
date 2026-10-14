import { createFileRoute } from '@tanstack/react-router';
import { Site, wixSiteOptions, Paragraphs, CallToAction } from '@/components/wix-site';
import {
  pageText,
  between,
  brothers,
  family,
  community,
  aboutFood,
  aboutChildren,
  founderIrene,
  founderJoseph,
  certificate,
  pageHead,
} from '@/lib/wix-content';

export const Route = createFileRoute('/about')({
  head: () =>
    pageHead(
      'Our Story',
      'From three children to forty: the story of Happy Children’s Home in Kumi, Uganda.'
    ),
  loader: ({ context }) => context.queryClient.ensureQueryData(wixSiteOptions),
  component: About,
});

const text = pageText('About');

function About() {
  return (
    <Site>
      <section className="about-intro">
        <h1>Our Story</h1>
        <p>{between(text, 'Our Story', 'It Started With Three Children')}</p>
      </section>

      <section className="about-start">
        <h2>It Started With Three Children</h2>
        <Paragraphs text={between(text, 'It Started With Three Children', 'From Three to Forty')} />
      </section>

      <img
        src={brothers}
        className="about-brothers"
        alt="Allan, Shadrack, and Elvis"
        width={1281}
        height={584}
        loading="lazy"
        decoding="async"
      />

      <section className="about-growth">
        <h2>From Three to Forty</h2>
        <Paragraphs text={between(text, 'From Three to Forty', "Martha's Journey")} />
      </section>

      <section id="martha" className="about-martha">
        <h2>Martha's Journey</h2>
        <Paragraphs text={between(text, "Martha's Journey", 'Meet the Founders')} />
        <img
          src={family}
          alt="Martha and her siblings"
          width={638}
          height={283}
          loading="lazy"
          decoding="async"
        />
      </section>

      <section className="about-community">
        <img
          src={community}
          alt="Happy Children's Home Community"
          width={741}
          height={610}
          loading="lazy"
          decoding="async"
        />
        <div>
          <img
            src={aboutFood}
            className="about-food"
            alt="Nutritious food distribution"
            width={715}
            height={291}
            loading="lazy"
            decoding="async"
          />
          <img
            src={aboutChildren}
            className="about-children"
            alt="Children of Happy Children's Home"
            width={681}
            height={291}
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="founders-section">
        <h2>Meet the Founders</h2>
        <div className="founders-grid">
          {[
            ['Lanyero Irene Okot', 'FOUNDER', 'Opio Joseph Ekodeu', founderIrene],
            ['Opio Joseph Ekodeu', 'CO-FOUNDER', 'Our Legal Status', founderJoseph],
          ].map(([name, role, end, img]) => (
            <article className="founder" key={name as string}>
              <img
                className="founder-photo"
                src={img as string}
                alt={name as string}
                width={500}
                height={500}
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{name as string}</h3>
                <h4>{role as string}</h4>
                <Paragraphs text={between(text, `${name}\n${role}`, (end as string) ?? '')} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="legal-status">
        <div>
          <h2>Our Legal Status</h2>
          <Paragraphs text={between(text, 'Our Legal Status', 'Your Kindness Changes a Story')} />
        </div>
        <img
          className="certificate-photo"
          src={certificate}
          alt="Official Registration Certificate"
          width={500}
          height={347}
          loading="lazy"
          decoding="async"
        />
      </section>

      <CallToAction description />
    </Site>
  );
}