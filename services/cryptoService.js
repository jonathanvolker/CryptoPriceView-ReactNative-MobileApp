import axios from 'axios'
import moment from 'moment'

const formatSparkline = (num)=>{
    const sevenDaysAgo = moment().subtract(7,"days").unix()
    let formattedSparkline = num.map((item, index)=>{
        return {
            x: sevenDaysAgo+(index+1) * 3600,
            y:item
        }
    })
    return formattedSparkline
}

const formatMarketdata =(data)=>{
    let formattedData = [];
    data.forEach((item)=>{
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)
        const formattedItem ={
          ...item,
          sparkline_in_7d:{
              price:formattedSparkline
          }  
        }
    formattedData.push(formattedItem)      
    })
    return formattedData
}


export const getMarketData = async() => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d";
           try {
                const response = await axios.get(url)
                const data = response.data;
                const formatedResponse = formatMarketdata(data);
                return formatedResponse;

            } catch (error) {
                console.log(error.message);
            }
}

