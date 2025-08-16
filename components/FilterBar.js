import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
export default function FilterBar({ query, setQuery, onOpenFilters }){
  return(<View style={styles.wrapper}>
    <TextInput value={query} onChangeText={setQuery} placeholder="Cerca evento o località..." style={styles.input} returnKeyType="search"/>
    <Pressable onPress={onOpenFilters} style={styles.btn}><Text style={styles.btnText}>Filtri</Text></Pressable>
  </View>);
}
const styles=StyleSheet.create({ wrapper:{flexDirection:'row',gap:8,padding:12,alignItems:'center'},
  input:{flex:1,backgroundColor:'#fff',paddingHorizontal:12,paddingVertical:10,borderRadius:12,borderWidth:1,borderColor:'#ddd'},
  btn:{paddingHorizontal:14,paddingVertical:10,borderRadius:12,backgroundColor:'#222'},
  btnText:{color:'#fff',fontWeight:'600'} });
