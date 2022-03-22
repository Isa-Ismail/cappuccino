import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import CardComponent from '../components/Card'
import { Grid } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { Store } from '../utils/store'

export async function getStaticProps (context) {

    const options = {
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3YiDK9d2qMInFD3n0uNWVeh+htyxYFv162KH1Qg/CldU='
        }
    }
    
    const {data} = await axios.get('https://api.foursquare.com/v3/places/search?query=coffee&open_now=true&near=dhaka&sort=POPULARITY&limit=30', options)

    return {
        props: {
            coffeeStores: data.results
        }
    }
}

const Home = ({coffeeStores}) => {

    const {state, dispatch} = useContext(Store)

    useEffect(() => {
        dispatch({type: 'UPDATE', payload: coffeeStores})
    },[])

    return(
        <>
            <Head>
                <title>Coffee shops nearby</title>
                <link rel='icon' href='/shop.png' />
            </Head>


            <main className='flex flex-col md:mx-[8rem] sm:mx-[7rem] items-center my-[4rem] min-h-[40rem]'>
                
                <div className='flex md:space-x-[10rem] items-center'>
                    <Banner />
                    <div>
                        <Image
                        src="/shop.png"
                        alt="Picture of coffee"
                        width={400}
                        height={400}
                        />
                    </div>
                </div>

                <div className='my-[3rem]'>
                    <h2>Shops nearby</h2><br />
                    <Grid container spacing={3}>
                        {coffeeStores.map(item =>(
                            <Grid item md = {4} key = {item.fsq_id}>
                                <CardComponent name = {item.name} img = {item.imgUrl||'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'} id = {item.fsq_id}/>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                
            </main>
        </>
    )
}

export default Home