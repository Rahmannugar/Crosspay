require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/2IZqE1QposGzeuElDNapu9GZiPdp7k0A",
      accounts: [
        "2f99db8cdb04655028eee1dc98230925202f6b3e010e43fad2883b4bea90a1a3",
      ],
    },
  },
};
