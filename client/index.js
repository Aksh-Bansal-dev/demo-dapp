// import Web3 from "web3";
import HelloWorld from "../build/contracts/HelloWorld.json";

let web3;
let helloWorld;

const initWeb3 = async () => {
  // New metamask
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.enable();
    return new Web3(window.ethereum);
  }
  // Old metamask
  else if (typeof window.web3 !== "undefined") {
    return new Web3(window.web3.currentProvider);
  }
  // No metamask
  return new Web3("http://localhost:9545");
};
const initContract = () => {
  const deployKey = Object.keys(HelloWorld.networks)[0];
  return new web3.eth.Contract(
    HelloWorld.abi,
    HelloWorld.networks[deployKey].address
  );
};

const initApp = () => {
  const dataform = document.getElementById("dataform");
  const displayData = document.getElementById("datahere");
  const loading = document.getElementById("here");
  const arrinput = document.getElementById("input-data");

  // User elements
  const userFormCreate = document.getElementById("userform-create");
  const userFormRead = document.getElementById("userform-read");
  const userFormUpdate = document.getElementById("userform-update");
  const userFormDelete = document.getElementById("userform-delete");
  const UserDisplay = document.getElementById("userhere");

  helloWorld.methods
    .hello()
    .call()
    .then((res) => {
      loading.innerHTML = res;
    });
  let accounts = [];
  web3.eth
    .getAccounts()
    .then((_acc) => {
      accounts = [..._acc];
      return helloWorld.methods.getAll().call();
    })
    .then((res) => {
      displayData.innerHTML = res.join(", ");
    });

  // Array form
  dataform.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = e.target.elements[0].value;
    helloWorld.methods
      .addItem(data)
      .send({ from: accounts[0] })
      .then(() => {
        return helloWorld.methods.getAll().call();
      })
      .then((res) => {
        displayData.innerHTML = res.join(", ");
      });

    arrinput.value = "";
  });

  // Create User form
  userFormCreate.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = e.target.elements[0].value;
    helloWorld.methods
      .createUser(data)
      .send({ from: accounts[0], gas: 300000 })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        UserDisplay.innerHTML = `ERROR`;
      });
  });

  // Read User form
  userFormRead.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = e.target.elements[0].value;
    helloWorld.methods
      .getUser(data)
      .call()
      .then((res) => {
        console.log(res);
        UserDisplay.innerHTML = `${res[0]}: ${res[1]}`;
      })
      .catch((err) => {
        console.log(err);
        UserDisplay.innerHTML = `Invalid ID`;
      });
  });

  // Update User form
  userFormUpdate.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    const name = e.target.elements[1].value;
    helloWorld.methods
      .updateUser(id, name)
      .send({ from: accounts[0] })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        UserDisplay.innerHTML = `ERROR`;
      });
  });

  // Delete User form
  userFormDelete.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    helloWorld.methods
      .deleteUser(id)
      .send({ from: accounts[0] })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        UserDisplay.innerHTML = `ERROR`;
      });
  });
};

window.addEventListener("load", async () => {
  try {
    web3 = await initWeb3();
    helloWorld = await initContract();
    await initApp();
  } catch (err) {
    console.log(err);
  }
});
