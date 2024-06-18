$(document).ready(function () {
    getlist();
    getEmpdetails();
});
var savereg = function () {
    debugger
 
    var id = $("#hdnid").val();
    var name = $("#txtName").val();
    var address = $("#txtAdd").val();
    var mobile = $("#txtMobile").val();
    var uname = $("#txtusername").val();
    var password = $("#txtpass").val();

    var model = { RegId: id, Name: name, Address: address, MobileNo: mobile, UserName: uname, PassWord: password };
    console.log("line1");
    $.ajax({
        url: "/Registration/SaveReg",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("Successfull");
            debugger;
            console.log("Line2");
        }
    });
    console.log("line3");
}
var getlist = function () {
    debugger
    {
        $.ajax({
            url: "/Registration/Getlist",
            method: "post",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                var html = "";
                $.each(response.model, function (index, elementValue) {
                    html += "<tr><td>" + elementValue.RegId + "</td><td>" + elementValue.Name + "</td><td>" + elementValue.Address + "</td><td>" + elementValue.MobileNo + "</td><td>" + elementValue.UserName + "</td><td>" + elementValue.PassWord + "</td><td><input type='submit' value='Details' onclick='details(" + elementValue.RegId + ")'/></td><td><input type='submit' value='GetDetails' onclick='Getdetails(" + elementValue.RegId + ")'/></td></tr>";
                });
                $("#tblreg tbody").append(html);
            }
        });
    };
}

//details on same page
var details = function (id) {
    debugger;
    var model = { RegId: id };
    $.ajax({
        url: "/Registration/DetailsShow",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#lblid").text(response.Model.RegId);
            $("#lblname").text(response.Model.Name);
            $("#lbladd").text(response.Model.Address);
            $("#lblmob").text(response.Model.MobileNo);
            $("#lbluname").text(response.Model.UserName);
            $("#lblpass").text(response.Model.PassWord);
        }
    });
}



// details on next page
var Getdetails = function (RegId) {
    debugger;
    window.location.href = "/Registration/DetailsIndex?RegId=" + RegId;
}
var getEmpdetails = function () {
    debugger
    var Id = $("#hdnId").val();
    var model = { RegId: Id }
    {
        $.ajax({
            url: "/Registration/DetailsShow",
            method: "post",
            data: JSON.stringify(model),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                debugger
                var html = "";
                html += "<tr><td>" + response.Model.RegId + "</td><td>" + response.Model.Name + "</td><td>" + response.Model.Address + "</td><td>" + response.Model.MobileNo + "</td><td>" + response.Model.UserName + "</td><td>" + response.Model.PassWord + "</td>></tr>"
                $("#tbldetails").append(html);
            }
        });
    };
}