$(document).ready(function () {
    getlist();
});

var saveEmployee = function () {
    debugger
    $formData = new FormData();
    var img1 = document.getElementById("File1");;
    if (img1.files.length > 0) {
        for (var i = 0; i < img1.files.length; i++) {
            $formData.append('file-' + i, img1.files[i]);
        }
    }
    var id = $("#hdnid").val();
    var name = $("#txtName").val();
    var address = $("#txtAdd").val();
    var mobile = $("#txtMobile").val();
    var pincode = $("#txtpin").val();

    $formData.append('Id', id);
    $formData.append('EmpName', name);
    $formData.append('EmpAddress', address);
    $formData.append('MobileNo', mobile);
    $formData.append('Pincode', pincode);

    //var model = { Id: id, EmpName: name, EmpAddress: address, MobileNo: mobile, Pincode: pincode };

    $.ajax({
        url: "/Employee/SaveEmp",
        method: "post",
        data: $formData,
        contentType: "application/json;charset=utf-8",
        contentType: false,
        processData: false,
        success: function (response) {
            alert("Successfull");
        }
    });
}

var getlist = function () {
    debugger
    {
        $.ajax({
            url: "/Employee/Getlist",
            method: "post",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                tbl(response);// fnction name

                //var html = "";
                //$.each(response.model, function (index, elementValue) {
                //    html += "<tr><td>" + elementValue.Id + "</td><td>" + elementValue.EmpName + "</td><td>" + elementValue.EmpAddress + "</td><td>" + elementValue.MobileNo + "</td><td>" + elementValue.Pincode + "</td><td><img src='../Content/img/" + elementValue.Photo + "'height='150'width='150'/></td><td><input type = 'submit' value = 'Delete' onclick = 'deletedata(" + elementValue.Id + ")'/></td><td><input type = 'submit' value = 'Edit' onclick = 'editemployee(" + elementValue.Id + ")'/></td></tr>"
                //});
                //$("#tblEmp tbody").append(html);
            }
        });
    };
}

function tbl(response) {
    debugger;
    var datatableVariable = $("#tblemp").DataTable(
        {
            "responsive": false, "lengthChange": true, "autoWidth": false,
            "deferRender": true,
            paging: true,
            searching: true,
            destroy: true,
            bottons: [

            ],
            initComplete: function () {
                //apply the search
                this.api()
                    .column()
                    .every(function () {
                        var that = this;

                        $('input', this.header()).on('keyup change clear', function () {
                            if (that.search() !== this.value) {
                                that.search(this.value).draw();
                            }
                        });
                    });
            },
            data: response.model,
            columns: [
                //{
                //    "data": "id", "title": "SNo",
                //    render: function (data, type, row, meta) {
                //        return meta.row + meta.settings._iDisplayStart + 1;
                //    }
                //},
                { 'data': 'Id', 'title': 'Id' },
                { 'data': 'EmpName', 'title': 'EmpName' },
                /* { 'data': 'Photo', 'title': 'Photo' },*/
                { 'data': 'EmpAddress', 'title': 'EmpAddress' },
                { 'data': 'MobileNo', 'title': 'MobileNo' },
                { 'data': 'Pincode', 'title': 'Pincode' },
                /* { 'data': 'Photo', 'title': 'Photo' },*/

                {
                    'title': 'Photo',
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<center><img src="../Content/img/' + JsonResultRow.Photo + '" style="height:80px;width:80px;"/></center>';
                    }
                },

                {
                    'data': null, title: 'Details', wrap: true, "bAutoWidth": false, "render": function (item) {
                        /* return '<center><div class="btn-group"><button type="button" value="Delete" data-toggle="modal" onclick="DeleteRecord(' + "'" + item.Id + "'" + ')" value="0" class="btn btn-danger btn-sm "  id="btn-sa-confirm"><i class="nav-icon fas fa-trash">Delete</i></button></div>'+'<div class="btn-group"><button type="button" onclick="EditMethod(' + "'" + item.Id + "'" + ');" class="btn btn-secondary btn-sm"><i class="nav-icon fas fa-edit">Edit</i></button></div></center>'*/
                        return '<center><div class="btn-group"><button type="button" value="Delete" data-toggle="modal" onclick="deletedata(' + "'" + item.Id + "'" + ')" value="0" class="btn btn-danger btn-sm "  id="btn-sa-confirm"><i class="nav-icon fas fa-trash">Delete</i></button>&nbsp;&nbsp;<button type="button" onclick="editemployee(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="nav-icon fas fa-edit">Edit</i></button>&nbsp;&nbsp;<button type="button" onclick="getdetails(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="nav-icon fas fa-edit">Details</i></button></div></center>'
                    },
                },
            ]
        }).buttons().container().appendTo('#tblemp_wrapper.col-md-6:eq(0)');

    return datatableVariable;

};
var deletedata = function (id) {
    var model = { Id: id };
    $.ajax({
        url: "/Employee/deleteEmp",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/Json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            alert("Record delete successfully");
        }
    });
}

var editemployee = function (id) {
    var model = { Id: id };

    $.ajax({
        url: "/Employee/EditdetailsEmp",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/Json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#hdnid").val(response.model.Id);
            $("#txtName").val(response.model.EmpName);
            $("#txtAdd").val(response.model.EmpAddress);
            $("#txtMobile").val(response.model.MobileNo);
            $("#txtpin").val(response.model.Pincode);
        }
    });
}

//var Detail = function (Id) {
//    debugger;
//    window.location.href = "/Employee/EditdetailsEmp?Id=" + Id;
//}


var getdetails = function (Id){
    var model = { Id: Id }
    $.ajax({
        url: "/Employee/EditdetailsEmp",
        method: "post",
        data: JSON.stringify(model),
         contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#WriteToUsModal").modal('show');
            $("#idmod").empty();
            var html = "";
            html += "<div class='row'>";
            html += "<div class='col-sm-3'>";
            html += "<img src='../Content/img/" + response.model.Photo + "'style='height: 100px; width: 120px;'/>";
            html += "</div>";
            html += "<div class='col-sm-6'>";
            html += "<label>Emplyee Name :&nbsp<span>" + response.model.EmpName + "</span></label>";
            html += "</br>";
            html += "<label>Employee Address :&nbsp<span>" + response.model.EmpAddress + "</span></label>";
            html += "</br>";
            html += "<label>Mobile Number :&nbsp<span>" + response.model.MobileNo + "</span></label>";
            html += "</br>";
            html += "<label>Pincode :&nbsp<span>" + response.model.Pincode + "</span></label>";
            html += "</div>";
            html += "</div>";
            $("#idmod").append(html);
        }
    })
}