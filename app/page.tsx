
import Card from '@/components/card.server';
import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { CoffeeStoreType } from "@/types";
import { getDomain } from '@/utils';
import { Metadata } from 'next';


async function getData() {


  if (
    !process.env.MAPBOX_API || 
    !process.env.UNSPLASH_ACCESS_KEY || 
    !process.env.AIRTABLE_TOKEN
  ) {
    throw new Error ('One of the API keys is not configured');
  }

  //mapbox api
  const DUBAI_LONG_LAT = "55.27648004654894,25.199020502846473";
  return await fetchCoffeeStores(DUBAI_LONG_LAT, 9);
}



export const metadata: Metadata = {
    title: `Coffee Connoiseur`,
    description: `Allows you to discover Coffee Stores near you`,
    metadataBase: getDomain(),
    alternates: {
      canonical: `/`,
    },
  };


export default async function Home() {
  const coffeeStores = await getData();



  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        
        <NearbyCoffeeStores />
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Dubai Coffee Stores
          </h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6'>
            {coffeeStores.map((coffeeStore: CoffeeStoreType) => (
              <Card 
                key={`${coffeeStore.name}-${coffeeStore.id}`}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl}
                href={`/coffee-store/${coffeeStore.id}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
