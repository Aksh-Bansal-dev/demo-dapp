const HelloWorld = artifacts.require("HelloWorld");

contract("HelloWorld", () => {
  let helloWorld = null;
  before(async () => {
    helloWorld = await HelloWorld.deployed();
  });
  it("Should return Hello World", async () => {
    const result = await helloWorld.hello();
    assert(result === "Hello World");
  });

  it("Should return sent text", async () => {
    const result = await helloWorld.print("Sent text");
    assert(result == "Sent text");
  });

  it("Should add element to array", async () => {
    await helloWorld.addItem(1);
    await helloWorld.addItem(2);

    const result = await helloWorld.length();
    assert(result.toNumber() === 2);
  });

  it("Should return element at index", async () => {
    await helloWorld.addItem(1);
    await helloWorld.addItem(2);

    const result1 = await helloWorld.getIdx(0);
    const result2 = await helloWorld.getIdx(1);
    assert(result1.toNumber() === 1 && result2.toNumber() === 2);
  });

  it("Should return entire array", async () => {
    await helloWorld.addItem(1);
    await helloWorld.addItem(2);

    const rawArr = await helloWorld.getAll();
    const arr = rawArr.map((e) => e.toNumber());
    assert.deepEqual(arr, [1, 2, 1, 2, 1, 2]);
  });
});

contract("Users CRUD", () => {
  let helloWorld = null;
  before(async () => {
    helloWorld = await HelloWorld.deployed();
  });

  it("Should create a new user", async () => {
    await helloWorld.createUser("testuser");

    const res = await helloWorld.getUser(1);
    assert(res[0].toNumber() == 1 && res[1] == "testuser");
  });

  it("Should update an existing user", async () => {
    await helloWorld.updateUser(1, "updateduser");

    const res = await helloWorld.getUser(1);
    assert(res[0].toNumber() == 1 && res[1] == "updateduser");
  });

  it("Should NOT find a user", async () => {
    try {
      const res = await helloWorld.getUser(10);
      assert(false);
    } catch (err) {
      assert(err.message.includes("User does not exist"));
    }
  });

  it("Should delete an existing user", async () => {
    await helloWorld.deleteUser(1);
    try {
      const res = await helloWorld.getUser(1);
      assert(false);
    } catch (err) {
      assert(err.message.includes("User does not exist"));
    }
  });

  it("Should NOT delete any user", async () => {
    try {
      await helloWorld.deleteUser(10);
      assert(false);
    } catch (err) {
      assert(err.message.includes("User does not exist"));
    }
  });
});
