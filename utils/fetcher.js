import axios from 'axios'

export const fetcher = async (query, near, limit) => {
    const options = {
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3YiDK9d2qMInFD3n0uNWVeh+htyxYFv162KH1Qg/CldU='
        }
    }
    
    const {data} = await axios.get(`https://api.foursquare.com/v3/places/search?query=${query}&open_now=true&near=${near}&sort=POPULARITY&limit=${limit}`, options)

    return data.results

}