var produtos = [
  { id: 1, name: "Camisa", price: 49.99 },
  { id: 2, name: "Calca", price: 89.9 },
  { id: 3, name: "Tenis", price: 129.99 },
];

var arrProdutos = produtos.map((item) => {
  return {
    id: item.id,
    name: item.name.toUpperCase(),
  };
});

arrProdutos.forEach((item) => {
  console.log(item.name);
});

var produtosCaros = produtos.filter((item) => item.price > 80);
console.log("Produtos acima de R$ 80:", produtosCaros);

var produtoCalca = produtos.find((item) => item.name.toLowerCase() === "calca");
console.log("Produto encontrado:", produtoCalca);

var totalProdutos = produtos.reduce((soma, item) => soma + item.price, 0);
console.log("Total dos preços:", totalProdutos.toFixed(2));

var temProdutoBarato = produtos.some((item) => item.price < 50);
console.log("Tem produto abaixo de R$ 50?", temProdutoBarato);

var todosTemPrecoValido = produtos.every((item) => item.price > 0);
console.log("Todos têm preço válido?", todosTemPrecoValido);

var produtosOrdenados = [...produtos].sort((a, b) => a.price - b.price);
console.log("Produtos ordenados por preço:", produtosOrdenados);

var nomes = produtos.map((item) => item.name);
console.log("Nomes dos produtos:", nomes);
