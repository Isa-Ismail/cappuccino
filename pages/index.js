import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import CardComponent from '../components/Card'
import { Grid } from '@mui/material'
import coffeeStores from '../data/coffee-stores.json'

export async function getStaticProps (context) {
    return {
        props: {
            coffeeStores
        }
    }
}

const Home = ({coffeeStores}) => {
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
                            <Grid item md = {4} key = {item.id}>
                                <CardComponent name = {item.name} img = {item.imgUrl} id = {item.id}/>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                
            </main>
        </>
    )
}

export default Home