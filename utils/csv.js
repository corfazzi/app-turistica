import Papa from 'papaparse';
export async function parseCsv(text){
  return new Promise((resolve,reject)=>{
    Papa.parse(text,{header:true,skipEmptyLines:true,complete:({data})=>{
      try{
        const rows=data.map((r,i)=>({
          id:String(r.id ?? i+1),
          title:String(r.title ?? '').trim(),
          type:String(r.type ?? '').trim(),
          location:String(r.location ?? '').trim(),
          coords:{lat:Number(r.lat || r.latitude || 0), lng:Number(r.lng || r.longitude || 0)},
          date:String(r.date ?? '').trim(),
          rating:Number(r.rating || 0),
          description:String(r.description ?? '').trim(),
        })).filter(e=>e.title);
        resolve(rows);
      }catch(e){reject(e);}
    },error:err=>reject(err)});
  });
}
