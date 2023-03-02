App = {
    contracts: {},
    init: async() => {
        await App.loadContract();
        await App.loadWeb3();
        await App.loadAccount();
    },

    loadContract: async() => {
        try {
            var res = await fetch("Owners.json");
            var ownersJson = await res.json();

            App.contracts.Owners = TruffleContract(ownersJson);
            App.contracts.Owners.setProvider(App.web3Provider);

            App.owners = await App.contracts.Owners.deployed();
        } catch (error) {
            console.error(error);
        }
    },

    loadWeb3: async() => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            await window.ethereum.request({ method: "eth_requestAccounts" });
        } else if (web3) {
            web3 = new Web3(window.web3.currentProvider);
        } else {
            console.log(
                "No hay ningún navegador ethereum instalado. Instala MetaMask "
            );
        }
    },


    // Cuenta de Metamask en la que nos encontramos
    loadAccount: async() => {
        var accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        App.acount = accounts[0];
    },

    buyMenu: async(menuId) => {
        try {
            var result = await App.owners.buy(menuId, { from: App.acount, });
            console.log(result.logs[0].args);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }

    }
}