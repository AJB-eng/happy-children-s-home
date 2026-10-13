import { Link } from '@tanstack/react-router';
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { getWixSite } from '@/lib/wix.functions';
import { logo, kindness } from '@/lib/wix-content';
import type { ReactNode } from 'react';

export const wixSiteOptions = queryOptions({queryKey:['wix-public-site'],queryFn:() => getWixSite(),staleTime:300_000});
const navigation = [['Home','/'],['About','/about'],['Services','/services'],['Donate / Sponsor','/donate-sponsor'],['Contact','/contact']] as const;
export function Site({children}: {children: ReactNode}) {
  const {data} = useSuspenseQuery(wixSiteOptions);
  const phone = data.phone.replace(/\s/g,'');
  return <><a href="#main" className="skip-link">Skip to Main Content</a><header className="site-header"><div className="wix-banner">Built on <strong>WIX</strong> Harmony</div><Link to="/" className="site-logo"><img src={logo} alt="Happy Children's Home" /></Link><nav aria-label="Main navigation">{navigation.map(([label,path]) => <Link key={path} to={path} activeProps={{className:'active'}} activeOptions={{exact:true}}>{label}</Link>)}</nav></header><main id="main">{children}</main><footer className="site-footer"><div className="footer-columns"><div><Link to="/"><img src={logo} alt="Happy Children's Home" className="footer-logo" /></Link></div><div className="footer-address"><h3>Community-Based<br/>Organisation</h3><p>Okouba Village on Omatenga Road , North Division, Kumi Municipal Council, Kumi District, Uganda.</p></div><div className="footer-contact"><a href={`tel:${phone}`}>{data.phone === '+256705 775486' ? '+256 705 775 486' : data.phone}</a><a href={`mailto:${data.email}`}>{data.email}</a></div></div><p className="footer-motto">Love, Peace, and Joy</p><h2 className="footer-title">{data.name.toUpperCase()}</h2><div className="footer-bottom"><p>© 2026 Happy Children's Home. All rights reserved.</p><div><a href="#" onClick={e=>e.preventDefault()}>Privacy Policy</a><a href="#" onClick={e=>e.preventDefault()}>Terms of<br/> Service</a></div></div></footer></>;
}
export function DonateButton({children='Donate / Sponsor a Child'}:{children?:ReactNode}) { return <Button asChild variant="donate" className="wix-donate"><Link to="/donate-sponsor">{children}</Link></Button>; }
export function CallToAction({description=false}:{description?:boolean}) { return <section className="kindness-band"><h2>Your Kindness Changes a Story</h2>{description && <p>{kindness}</p>}<DonateButton/></section>; }
export function Paragraphs({text}:{text:string}) {return <>{text.split(/\n\s*\n/).filter(Boolean).map((p,i)=><p key={i}>{p}</p>)}</>;}