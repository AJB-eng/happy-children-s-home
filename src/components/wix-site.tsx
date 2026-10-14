import { Link } from '@tanstack/react-router';
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { getWixSite } from '@/lib/wix.functions';
import { logo, kindness } from '@/lib/wix-content';
import { useEffect, useState, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

export const fallbackWixSiteData = {
  name: "Happy Children's Home",
  email: 'happychildrenshome9@gmail.com',
  phone: '+256 705 775 486',
  description: 'Supporting education, food, healthcare, and love for vulnerable children in Kumi.',
};

export const wixSiteOptions = queryOptions({
  queryKey: ['wix-public-site'],
  queryFn: async () => {
    try {
      return await getWixSite();
    } catch (err) {
      console.warn('Wix context/API unavailable on localhost, using fallback mock site data:', err);
      return fallbackWixSiteData;
    }
  },
  staleTime: 300_000,
});
const navigation = [['Home','/'],['About','/about'],['Services','/services'],['Donate / Sponsor','/donate-sponsor'],['Contact','/contact']] as const;
export function Site({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((element) => {
      element.classList.add('reveal-ready');
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [children]);

  const { data } = useSuspenseQuery(wixSiteOptions);
  const phone = data.phone.replace(/\s/g, '');

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to Main Content
      </a>
      <header className="site-header">
        <Link to="/" className="site-logo">
          <img src={logo} alt="Happy Children's Home" />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
        <nav
          id="site-navigation"
          className={menuOpen ? 'menu-open' : ''}
          aria-label="Main navigation"
        >
          {navigation.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              activeProps={{ className: 'active' }}
              activeOptions={{ exact: true }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main id="main">{children}</main>

      <footer className="site-footer">
        <div className="footer-columns">
          <div>
            <Link to="/">
              <img src={logo} alt="Happy Children's Home" className="footer-logo" />
            </Link>
          </div>
          <div className="footer-address">
            <h3>
              Community-Based
              <br />
              Organisation
            </h3>
            <p>
              Okouba Village on Omatenga Road , North Division, Kumi Municipal Council, Kumi
              District, Uganda.
            </p>
          </div>
          <div className="footer-contact">
            <a href={`tel:${phone}`}>
              {data.phone === '+256705 775486' ? '+256 705 775 486' : data.phone}
            </a>
            <a href={`mailto:${data.email}`}>{data.email}</a>
          </div>
        </div>

        <p className="footer-motto">Love, Peace, and Joy</p>
        <h2 className="footer-title">{data.name.toUpperCase()}</h2>

        <div className="footer-bottom">
          <p>© 2026 Happy Children's Home. All rights reserved.</p>
          <div>
            <a href="https://barungijoshua.wixsite.com/happy-childrens-hom/privacy-policy">
              Privacy Policy
            </a>
            <a href="https://barungijoshua.wixsite.com/happy-childrens-hom/terms-of-service">
              Terms of
              <br /> Service
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export function DonateButton({ children = 'Donate / Sponsor a Child' }: { children?: ReactNode }) {
  return (
    <Button asChild variant="donate" className="wix-donate">
      <Link to="/donate-sponsor">{children}</Link>
    </Button>
  );
}

export function CallToAction({ description = false }: { description?: boolean }) {
  return (
    <section className="kindness-band">
      <h2>Your Kindness Changes a Story</h2>
      {description && <p>{kindness}</p>}
      <DonateButton />
    </section>
  );
}

export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((p, i) => (
          <p key={i}>{p}</p>
        ))}
    </>
  );
}