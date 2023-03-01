// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Owners {

    struct Menu {
        uint256 menuId; //Identificador
        string primerPlato;
        string segundoPlato;
        string postre;
        uint256 precio;
        bool isAvailable;
        address payable owner;
    }

    event MenuBuy (
        uint256 menuId,
        string primerPlato,
        string segundoPlato,
        string postre,
        uint256 precio,
        bool isAvailable,
        address payable owner
    );

    event MenuEvent (
        uint256 menuId,
        string primerPlato,
        string segundoPlato,
        string postre,
        uint256 precio,
        bool isAvailable,
        address payable owner
    );

    

    mapping(uint256 => Menu) public menus;
    uint256 public total=0;



    // function comprar menu
    function buy(uint256 _menuId) public{
        require(_menuId >=0 && _menuId < total);
        Menu memory _menu = menus[_menuId];

        require(menus[_menuId].isAvailable == true); //si el menu esta disponible 

        menus[_menuId].isAvailable == false; //registramos compra de menu 

        emit MenuBuy(total, _menu.primerPlato, _menu.segundoPlato, _menu.postre, _menu.precio, false, payable(msg.sender));
    }


    // function anyadir nuevo menu
    function addMenu(string memory _primerPlato, string memory _segundoPlato, string memory _postre, uint256 _precio) public {
        total++;
        menus[total]= Menu(total, _primerPlato, _segundoPlato, _postre, _precio, true, payable(msg.sender));
        emit MenuEvent(total, _primerPlato, _segundoPlato, _postre, _precio, true, payable(msg.sender));
    }


}