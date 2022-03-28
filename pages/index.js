import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import CardComponent from '../components/Card'
import { Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { fetcher } from '../utils/fetcher'

export async function getStaticProps (context) {

    const data = await fetcher('coffee' ,'dhaka', 6)

    return {
        props: {
            coffeeStores: data
        }
    }
}

const Home = ({coffeeStores}) => {

    const [location, setLocation] =useState({latitude: '', longitude: ''})

    const handleClick = () => {
        if (!navigator.geolocation) {
            error = 'Geolocation is not supported your browser'
            alert('Your location could not be extracted')
        }else {
            navigator.geolocation.getCurrentPosition((position) => {

                const {latitude, longitude} = position.coords

                setLocation({latitude: latitude.toString().slice(0,5), longitude: longitude.toString().slice(0,5)})

            }, () => {
                alert('browser unsupported geolocation')
            })
        }
    }

    console.log(location)
    
    return(
        <>
            <Head>
                <title>Coffee Shops App</title>
                <link rel='icon' href='/shop.png' />
            </Head>


            <main className='flex flex-col md:mx-[8rem] sm:mx-[7rem] items-center my-[4rem] min-h-[40rem]'>
                
                <div className='flex md:space-x-[10rem] items-center'>
                    <div>
                        <Banner />
                        <button onClick = {handleClick} style ={{color: 'white', backgroundColor: 'rgb(78, 12, 58)', padding: '1rem 1rem', marginTop: '3rem'}}>
                            View stores nearby
                        </button><br /><br />
                        {location.latitude&&location.longitude?<p>your coordinates are <span className='text-red-600'>latitude: {location.latitude}</span> , <span className='text-red-600'>longitude: {location.longitude}</span></p>:<></>}
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
                    <h2>Shops nearby</h2><br />
                    <Grid container spacing={3}>
                        {coffeeStores.map(item =>(
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