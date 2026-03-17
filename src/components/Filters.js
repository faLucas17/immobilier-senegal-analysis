import React from "react";

function Filters({setVille,setType}){

return(
<div style={{display:"flex",gap:"20px"}}>

<select onChange={(e)=>setVille(e.target.value)}>
<option value="">Toutes villes</option>
<option value="Dakar">Dakar</option>
<option value="Thiès">Thiès</option>
<option value="Mbour">Mbour</option>
</select>

<select onChange={(e)=>setType(e.target.value)}>
<option value="">Tous types</option>
<option value="Appartement">Appartement</option>
<option value="Maison">Maison</option>
<option value="Villa">Villa</option>
</select>

</div>
);
}

export default Filters;