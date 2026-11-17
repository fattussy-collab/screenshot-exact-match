import trainer from '@/assets/trainer.jpg';
import headphones from '@/assets/headphones.jpg';
import bag from '@/assets/bag.jpg';
import hoodie from '@/assets/hoodie.jpg';
import coat from '@/assets/coat.jpg';
import tracksuit from '@/assets/tracksuit.jpg';
import jeans from '@/assets/jeans.jpg';
import phone from '@/assets/phone.jpg';
import laptop from '@/assets/laptop.jpg';
import perfume from '@/assets/perfume.jpg';
import cream from '@/assets/cream.jpg';
import lipstick from '@/assets/lipstick.jpg';
import serum from '@/assets/serum.jpg';
export { trainer, headphones, bag };
export type Product = { id: string; name: string; category: string; price: number; image?: string | undefined; illustration?: string | undefined; sizes: string[] };
export type Store = { id: string; name: string; url: string; symbol: string; tagline: string; products: Product[] };
const cataloguePhotos: Record<string, string> = { hoodie, coat, tracksuit, jeans, phone, laptop, perfume, cream, lipstick, serum };
const product = (id: string, name: string, category: string, price: number, image: string | undefined, illustration: string | undefined, sizes = ['S', 'M', 'L']): Product => ({ id, name, category, price, image: image ?? cataloguePhotos[id === 'b3' ? 'serum' : illustration ?? ''], illustration, sizes });
export const stores: Store[] = [
 { id:'nikey', name:'Nikey UK', url:'www.nikey-store.co.uk', symbol:'↗', tagline:'A little more movement.', products:[product('n1','Air Flex Runner','Trainers',89.99,trainer,undefined,['UK 7','UK 8','UK 9']),product('n2','Everyday Fleece Hoodie','Hoodies',65,undefined,'hoodie'),product('n3','Club Tracksuit','Tracksuits',95,undefined,'tracksuit'),product('n4','Air Flex Pro','Trainers',119.99,trainer,undefined,['UK 7','UK 8','UK 9'])] },
 { id:'zarra', name:'Zarra', url:'www.zarra-fashion.co.uk', symbol:'Z', tagline:'Your next everyday favourite.', products:[product('z1','Wool Blend Coat','Coats',89.99,undefined,'coat'),product('z2','Straight Leg Denim','Jeans',39.99,undefined,'jeans'),product('z3','Relaxed Cotton Hoodie','Streetwear',35.99,undefined,'hoodie'),product('z4','City Shoulder Bag','Accessories',45.99,bag,undefined)] },
 { id:'asos', name:'ASOS-ish', url:'asos-ish.com', symbol:'a', tagline:'Made for your kind of day.', products:[product('a1','Weekend Hoodie','Outfits',32,undefined,'hoodie'),product('a2','Wide Leg Jeans','Outfits',38,undefined,'jeans'),product('a3','Mini Shoulder Bag','Accessories',28,bag,undefined),product('a4','Essential Trainers','Footwear',55,trainer,undefined,['UK 7','UK 8','UK 9'])] },
 { id:'self', name:'Selfridgeless', url:'www.selfridgeless.co.uk', symbol:'S', tagline:'A little luxury, a lot to love.', products:[product('s1','The City Bag','Designer bags',295,bag,undefined,['One size']),product('s2','No. 04 Eau de Parfum','Perfumes',115,undefined,'perfume',['50ml','100ml']),product('s3','Leather Mini Tote','Designer bags',185,bag,undefined,['One size']),product('s4','Fresh Notes Eau de Parfum','Perfumes',85,undefined,'perfume',['50ml','100ml'])] },
 { id:'apfel', name:'Apfel Store', url:'apfel-uk.com', symbol:'◕', tagline:'Good things. Brilliantly simple.', products:[product('p1','AirSounds Max','Headphones',499,headphones,undefined,['One size']),product('p2','Apfel Phone 16','Phones',799,undefined,'phone',['128GB','256GB']),product('p3','Book Air 13-inch','Laptops',999,undefined,'laptop',['256GB','512GB']),product('p4','AirSounds Studio','Headphones',249,headphones,undefined,['One size'])] },
 { id:'seph', name:'Sephoria', url:'www.sephoria-beauty.co.uk', symbol:'≋', tagline:'Feel good in your own skin.', products:[product('b1','Daily Dew Moisturiser','Skincare',32,undefined,'cream',['50ml','100ml']),product('b2','Soft Glow Lipstick','Makeup',24,undefined,'lipstick',['One size']),product('b3','Hydrating Face Serum','Skincare',42,undefined,'perfume',['30ml','50ml']),product('b4','Everyday Skin Tint','Makeup',28,undefined,'cream',['30ml','50ml'])] },
];
