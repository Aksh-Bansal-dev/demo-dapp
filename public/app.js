const contractABI = [
  {
    constant: true,
    inputs: [],
    name: "data",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getData",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "_data",
        type: "string",
      },
    ],
    name: "setData",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "s",
        type: "string",
      },
    ],
    name: "justPrint",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "hello",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
];

const contractAddress = "0xE25e70FCB82184f8dC90692cbaCF19698f9e4CF2";
const web3 = new Web3("http://localhost:9545");
const helloWorld = new web3.eth.Contract(contractABI, contractAddress);

const getData = (displayData) => {
  helloWorld.methods
    .getData()
    .call()
    .then((res) => {
      displayData.innerHTML = res;
    });
};

const setData = (data, displayData, accounts) => {
  helloWorld.methods
    .setData(data)
    .send({ from: accounts[0] })
    .then(() => getData(displayData));
};
window.addEventListener("load", () => {
  const form = document.getElementById("onlyform");
  const displayData = document.getElementById("datahere");
  helloWorld.methods
    .hello()
    .call()
    .then((res) => {
      document.getElementById("here").innerHTML = res;
    });

  let acc = [];
  web3.eth.getAccounts().then((_acc) => {
    acc = [..._acc];
  });
  getData(displayData);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = e.target.elements[0].value;
    setData(data, displayData, acc);
  });
});
