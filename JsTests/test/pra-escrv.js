// export interface PraEscrv {
//     id:nuber;
//     name:string;
//     qtde:number;
// }

let itens = [
  { id: 1, name: "Item 1", qtde: 10, preco: 15.5 },
  { id: 2, name: "Item 2", qtde: 20, preco: 8.9 },
  { id: 3, name: "Item 3", qtde: 30, preco: 12 },
  { id: 4, name: "Item 4", qtde: 40, preco: 6.75 },
  { id: 5, name: "Item 5", qtde: 50, preco: 20 },
  { id: 6, name: "Item 6", qtde: 60, preco: 18.5 },
  { id: 7, name: "Item 7", qtde: 5, preco: 10 },
  { id: 8, name: "Item 8", qtde: 80, preco: 5.25 },
  { id: 9, name: "Item 9", qtde: 8, preco: 30 },
];

const getItembyId = (id) => {
  return itens.find((item) => item.id === id);
};

const mapItensExample = () => {
  return itens.map((item) => {
    return {
      id: item.id,
    };
  });
};

const qtdTotal = () => {
  return itens.reduce((acc, item) => {
    return acc + item.qtde;
  }, 0);
};

const exemploFilter = () => {
  return itens.filter((item) => item.qtde > 50);
};

const sortByQtde = () => {
  return itens.sort((a, b) => a.qtde - b.qtde);
};

// Soma do carrinho: quantidade * preço de cada item
const totalCarrinho = () => {
  return itens.reduce((acc, item) => {
    return acc + item.qtde * item.preco;
  }, 0);
};
