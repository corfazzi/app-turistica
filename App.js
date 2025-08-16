import React,{useEffect,useMemo,useState,useCallback}from'react';
import{SafeAreaView,FlatList,View,Text,ActivityIndicator,Alert,RefreshControl}from'react-native';
import{StatusBar}from'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterBar from './components/FilterBar';
import FiltersModal from './components/FiltersModal';
import MapSheet from './components/MapSheet';
import localData from './data/events.json';
import{SHEET_CSV_URL}from'./config';
import{parseCsv}from'./utils/csv';

const CACHE_KEY='events_cache_v1'; const CACHE_AT='events_cache_at';
async function fetchSheet(){
  if(!SHEET_CSV_URL||SHEET_CSV_URL.includes('xxxxxxxx'))return null;
  const res=await fetch(SHEET_CSV_URL); if(!res.ok) throw new Error('Errore rete: '+res.status);
  const text=await res.text(); return await parseCsv(text);
}

export default function App(){
  const[query,setQuery]=useState(''); const[filtersOpen,setFiltersOpen]=useState(false);
  const[mapOpen,setMapOpen]=useState(false); const[selected,setSelected]=useState(null);
  const[filters,setFilters]=useState({location:'',date:'',type:'',minRating:undefined});
  const[loading,setLoading]=useState(true); const[events,setEvents]=useState(localData);
  const[refreshing,setRefreshing]=useState(false); const[lastSync,setLastSync]=useState(null);

  const loadData=useCallback(async(opts={showAlerts:true})=>{
    setLoading(true);
    try{
      const remote=await fetchSheet();
      if(remote&&remote.length){
        setEvents(remote); await AsyncStorage.setItem(CACHE_KEY,JSON.stringify(remote));
        const at=new Date().toISOString(); await AsyncStorage.setItem(CACHE_AT,at); setLastSync(at);
      }else{ setEvents(localData); }
    }catch(e){
      try{
        const cached=await AsyncStorage.getItem(CACHE_KEY);
        if(cached){ const arr=JSON.parse(cached); setEvents(arr);
          const at=await AsyncStorage.getItem(CACHE_AT); setLastSync(at);
          if(opts.showAlerts) Alert.alert('Offline','Caricati eventi dalla cache locale.'); }
        else{ setEvents(localData); if(opts.showAlerts) Alert.alert('Errore rete','Uso dataset locale.'); }
      }catch{ setEvents(localData); }
    }finally{ setLoading(false); }
  },[]);

  useEffect(()=>{ loadData({showAlerts:false}); },[loadData]);

  const onRefresh=useCallback(async()=>{ setRefreshing(true); await loadData({showAlerts:true}); setRefreshing(false); },[loadData]);

  const filtered=useMemo(()=>events.filter(ev=>{
    const q=query.trim().toLowerCase();
    const mq=!q||(ev.title.toLowerCase().includes(q)||ev.location.toLowerCase().includes(q));
    const ml=!filters.location||ev.location.toLowerCase().includes(filters.location.toLowerCase());
    const md=!filters.date||ev.date===filters.date;
    const mt=!filters.type||ev.type.toLowerCase().includes(filters.type.toLowerCase());
    const mr=filters.minRating===undefined||ev.rating>=filters.minRating;
    return mq&&ml&&md&&mt&&mr;
  }).sort((a,b)=>(b.rating||0)-(a.rating||0)),[query,filters,events]);

  return(<SafeAreaView style={{flex:1,backgroundColor:'#f1f5f9'}}>
    <StatusBar style="auto"/><FilterBar query={query} setQuery={setQuery} onOpenFilters={()=>setFiltersOpen(true)}/>
    {loading?(<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <ActivityIndicator size="large"/><Text style={{marginTop:8}}>Caricamento eventi...</Text></View>
    ):(<FlatList data={filtered} keyExtractor={(it)=>it.id} contentContainerStyle={{paddingBottom:24}}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      ListHeaderComponent={()=>(<View style={{paddingHorizontal:12,paddingBottom:4}}>
        <Text style={{fontWeight:'800'}}>Eventi trovati: {filtered.length}</Text>
        {lastSync&&<Text style={{color:'#666'}}>Ultima sincronizzazione: {new Date(lastSync).toLocaleString()}</Text>}
        {(!SHEET_CSV_URL||SHEET_CSV_URL.includes('xxxxxxxx'))&&(<Text style={{color:'#a00',marginTop:4}}>⚠️ Configura SHEET_CSV_URL in config.js.</Text>)}
      </View>)}
      renderItem={({item})=>{const Card=require('./components/EventCard').default; return <Card item={item} onShowOnMap={(it)=>{setSelected(it);setMapOpen(true);}}/>;}}/> )}
    <FiltersModal visible={filtersOpen} onClose={()=>setFiltersOpen(false)} filters={filters} setFilters={setFilters}/>
    <MapSheet visible={mapOpen} onClose={()=>setMapOpen(false)} item={selected}/>
  </SafeAreaView>);
}
