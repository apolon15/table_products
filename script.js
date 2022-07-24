let venCode = 1;
let products = [
    { 'vendorCode': venCode++, 'name': 'Кроссовки', 'firm': 'adidas', 'color': ['красный', 'зеленый', 'синий'], 'cost': 50 },
    { 'vendorCode': venCode++, 'name': 'Кроссовки', 'firm': 'asics', 'color': ['красный', 'зеленый'], 'cost': 10 },
    { 'vendorCode': venCode++, 'name': 'Кроссовки', 'firm': 'nike', 'color': ['зеленый', 'синий'], 'cost': 80 },

]
init();

function init() {
    for (let index = 0; index < products.length; index++) {
        let shoes_obj = products[index];
        addRow(shoes_obj);
    }
};

function resId(venCode) {
    for (let i = venCode; i <= products.length; i++) {
        products[i - 1].vendorCode = parseInt(i);

    }
};

function addRow(shoes_obj) {
    let row = `<tr class="tr-${shoes_obj.vendorCode}"> 
    <td>${shoes_obj.vendorCode}</td>
    <td>${shoes_obj.name}</td>
    <td>${shoes_obj.firm}</td>
    <td>${shoes_obj.color}</td>
    <td>${shoes_obj.cost}</td>
    <td>
        <button class="button__delete" id="button__${shoes_obj.vendorCode}" data-userid="${shoes_obj.vendorCode}" onclick="deleteShoes('${shoes_obj.vendorCode}')">Delete</button>
        <button class="button__update" id="button__update__${shoes_obj.vendorCode}" data-userid="${shoes_obj.vendorCode}" onclick="update('${shoes_obj.vendorCode}')">Update</button>
    </td>
    </tr>`;
    let tbody = document.querySelector('#table__shoes');
    tbody.innerHTML = tbody.innerHTML + row;
}

function getMaxArt() {
    let maxArt = 0;
    for (let index = 0; index < products.length; index++) {
        if (maxArt < products[index].vendorCode) {
            maxArt = products[index].vendorCode;
        }
    }
    console.log("maxArt " + maxArt);
    return maxArt;
}

function createProduct() {
    let id = getMaxArt();
    let vendorCodeNew = parseInt(id) + 1;
    let nameNew = document.querySelector('select');
    let firmNew = document.getElementById('firmForm');
    let colorNew = getCheckedCheckBoxes();
    let costNew = document.getElementById('costForm');
    let newProduct = new Object();
    newProduct.vendorCode = vendorCodeNew;
    newProduct.name = nameNew.value;
    newProduct.firm = firmNew.value;
    newProduct.color = colorNew;
    newProduct.cost = costNew.value;
    products.push(newProduct);
    return newProduct;
}

function addNewProduct() {
    addRow(createProduct());
    clear();

}

function getCheckedCheckBoxes() {
    var checkboxes = document.getElementsByClassName('checkbox');
    var checkboxesChecked = [];
    for (var index = 0; index < checkboxes.length; index++) {
        if (checkboxes[index].checked) {
            checkboxesChecked.push(checkboxes[index].value);
        }
    }
    return checkboxesChecked;
};

function clear() {
    document.getElementById("product__form").reset();
};

function deleteShoes(shoes_obj) {
    let test = shoes_obj;
    console.log(test);
    let shoyes = products[(shoes_obj - 1)];
    let shoyesId = shoyes.vendorCode;
    // let rowForDelete = document.querySelector(`.tr-${shoyes.vendorCode}`);
    products.splice(shoyesId - 1, 1);
    resId(shoyesId);
    let body = document.getElementById("table__shoes");
    body.innerHTML = "";
    init();
    // rowForDelete.remove();
};

function getShoesById(venCode) {
    for (let index = 0; index < products.length; index++) {
        let shoes = products[index];
        if (shoes.vendorCode == venCode) {
            return shoes;
        }
    }
};
function resetCheckBox() {
    let arrCheckBox = document.getElementsByClassName("checkbox");
    for (let i = 0; i < arrCheckBox.length; i++) {
        arrCheckBox[i].checked = false;
    }
}
function update(venCode) {
    let shoes_obj = getShoesById(venCode);
    let button = document.getElementById(`button__update__${shoes_obj.vendorCode}`);
    let arrCheckBox = document.getElementsByClassName("checkbox");
    let list = document.getElementById("list");
    if (button.innerText == "Update") {
        resetCheckBox();
        for (let i = 0; i < list.length; i++) {
            if (list[i].value == shoes_obj.name) {
                list[i].selected = true;
                break;
            }
        }
        document.getElementById("firmForm").value = shoes_obj.firm;
        document.getElementById("costForm").value = shoes_obj.cost;
        for (let i = 0; i < shoes_obj.color.length; i++) {
            for (let j = 0; j < arrCheckBox.length; j++) {
                if (shoes_obj.color[i] == arrCheckBox[j].value) {
                    document.getElementById(shoes_obj.color[i]).checked = true;
                }
            }
        }
        innerUpdate();
        button.innerText = "Save";
    } else {
        for (let index = 0; index < products.length; index++) {
            if (venCode == products[index].vendorCode) {
                products[index].vendorCode = venCode;
                products[index].firm = document.getElementById("firmForm").value;
                products[index].cost = document.getElementById("costForm").value;
                products[index].name = document.getElementById("list").value;
                let tempColor = getCheckedCheckBoxes();
                products[index].color.splice(0, products[index].color.length);
                for (let i = 0; i < tempColor.length; i++) {
                    products[index].color.push(tempColor[i]);
                };
                let refresh = document.querySelector('tbody');
                refresh.innerHTML = " ";
                clear();
                init();
                break;
            }
        }
    }
};
function innerUpdate() {
    let allButton = document.getElementsByClassName('button__update');
    for (let i = 0; i < allButton.length; i++) {
        allButton[i].innerText = "Update";
    }
};
// function addListenerForDeleteButtons() {
//     let arrButtonsDelete = document.querySelectorAll('.button__delete');
//     for (let index = 0; index < arrButtonsDelete.length; index++) {
//         arrButtonsDelete[index].onclick = function (e) {
//             let userId = e.target.dataset.userid; // 1 2 3
//             let rowForDelete = document.querySelector(`.tr-${userId}`);
//             rowForDelete.remove();
//         }
//     }
// };