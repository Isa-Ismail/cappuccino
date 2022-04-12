import Link from "next/link"
import Head from 'next/head'
import Image from "next/image"
import { fetcher } from '../../utils/fetcher'
import { useContext } from "react"
import { Store } from "../../utils/store"
import { useRouter } from "next/router"

export async function getStaticProps (staticParams) {

  const data = await fetcher('coffee', 'dhaka', 6)

  const id = staticParams.params.id

  const findCoffee = data.find(item=> item.fsq_id===id)

  return {
    props: {
      coffeeStore: findCoffee || {}
    }
  }
}

export async function getStaticPaths () {

  const data = await fetcher('coffee', 'dhaka', 6)

  const paths = data.map(item => ({params:{id: item.fsq_id}}))

  return {
    paths,
    fallback: true
  }
}

const Shop = ({coffeeStore}) => {

  const {state, dispatch} = useContext(Store)

  const {id} = useRouter().query

  if(!coffeeStore){
    const coffeeStoreContext = state.stores.find(item=> item.fsq_id===id) 
  }

  const {name, imgUrl, location} = coffeeStoreContext

    return (
    <>
      <Head>
            <title>{name}</title>
            <link rel='icon' href='/shop.png' />
      </Head>
      <Link href='/'><h3 className='px-20 pt-10 cursor-pointer'> Back</h3></Link>
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
          <h2 className="space-x-5"><span>{name}</span></h2><br /><br />
          <p className="space-x-10"><span>{location.address}</span></p>
          <p className="space-x-9"><span>{location.locality}</span></p>
          <p className="space-x-9"><span>1</span></p>
        </div>
      </div>
    </>
  )
}

export default Shop