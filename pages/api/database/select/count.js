import baza from ".."

export default async function count(req,res){
    res.json(await baza.count('display_data'))
}