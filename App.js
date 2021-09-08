
import React,{useRef, useMemo, useState, useEffect} from 'react';
import { FlatList, StyleSheet, Text, View ,SafeAreaView} from 'react-native';
import ListItems from './components/ListItems';
;
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Chart from './components/Chart';
import {getMarketData} from './services/cryptoService' 

const ListHeader = () =>( 
  <>
  <View style={styles.titleWrapper}>
  <Text style={styles.largeTitle}>Market</Text>
  </View>
  <View style={styles.divider}/>
  </>)


export default function App() {
  const [selecteCoinData, setSelecteCoinData] = useState(null)
  const [data, setData] = useState([]);
  useEffect(() => {
    const FetchMarketData = async ()=>{
      const marketData = await getMarketData();
      setData(marketData);
    }

    FetchMarketData();
   
  }, [])
 
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => [ '50%'], []);
  const openModal=(item)=>{
    setSelecteCoinData(item)
    bottomSheetModalRef.current.present();
  }

  return (

    <BottomSheetModalProvider>
    <SafeAreaView style={styles.container}>
     
      <FlatList 
        keyExtractor={ (item)=> item.id }
        data={data}
        renderItem={({item})=>(
          <ListItems
          name={ item.name}
          symbol={item.symbol}
          currentPrice={ item.current_price}
          price_change_percentage_7d_in_currency={ item.price_change_percentage_7d_in_currency}
          logoUrl={ item.image}
          onPress={()=> openModal(item)}
          />
        )}
        ListHeaderComponent={<ListHeader/>}
      />

    </SafeAreaView>
    <BottomSheetModal
       ref={bottomSheetModalRef}
       index={0}
       snapPoints={snapPoints}
       style={styles.bottomSheet}
     >
           
         { 
         selecteCoinData ?
          (<Chart
              currentPrice={selecteCoinData.current_price}
              logoUrl={selecteCoinData.image}
              name={selecteCoinData.name}
              symbol={ selecteCoinData.symbol}
              price_change_percentage_7d_in_currency={selecteCoinData.price_change_percentage_7d_in_currency}
              sparkline_in_7d={selecteCoinData.sparkline_in_7d}

              />)
            :  null
          }

    </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   //backgroundColor: '#EFE9E8',
   
  },
  largeTitle:{
    fontSize:24,
    fontWeight:"bold",
    
  },
  titleWrapper:{
    marginTop: 30,
    paddingHorizontal:16
  },
  divider:{
    height: StyleSheet.hairlineWidth,
    backgroundColor: "black",
    marginHorizontal:16,
    marginTop: 16
  },
  bottomSheet:{
    shadowColor:"#000",
    shadowOffset:{
      width: 0,
      height: -4
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5,

  }
});
