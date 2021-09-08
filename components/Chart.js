import React,{useEffect, useState} from 'react'
import { View, Text, StyleSheet,Image,Dimensions } from 'react-native'
import {ChartDot, ChartPath, ChartPathProvider,ChartYLabel} from '@rainbow-me/animated-charts';
import { useSharedValue } from 'react-native-reanimated';

export const {width: SIZE} = Dimensions.get('window');

export default function Chart({symbol,currentPrice,logoUrl, name,price_change_percentage_7d_in_currency,sparkline_in_7d}) {
    const latesCurrentPrice = useSharedValue(currentPrice);
    const [chartReady, setChartReady] = useState(false)

    useEffect(() => {
        latesCurrentPrice.value = currentPrice;
        setTimeout(()=>{
            setChartReady(true);
        },0)

    }, [currentPrice])
 
    const priceChangeColor = price_change_percentage_7d_in_currency< 0 ? "green" : "red";
    
    const formatUSD = value => {
        'worklet';
        if (value === '') {
        return `$${latesCurrentPrice.value.toLocaleString("en-US",{currency:"USD"} )} `;
        }
        const formatedValue = `$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")}`

    return formatedValue
  };
   
    return (
        <ChartPathProvider data={{ points:sparkline_in_7d.price, smoothingStrategy: 'bezier' }} >
            <View style={styles.chartWrapper}> 
            {/** titles */}
                <View style={styles.titlesWrapper}> 
                    
                    <View style={styles.uppertWrapper}> 
                        <View style={styles.upperLeftTitle}> 
                            <Image source={{uri:logoUrl}} style={styles.image}  />
                            <Text style={styles.subtitle} >{name} ({symbol.toUpperCase()}) </Text>
                        </View>
                        <Text style={styles.subtitle} >7d </Text>
                    </View>
                    <View style={styles.lowerTitles}>
                        <ChartYLabel
                            format={formatUSD}
                            style={styles.boldTitle}
                        />                        
                        {/*<Text style={styles.boldTitle}>${currentPrice.toLocaleString("en-US",{currency:"USD"} )} </Text>*/}
                        <Text style={[styles.title,{color:priceChangeColor}]} >{price_change_percentage_7d_in_currency.toFixed(4)}% </Text>
                    </View>
                </View>
                {chartReady?
                (<View style={styles.chartLineWrapper}>
                    <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
                    <ChartDot style={{ backgroundColor: 'black' }} />
                </View>)
                : null    
            }
            </View>
        </ChartPathProvider>
    )
}

const styles = StyleSheet.create({
    chartWrapper:{
        marginVertical: 10
    },
    titlesWrapper:{
        marginHorizontal:25
    },
    uppertWrapper:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    upperLeftTitle:{
        flexDirection:"row",
        alignItems:"center",
    },
    image:{
        width: 24,
        height: 24,
        marginRight:4
    },
    subtitle:{
        fontSize:14,
        color:"#A9ABB1"
    },
    lowerTitles:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    boldTitle:{
        fontSize:18,
        color:"black",
        fontWeight:"bold",
    },
    title:{
        fontSize:16,
    },
    chartLineWrapper:{
        marginTop:20
    }




})