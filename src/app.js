App = {
    contracts: {},
    init: async() => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.loadCuenta();
        await App.loadMascotas();
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

    // mostrar todas las mascotas existentes
    loadMenus: async() => {
        const mascotasCounter = await App.owners.total();
        const mascotasCounterNum = mascotasCounter.toNumber();

        let html = "";

        for (let i = 1; i <= mascotasCounterNum; i++) {
            const mascota = await App.owners.mascotas(i);
            console.log(mascota);
            const mascotaId = mascotas[0].toNumber();
            const seller = mascotas[1];
            const tipoMascota = mascotas[2];
            const razaMascota = mascotas[3];
            const precio = mascotas[4];
            const isAvailable = mascotas[5];

            // imagenes de las mascotas
            const image = "images/mascota" + mascotaId + ".jpg";

            // cargar mascotas nuevas que se añadan



            document.querySelector("#mascotasList").innerHTML = html;
        }

    },

    // envia datos formulario y crea nueva mascota
    createMascota: async(seller, tipoMascota, razaMascota, precio) => {
        try {
            const res = await App.owners.addMascota(seller, tipoMascota, razaMascota, precio, {
                from: App.account,
            });
            console.log(res.logs[0].args);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    },

    // llama a funcion comprar y marca mascota como vendido
    buyMascota: async(mascotaId) => {
        try {
            const res = await App.owners.buyMascota(mascotaId, {
                from: App.account,
            });
            console.log(res.logs[0].args);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
}