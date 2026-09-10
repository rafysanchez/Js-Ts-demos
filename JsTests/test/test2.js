var Produts = {
  id: number,
  name: string,
  price: number,
};


var arrProduts = Produts.map((item) => {
  return {
    id: item.id,
    name: item.name.toUpperCase()
  }})

  
arrProduts.forEach((item) => {
  console.log(item.name);
}

