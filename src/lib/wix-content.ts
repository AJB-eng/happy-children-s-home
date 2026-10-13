import published from '@/data/wix-published.json';
import assets from '@/data/wix-assets.json';

export const originalUrl = 'https://barungijoshua.wixsite.com/happy-childrens-hom';
export function image(id: string) { return (assets as Record<string, string>)[id] ?? ''; }
export const logo = image('1ea502_2d64a9f7aaf249f3aefd64de277cf45a~mv2.png');
export const community = image('1ea502_953c8f2aaac54d5d9b3f15fb956355db~mv2.jpeg');
export const brothers = image('1ea502_65c2653d114f42f8a0696299937f6ffe~mv2.jpg');
export const martha = image('1ea502_2defa128406b41d188e2d065583baa18~mv2.jpeg');
export const family = image('1ea502_54c1bad725d143b393d09677fae9f38d~mv2.jpg');
export const homeBlocks = published.home.text.split('\n\n');
export function pageText(title: string) { return published.pages.find(p => p.title === title)?.text ?? ''; }
export function between(text: string, from: string, to: string) {
  return text.split(from)[1]?.split(to)[0]?.replace(/\u200b/g, '').trim() ?? '';
}
export const kindness = between(pageText('Donate / Sponsor'), 'Your Kindness Changes a Story', 'How to Give');
export const serviceNames = ['Education', 'Nutrition', 'Clothing', 'Shelter', 'Medical Care', 'Vocational Skills'];
export const serviceIcons = ['1ea502_6f8f875eaead4090825b5e14a6619051~mv2.jpg','1ea502_3b3d003dcb1c41998e9ac8dcba6fcede~mv2.jpg','1ea502_027cc372925e4e958c1a1470fae06067~mv2.jpg','1ea502_4ea922b3026f45ce91fa16106e81db6c~mv2.jpg','1ea502_a21833f696724c99adddf02e2c019ca4~mv2.jpg','1ea502_273a804690a04286b7001d08231cfb46~mv2.jpg'];
export const homeServices = serviceNames.map((name, i) => ({name, description: between(published.home.text, `\n${name}\n`, i < 5 ? `\n${serviceNames[i+1]}\n` : 'See All Services'), icon: image(serviceIcons[i] ?? '')}));
export function pageHead(title: string, description: string) {
  return {meta: [{title: `${title} | Happy Children's Home`},{name:'description',content:description},{property:'og:title',content:`${title} | Happy Children's Home`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};
}