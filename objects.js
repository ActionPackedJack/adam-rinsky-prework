const contacts = {
    dan: "555-330-2289",
    dante: "555-660-2295"
  }

console.log(contacts.dan);
let prop= window.prompt("Enter a name");
if(contacts[prop]){
    alert (contacts[prop]);
}
else{
    alert("Number not found.");
}
let dan = {
    phone: "555-330-2289",
    address: "123 Fake Street",
    state: "RI"
};
let dante = {
    phone:"555-660-2295",
    address: "742 Evergreen Terrace",
    state: "IL"
};
console.log(dan.address);
