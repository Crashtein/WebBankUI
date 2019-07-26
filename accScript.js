var accountData = {Id: 0,UserName: '@UserName',Password: 'pwd',Balance: 0.00};
var transaction = {Id: 0,Amount: 0,Data: new Date(),Description: "Opis"}

function loadAcc(){
    let params = new URLSearchParams(document.location.search.substring(1));
    accountData.UserName=params.get("UserName");
    if(localStorage.getItem(accountData.UserName)){
        var local = localStorage.getItem(accountData.UserName);
        var object = JSON.parse(local);
        accountData = object;
    }else{
        
    }
    var replaced = $("body").html().replace('@UserName', accountData.UserName);
    replaced = replaced.replace('@Id', accountData.Id);
    replaced = replaced.replace('@Balance', accountData.Balance);
    $("body").html(replaced);
}
function cashOp(){
    var Am = parseInt($('#cashA').val());
    var Des = $('#cashDes').val();
    if($('#cashIn').prop("checked")){
        accountData.Balance+=Am;
        reloadPage();
    }else if(Am <=accountData.Balance){
        accountData.Balance-=Am;
        reloadPage();
    }else{
        alert("Brak wystarczających funduszy lub źle wpisana kwota!")
    }
}
function reloadPage(){
    if(localStorage.getItem(accountData.UserName)){
        localStorage.setItem(accountData.UserName,JSON.stringify(accountData));
        window.open("account.html?UserName=" + accountData.UserName, "_self");
    }else{
        alert("Wystąpił błąd");
    }
}
