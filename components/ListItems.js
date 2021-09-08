import React from 'react'
import { StyleSheet ,TouchableOpacity,View, Image,Text } from 'react-native'

const ListItems = ({name,symbol,currentPrice,price_change_percentage_7d_in_currency, onPress,logoUrl}) => {
   
    const priceChangeColor = price_change_percentage_7d_in_currency< 0 ? "green" : "red";
  
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.itemWrapper}>
                    
                {/* left side */}
                <View style={styles.leftWrapper}> 
                    <Image style={styles.image} source={{ uri:logoUrl}} />
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{name}</Text>    
                        <Text style={styles.subtitle}>{symbol.toUpperCase()} </Text>    

                     </View>
                </View>

                {/* rigth side */}
                <View style={styles.rigthWrapper}></View>
                    <Text style={styles.title}>${currentPrice.toLocaleString("en-US",{currency:"USD"} ) }</Text>    
                    <Text style={[styles.subtitle, {color:priceChangeColor}]}>{price_change_percentage_7d_in_currency.toFixed(4)}%</Text>   

                </View>
                
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({

itemWrapper:{
    paddingHorizontal:16,
    marginTop:24,
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center",
},
leftWrapper:{
 flexDirection:"row",
 alignItems:"center"
},
rigthWrapper:{
    flexDirection:"column",
    marginRight:55,
    alignItems:"flex-end",
    

},
image:{
   height:48,
    width: 48,
},
titleWrapper:{
    marginLeft:8,
},
title:{
    fontSize:18,
},
  
subtitle:{
    fontSize:14,
    color:"#A9ABB1"

}




})

export default ListItems
