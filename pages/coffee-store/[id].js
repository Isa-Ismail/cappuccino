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
      <p className='px-20 pt-10'><Link href='/'>Back</Link></p>
      <div className="md:flex justify-start items-start py-20 px-20 space-x-10">
        <div>
          <Image
          src={imgUrl}
          alt={name}
          width={400}
          height={400}
          />
        </div>
        <div>
          <h2>{address}</h2>
          <h2>{name}</h2>
        </div>
      </div>
    </>
  )
}

export default Store