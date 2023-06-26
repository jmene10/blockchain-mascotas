document.addEventListener("DOMContentLoaded", () => {
    App.init();
});


const mascotaForm = document.querySelector("#mascotaForm");
//Obtiene los datos del formulario
mascotaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const seller = mascotaForm["seller"].value;
    const tipoMascota = mascotaForm["tipoMascota"].value;
    const razaMascota = mascotaForm["razaMascota"].value;
    const precio = mascotaForm["precio"].value;

    App.createMascota(seller, tipoMascota, razaMascota, precio);
});

const mascotaList = document.querySelector("#mascotaList");

//Obtiene el id del boton de comprar de cada mascota
mascotaList.addEventListener("click", (e) => {
    e.preventDefault();
    const mascotaId = e.target.getAttribute('id');

    App.buyMascota(mascotaId);
});