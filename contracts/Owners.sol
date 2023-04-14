// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Owners {

    struct Mascota {
        uint256 mascotaId; //Identificador
        string seller;
        string tipoMascota;
        string razaMascota;
        uint256 precio;
        bool isAvailable;
        address payable owner;
    }

    event MascotaBuy (
        uint256 mascotaId,
        string seller, 
        string tipoMascota,
        string razaMascota,
        uint256 precio,
        bool isAvailable,
        address payable owner
    );

    event MascotaEvent (
        uint256 mascotaId,
        string seller, 
        string tipoMascota,
        string razaMascota,
        uint256 precio,
        bool isAvailable,
        address payable owner
    );

    

    mapping(uint256 => Mascota) public mascotas;
    uint256 public total=0;



    // function comprar mascota
    function buyMascota(uint256 _mascotaId) public {
        require(_mascotaId >= 0 && _mascotaId < total);
        Mascota memory _mascota = mascotas[_mascotaId];

        require(mascotas[_mascotaId].isAvailable == true);

        mascotas[_mascotaId].isAvailable = false;
        
        emit MascotaBuy(total, _mascota.seller, _mascota.tipoMascota, _mascota.razaMascota, _mascota.precio, false, payable(msg.sender));
    }


    // function anyadir nuevo menu
    function addMascota(string memory _seller, string memory _tipoMascota, string memory _razaMascota, uint256 _precio) public {
        total++;
        mascotas[total]= Mascota(total, _seller, _tipoMascota, _razaMascota, _precio, true, payable(msg.sender));
        emit MascotaEvent(total, _seller, _tipoMascota, _razaMascota, _precio, true, payable(msg.sender));
    }


}