import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import CardComponent from '../components/Card'
import { Grid } from '@mui/material'
import { useContext, useState } from 'react'
import { clientFetcher, fetcher } from '../utils/fetcher'
import { Store } from '../utils/store'


// server side static rendering

// export async function getStaticProps (context) {

//     const data = await fetcher('coffee' ,'dhaka', 6)

//     return {
//         props: {
//             coffeeStores: data
//         }
//     }
// }

const Home = ({coffeeStores}) => {

    const {state, dispatch} = useContext(Store)
    const [location, setLocation] =useState({latitude: '', longitude: ''})

    const handleClick = async () => {
        if (!navigator.geolocation) {
            alert('Your location could not be extracted')
        }else {
            navigator.geolocation.getCurrentPosition((position) => {

                const {latitude, longitude} = position.coords

                setLocation({latitude: latitude.toString(), longitude: longitude.toString()})

                dispatch({type: 'LATLONG', payload: latitude.toString()+','+longitude.toString()})

            }, () => {
                alert('browser unsupported geolocation')
            })
                
        }
    }

    const fetchStore = async () => {
        const stores = await clientFetcher( state.latlong, 10 )
        dispatch({type: 'UPDATE', payload: stores})
    }
    
    return(
        <>
            <Head>
                <title>Coffee Shops App</title>(state.latlong
                <link rel='icon' href='/shop.png' />
            </Head>


            <main className='flex flex-col md:mx-[8rem] sm:mx-[7rem] items-center my-[4rem] min-h-[40rem]'>
                
                <div className='flex md:space-x-[15rem] items-center'>
                    <div>
                        <Banner />
                        {location.latitude&&location.longitude?<p className= 'mt-10'>your coordinates are <span className='text-red-600'>latitude: {location.latitude}</span>, <span className='text-red-600'>longitude: {location.longitude}</span></p>:<></>}
                        {location.latitude&&location.longitude?
                            <button onClick = {fetchStore} style ={{color: 'white', backgroundColor: 'rgb(78, 12, 58)', padding: '1rem 1rem', marginTop: '1rem'}}>
                            Find coffeeStores
                            </button>:<button onClick = {handleClick} style ={{color: 'white', backgroundColor: 'rgb(78, 12, 58)', padding: '1rem 1rem', marginTop: '3rem'}}>
                            Set your coordinates
                            </button>
                        }
                    </div>
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
                    {state.stores.length>0&&<><h2>Shops nearby</h2><br /></>}
                    <Grid container spacing={3}>
                        {state.stores.map(item =>(
                            <Grid item md = {4} key = {item.fsq_id}>
                                <CardComponent name = {item.name} img = {item.imgUrl} id = {item.fsq_id}/>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                
            </main>
        </>
    )
}

export default Home