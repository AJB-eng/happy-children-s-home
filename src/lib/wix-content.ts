import published from '@/data/wix-published.json';
import assets from '@/data/wix-assets.json';

export const originalUrl = 'https://barungijoshua.wixsite.com/happy-childrens-hom';
export function image(id: string) {
  if (!id) return '';
  return (assets as Record<string, string>)[id] ?? `/assets/${id.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`;
}
export const logo = image('1ea502_2d64a9f7aaf249f3aefd64de277cf45a~mv2.png');
export const community = image('1ea502_953c8f2aaac54d5d9b3f15fb956355db~mv2.jpeg');
export const brothers = image('1ea502_65c2653d114f42f8a0696299937f6ffe~mv2.jpg');
export const martha = image('1ea502_2defa128406b41d188e2d065583baa18~mv2.jpeg');
export const family = image('1ea502_54c1bad725d143b393d09677fae9f38d~mv2.jpg');
export const founderIrene = image('1ea502_ec54613dbdb941f0b4235bfe2da4fef2~mv2.png');
export const founderJoseph = image('1ea502_77818d0f5ecd417d8342cd3e2ac54421~mv2.png');
export const certificate = image('1ea502_02b869276bec41cba32052d936f63048~mv2.jpg');
export const donationHero = image('1ea502_f4c849928c6c4fafbdfe516fba4e80b9~mv2.jpg');
export const servicePhotos = [
  image('1ea502_2d8226217af643ab9b32b6510739b4c9~mv2.jpg'),
  image('1ea502_9086745a2fb84dd2a81d8f9507beb235~mv2.jpg'),
  image('1ea502_684f2bf9de2642f08a89444128244a4d~mv2.jpg'),
  image('1ea502_c6c2817e10554de7ac7f81c1aae500e9~mv2.jpg'),
];
export const aboutFood = image('1ea502_85f5ad04ba874e128fb142e6adbe9703~mv2.jpeg');
export const aboutChildren = image('1ea502_87aa517e9566479aa2f9cc9a62f62de6~mv2.jpeg');
export const homeBlocks = (published?.home?.text ?? '').split('\n\n');
export function pageText(title: string) { return published.pages.find(p => p.title === title)?.text ?? ''; }
export function between(text: string, from: string, to: string) {
  return text.split(from)[1]?.split(to)[0]?.replace(/\u200b/g, '').trim() ?? '';
}
export const kindness = between(pageText('Donate / Sponsor'), 'Your Kindness Changes a Story', 'How to Give');
export const serviceNames = ['Education', 'Nutrition', 'Clothing', 'Shelter', 'Medical Care', 'Vocational Skills'];
export const serviceIcons = ['1ea502_6f8f875eaead4090825b5e14a6619051~mv2.jpg','1ea502_3b3d003dcb1c41998e9ac8dcba6fcede~mv2.jpg','1ea502_027cc372925e4e958c1a1470fae06067~mv2.jpg','1ea502_4ea922b3026f45ce91fa16106e81db6c~mv2.jpg','1ea502_a21833f696724c99adddf02e2c019ca4~mv2.jpg','1ea502_273a804690a04286b7001d08231cfb46~mv2.jpg'];
export const homeServices = serviceNames.map((name, i) => ({name, description: between(published.home.text, `\n${name}\n`, i < 5 ? `\n${serviceNames[i+1]}\n` : 'See All Services'), icon: image(serviceIcons[i] ?? '')}));
export function pageHead(title: string, description: string, path: string = '') {
  const pageTitle = title === 'Home' ? "Happy Children's Home | Orphan Care & Education in Kumi, Uganda" : `${title} | Happy Children's Home`;
  const canonicalUrl = `https://happychildrenshome.org${path}`;
  const defaultOgImage = 'https://happychildrenshome.org/assets/1ea502_953c8f2aaac54d5d9b3f15fb956355db~mv2.webp';

  return {
    meta: [
      { title: pageTitle },
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:site_name', content: "Happy Children's Home" },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: defaultOgImage },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: defaultOgImage },
    ],
    links: [
      { rel: 'canonical', href: canonicalUrl },
    ],
  };
}