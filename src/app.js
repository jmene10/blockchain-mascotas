App = {
    contracts: {},
    init: async() => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.loadCuenta();
        await App.loadMenus();
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

    // carga cuenta metamask
    loadAccount: async() => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        App.account = accounts[0];
    },

    // cargar contrato
    loadContract: async() => {
        try {
            const res = await fetch("Owners.json");
            const ownersJ = await res.json();
            App.contracts.Owners = TruffleContract(ownersJ);
            App.contracts.Owners.setProvider(App.web3Provider);

            App.owners = await App.con.Owners.deployed();
        } catch (error) {
            console.error(error);
        }
    },

    // funcion que llama a cuenta que hemos cargado previamente
    loadCuenta: async() => {
        document.getElementById("account").innerText = App.account;
    },

    // mostrar todas las casas almacenadas
    loadMenus: async() => {
        const menusCounter = await App.owners.total();
        const menusCounterNum = menusCounter.toNumber();

        let html = "";

        for (let i = 1; i <= menusCounterNum; i++) {
            const menu = await App.owners.menus(i);
            console.log(menu);
            const menuId = menus[0].toNumber();
            const primerPlato = menus[1];
            const segundoPlato = menus[2];
            const postre = menus[3];
            const precio = menus[4];
            const isAvailable = menus[5];

            // imagenes de los menus
            const image = "images/house" + menuId + ".jpg";

            // cargar menus nuevos que se añaden

            document.querySelector("#menusList").innerHTML = html;
        }

    }

    // envia datos formulario y crea nueva casa
        createMenu: async(primerPlato, segundoPlato, postre, disponible, precio) => {
        try {
            const res = await App.owners.addNewMenu(primerPlato, segundoPlato, postre, disponible, precio, {
                from: App.account,
            });
            console.log(res.logs[0].args);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    },

    // llama a funcion comprar y marca menu como vendido
    buyMenu: async(menuId) => {
        try {
            const res = await App.owners.buy(menuId, {
                from: App.account,
            });
            console.log(res.logs[0].args);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
}