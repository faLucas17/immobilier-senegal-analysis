import React from "react";

function SearchBar({setSearch}){

return(
<div style={{margin:"20px 0"}}>

<input
type="text"
placeholder="Rechercher un quartier..."
onChange={(e)=>setSearch(e.target.value)}
style={{padding:"10px",width:"300px"}}
/>

</div>
);
}

export default SearchBar;