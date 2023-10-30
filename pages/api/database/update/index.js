import baza from ".."

export default async function updateQuery(req,res){
    const {data, where}=req.body
    res.json(await baza.update('display_data', data, where))
}