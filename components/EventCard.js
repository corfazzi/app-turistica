import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
export default function EventCard({ item, onShowOnMap }){
  return(<View style={styles.card}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.meta}>{item.location} • {item.date} • {item.type}</Text>
    <Text style={styles.desc}>{item.description}</Text>
    <View style={styles.row}>
      <Text style={styles.rating}>⭐ {(item.rating?.toFixed?item.rating.toFixed(1):item.rating)||0}</Text>
      <Pressable onPress={()=>onShowOnMap(item)} style={styles.mapBtn}><Text style={styles.mapBtnText}>Mappa</Text></Pressable>
    </View>
  </View>);
}
const styles=StyleSheet.create({ card:{backgroundColor:'#fff',borderRadius:16,padding:14,marginHorizontal:12,marginVertical:8,borderWidth:1,borderColor:'#eee'},
  title:{fontSize:16,fontWeight:'700',marginBottom:6}, meta:{color:'#666',marginBottom:8}, desc:{color:'#333',marginBottom:10},
  row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  rating:{fontWeight:'600'}, mapBtn:{paddingHorizontal:12,paddingVertical:8,borderRadius:10,backgroundColor:'#0f6'},
  mapBtnText:{color:'#000',fontWeight:'700'} });
