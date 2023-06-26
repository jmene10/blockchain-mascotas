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
            console.log("No hay ningún navegador ethereum instalado. Instala MetaMask");
        }
    },

    loadAccount: async() => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        App.account = accounts[0];
    },

    loadContract: async() => {
        try {
            const res = await fetch("build/contracts/Owners.json");
            const ownersJson = await res.json();

            App.contracts.Owners = TruffleContract(ownersJson);
            App.contracts.Owners.setProvider(App.web3Provider);

            App.owners = await App.contracts.Owners.deployed();
        } catch (error) {
            console.error(error);
        }
    },

    loadCuenta: async() => {
        document.getElementById("account").innerText = App.account;
    },

    loadMascotas: async() => {
        const mascotasCounter = await App.owners.total();
        const mascotasCounterNum = mascotasCounter.toNumber();

        let html = "";

        for (let i = 1; i <= mascotasCounterNum; i++) {
            const mascota = await App.owners.mascotas(i);
            console.log(mascota);
            const mascotaId = mascota[0].toNumber();
            const seller = mascota[1];
            const tipoMascota = mascota[2];
            const razaMascota = mascota[3];
            const precio = mascota[4];
            const isAvailable = mascota[5];

            const image = `images/mascota${mascotaId}.jpg`;

            let htmlElement = `<div class="card bg-dark rounded-0 mb-2">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="panel-heading">
              <br/><br/><h3 class="panel-title">${tipoMascota}</h3>
            </div>
            <div id="contenedor">
              <div class="content">
                <img alt="140x140" class="img-rounded img-center" width="240px" height="240px" src="${image}" data-holder-rendered="true">
                <br/><br/>
                <button class="btn btn-default btn-buy" type="button" id="${mascotaId}" ${
        isAvailable === false ? "disabled" : ""
      }>Comprar</button>
              </div>
              <div class="content">
                <h4 class="house-seller" style="font-family: helvética;">Vendedor: ${seller}</h4>
                <h4 class="house-state" style="font-family: helvética;">Raza Mascota: ${razaMascota}</h4>
                <h4 class="house-precio" style="font-family: helvética;">Precio: ${precio} Eth</h4>
              </div>
            </div>
          </div>
        </div>`;

            html += htmlElement;
        }

        document.querySelector("#mascotasList").innerHTML = html;
    },

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
    },
};

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});