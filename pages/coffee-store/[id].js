import Link from "next/link"
import coffeeStores from '../../data/coffee-stores.json'
import Head from 'next/head'
import Image from "next/image"

export async function getStaticProps (staticParams) {
  const id = staticParams.params.id
  return {
    props: {
      coffeeStores:coffeeStores.find(item=> item.id.toString()===id)
    }
  }
}

export async function getStaticPaths () {
  return {
    paths: coffeeStores.map(item => ({params:{id: item.id.toString()}})),
    fallback: false
  }
}

const Store = ({coffeeStores}) => {

  const {name, address, imgUrl, neighbourhood, websiteUrl} = coffeeStores

    return (
    <>
      <Head>
            <title>{name}</title>
            <link rel='icon' href='/shop.png' />
      </Head>
      <Link href='/'><h3 className='px-20 pt-10 cursor-pointer'><i class="fa fa-arrow-left"></i> Back</h3></Link>
      <div className="md:flex justify-start items-start py-20 px-20 space-x-10">
        <div>
          <Image
          src={imgUrl}
          alt={name}
          width={400}
          height={400}
          className='rounded-xl'
          />
        </div>
        <div>
          <h2 className="space-x-5"><i class="fa fa-coffee"></i><span>{name}</span></h2>
          <p className="space-x-10"><i class="fa fa-map-marker"></i><span>{address}</span></p>
          <p className="space-x-9"><i class="fa fa-location-arrow"></i><span>{neighbourhood}</span></p>
          <p className="space-x-9"><i class="fa fa-star-o"></i><span>stars</span></p>
        </div>
      </div>
    </>
  )
}

export default Store