$(document).ready(function () {
    getEmpdetails();
});
var getEmpdetails = function () {
    debugger
    var id = $("#hdnId").val();
    var model = { RegId: id }
    {
        $.ajax({
            url: "/Registration/Details",
            method: "get",
            data: JSON.stringify(model),
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                debugger
                var html = "";
                html += "<tr><td>" + response.model.RegId + "</td><td>" + response.model.Name + "</td><td>" + response.model.Address + "</td><td>" + response.model.MobileNo + "</td><td>" + response.model.UserName + "</td><td>" + response.model.PassWord + "</td>></tr>"
                $("#tbldetauls").append(html);
            }
        });
    };
}