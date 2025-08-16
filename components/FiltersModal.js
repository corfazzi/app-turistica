import React,{useState}from'react';
import{View,Text,Modal,Pressable,StyleSheet,TextInput}from'react-native';
export default function FiltersModal({visible,onClose,filters,setFilters}){
  const[local,setLocal]=useState(filters); const apply=()=>{setFilters(local);onClose();};
  return(<Modal visible={visible} animationType="slide" onRequestClose={onClose}>
    <View style={styles.wrap}>
      <Text style={styles.h1}>Filtri</Text>
      <Text style={styles.label}>Località</Text>
      <TextInput value={local.location} onChangeText={t=>setLocal({...local,location:t})} placeholder="Es. Follonica" style={styles.input}/>
      <Text style={styles.label}>Data (YYYY-MM-DD)</Text>
      <TextInput value={local.date} onChangeText={t=>setLocal({...local,date:t})} placeholder="2025-08-20" style={styles.input}/>
      <Text style={styles.label}>Tipo</Text>
      <TextInput value={local.type} onChangeText={t=>setLocal({...local,type:t})} placeholder="Music, Culture, Outdoor..." style={styles.input}/>
      <Text style={styles.label}>Gradimento minimo (0-5)</Text>
      <TextInput value={String(local.minRating??'')} onChangeText={t=>setLocal({...local,minRating:t?Number(t):undefined})} placeholder="4.5" keyboardType="decimal-pad" style={styles.input}/>
      <View style={styles.row}>
        <Pressable onPress={onClose} style={[styles.btn,styles.muted]}><Text>Annulla</Text></Pressable>
        <Pressable onPress={apply} style={styles.btn}><Text style={{fontWeight:'700'}}>Applica</Text></Pressable>
      </View>
    </View>
  </Modal>);
}
const styles=StyleSheet.create({wrap:{flex:1,padding:16,gap:10,backgroundColor:'#f9f9f9'},h1:{fontSize:20,fontWeight:'800',marginBottom:8},
  label:{fontWeight:'700',marginTop:8},input:{backgroundColor:'#fff',borderRadius:12,borderWidth:1,borderColor:'#ddd',padding:10},
  row:{flexDirection:'row',justifyContent:'space-between',marginTop:16},
  btn:{backgroundColor:'#0f6',paddingVertical:12,paddingHorizontal:18,borderRadius:12},muted:{backgroundColor:'#eee'}});
