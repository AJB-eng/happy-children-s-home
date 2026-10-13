import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Site,wixSiteOptions } from '@/components/wix-site';
import { Button } from '@/components/ui/button';
import { pageHead,pageText,between } from '@/lib/wix-content';

export const Route = createFileRoute('/contact')({head:()=>pageHead('Get in Touch','Contact Happy Children’s Home in Okouba Village, Kumi, Uganda.'),loader:({context})=>context.queryClient.ensureQueryData(wixSiteOptions),component:Contact});
function Contact(){const {data}=useSuspenseQuery(wixSiteOptions);return <Site><section className="contact-page"><h2>Get in Touch</h2><div className="contact-details"><h3>Phone</h3><a href={`tel:${data.phone.replace(/\s/g,'')}`}>{data.phone.replace(/\s/g,'')}</a><h3>Email</h3><a href={`mailto:${data.email}`}>{data.email}</a><h3>Address</h3><p>Omatenga Road and Okouba Village, North Division, Kumi Municipal Council, Kumi District, Uganda</p></div><Button asChild variant="donate" className="whatsapp-button"><a href="https://wa.me/256705775486" target="_blank" rel="noreferrer">WhatsApp Us</a></Button></section><section className="join-mission"><h2>Join Our Mission</h2><p>{between(pageText('Contact'),'Join Our Mission','Love, Peace, and Joy')}</p></section></Site>}