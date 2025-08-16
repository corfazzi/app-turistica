import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
let MapLib=null; try{ MapLib=require('react-native-maps'); }catch(e){ MapLib=null; }
export default function MapSheet({ visible, onClose, item }){
  if(!item) return null;
  const hasMap=!!(MapLib&&MapLib.default); const MapView=hasMap?MapLib.default:null; const Marker=hasMap?MapLib.Marker:null;
  return(<Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
    <View style={styles.overlay}><View style={styles.sheet}>
      <Text style={styles.title}>{item.title}</Text>
      {hasMap ? (<MapView style={{flex:1}} initialRegion={{latitude:item.coords.lat,longitude:item.coords.lng,latitudeDelta:0.08,longitudeDelta:0.08}}>
        <Marker coordinate={{latitude:item.coords.lat,longitude:item.coords.lng}} title={item.title} description={item.location}/>
      </MapView>) : (<View style={styles.fallback}><Text style={styles.fallbackTitle}>Mappa non disponibile</Text>
        <Text style={styles.fallbackText}>Installa la versione compatibile con:{"\n"}expo install react-native-maps</Text>
        <Text style={styles.fallbackText}>Coord: {item.coords.lat}, {item.coords.lng}</Text></View>)}
      <Pressable onPress={onClose} style={styles.btn}><Text style={styles.btnText}>Chiudi</Text></Pressable>
    </View></View>
  </Modal>);
}
const styles=StyleSheet.create({overlay:{flex:1,backgroundColor:'rgba(0,0,0,0.35)',justifyContent:'flex-end'},
  sheet:{height:'70%',backgroundColor:'#fff',borderTopLeftRadius:24,borderTopRightRadius:24,overflow:'hidden'},
  title:{fontSize:16,fontWeight:'800',padding:12},btn:{backgroundColor:'#222',padding:14,alignItems:'center'},
  btnText:{color:'#fff',fontWeight:'700'},fallback:{flex:1,alignItems:'center',justifyContent:'center',padding:16},
  fallbackTitle:{fontSize:16,fontWeight:'800',marginBottom:8},fallbackText:{color:'#444',textAlign:'center',marginTop:6}});
