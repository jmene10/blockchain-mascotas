document.addEventListener("DOMContentLoaded", () => {
    App.init();
});


const menuForm = document.querySelector("#menuForm");
//Obtiene los datos del formulario
menuForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const primerPlato = menuForm["primerPlato"].value;
    const segundoPlato = menuForm["segundoPlato"].value;
    const postre = menuForm["postre"].value;
    const disponible = menuForm["disponible"].value;
    const precio = menuForm["precio"].value;

    App.createHouse(primerPlato, segundoPlato, postre, disponible, precio);
});

const menuList = document.querySelector("#menuList");
//Obtiene el atributo id del boton de comprar que corresponde a cada casa
menuList.addEventListener("click", (e) => {
    e.preventDefault();
    const menuId = e.target.getAttribute('id');

    App.buyMenu(menuId);
});