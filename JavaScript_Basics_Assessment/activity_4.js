let names = ["Miguel", "Sisamouth", "Eleanor"];
while(names.length<6){
    let newName= prompt("Name another student.");
    names.push(newName);
}
for(let i=0; i<names.length;i++){
    console.log(names[i]);
}