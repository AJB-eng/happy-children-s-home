import { createFileRoute } from '@tanstack/react-router';
import { Site, wixSiteOptions, CallToAction } from '@/components/wix-site';
import { homeServices, pageText, between, pageHead } from '@/lib/wix-content';

export const Route = createFileRoute('/services')({head:()=>pageHead('Our Services','Educational support, food and balanced nutrition, shelter and bedding, and essential medical care.'),loader:({context})=>context.queryClient.ensureQueryData(wixSiteOptions),component:Services});
const names=['Educational Support','Food & Balanced Nutrition','Shelter & Bedding','Essential Medical Care'];
function Services(){ const text=pageText('Services');return <Site><section className="services-page"><h2>Our Services</h2><div className="services-grid">{names.map((name,i)=><article className="service-card" key={name}><img src={homeServices[[0,1,3,4][i] ?? 0]?.icon} alt=""/><h3>{name}</h3><p>{between(text,name,names[i+1] ?? 'Your Kindness Changes a Story')}</p></article>)}</div></section><CallToAction/></Site>}