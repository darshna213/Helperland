//< !--bootstrap js cdn-- >
/*<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>*/


function tab1() {
    $("#admin-service-history").removeClass("d-none");
    $("#admin-user-management").addClass("d-none");
}
function tab2() {
    $("#admin-service-history").addClass("d-none");
    $("#admin-user-management").removeClass("d-none");
}

$("#tab1").click(function () {
    tab1css();
});
$("#tab2").click(function () {
    tab2css();
});

function tab1css() {
    $("#tab1").addClass("active-class");
    $("#tab2").removeClass("active-class");
}
function tab2css() {
    $("#tab1").removeClass("active-class");
    $("#tab2").addClass("active-class");
}

///////admin-servicehistory//////////
getServicehistoryDetails();
function getServicehistoryDetails() {

    data = {}
    $.ajax({
        type: 'POST',
        url: '/Admin/GetServiceHistoryDetails',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: data,
        success:
            function (response) {
                var json = JSON.parse(response);
                var table = document.getElementById("data-table");
                $("#data-table td").remove();

                for (var i = 0; i < json.length; i++) {
                    var row = table.insertRow();

                    var cell1 = row.insertCell(0);

                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);


                    var CustomerName = json[i].CustomerName;
                    var startDate = json[i].ServiceStartDate;
                    var duration = json[i].ServiceTotalHour;
                    var startTime = json[i].ServiceStartTime;
                    var endTime = '';
                    if (startTime.split(":")[1] == '30') {
                        endTime = parseFloat(startTime.split(":")[0]) + duration + 0.5;
                    }
                    else {
                        endTime = parseFloat(startTime.split(":")[0]) + duration;
                    }
                    if ((endTime + "").split(".")[1] == 5) {
                        endTime = (endTime + "").split(".")[0] + ":30";
                    }
                    else {
                        endTime = (endTime + "").split(".")[0] + ":00";
                    }

                    var TotalCost = json[i].TotalCost;
                    var add = json[i].AddressLine2 + ' ' + json[i].AddressLine1 + ' ' + json[i].PostalCode + ' ' + json[i].City;
                    var SubTotal = json[i].SubTotal;

                    cell1.innerHTML = '<td>' + json[i].RequestId + '</td>';
                    cell2.innerHTML = '<td>' + '<p class="date" id="service-content">' + ' <img src="/IMAGES/calendar2.png">' + startDate + '</p>' + ' <p id="service-content">' + '<img src="/IMAGES/time.png">' + startTime + '-' + endTime + '</p>' + '</td>';
                    cell3.innerHTML = '<td>' + '<p>' + CustomerName + '</p>' + '<p>' + '<img src="/IMAGES/home.png">' + add + '</p>' + '</td >';

                    if (json[i].ServiceProviderId != null) {
                        var sum = 0.0;
                        for (var rat = 0; rat < json[i].AverageRatings.length; rat++) {
                            sum += parseFloat(json[i].AverageRatings[rat]);
                        }
                        var averageRatings = 0;
                        if (json[i].AverageRatings.length != 0) {
                            averageRatings = sum / json[i].AverageRatings.length;
                        }
                        //  const averageRatings = 3.0;
                        Start =
                            '<div class="a flex-wrap">' +
                            '<div class="rounded-circle d-flex justify-content-center align-items-center cap-icon">' +
                            '<img src="/IMAGES/cap.png">' +
                            '</div>' +
                            '<div>' +
                            '<p class="lum-watson">' + json[i].SpFirstName + " " + json[i].SpLastName + ' </p>';


                        end =
                            "<span>" + averageRatings + "</span>" + "</div>" + "</div>";

                        middle = "";
                        for (let i = 0; i < averageRatings; i++) {
                            middle =
                                middle + '<img src="/IMAGES/star-yellow.png">';
                        }
                        for (let i = 0; i < 5 - averageRatings; i++) {
                            middle =
                                middle + '<img src="/IMAGES/star-grey.png">';
                        }
                        cell4.innerHTML = Start + middle + end;

                    }




                    var Status = json[i].Status;
                    if (Status == 3) {
                        cell5.innerHTML =
                            '<button class="cancelled-btn" disabled>Cancelled</button>';

                        cell6.innerHTML = '<td>' + '<div class="btn-group user_menu">' +
                            '<button class="btn" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" style="padding-right:45px;">' +
                            '<img src="/IMAGES/menu-3dots.png" alt="3dots">' + '</button>' + '<ul class="dropdown-menu" aria-labelledby="defaultDropdown">' +
                            '<li><a class="dropdown-item" href="#">Inquiry</a></li>' +
                            '<li><a class="dropdown-item" href="#">History Log</a></li>' +
                            '<li><a class="dropdown-item" href="#">Download Invoice</a></li>' +
                            '<li><a class="dropdown-item" href="#">Other Transactions</a></li>' +
                            '</ul>' + '</div>' + '</td>';


                    } else if (Status == 2) {
                        cell5.innerHTML =
                            '<button disabled href="#" class="completed-btn text-white">Completed</button>';

                        cell6.innerHTML = '<td>' + '<div class="btn-group user_menu">' +
                            '<button class="btn" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" style="padding-right:45px;">' +
                            '<img src="/IMAGES/menu-3dots.png" alt="3dots">' + '</button>' + '<ul class="dropdown-menu" aria-labelledby="defaultDropdown">' +
                            '<li><a class="dropdown-item" href="#">Inquiry</a></li>' +
                            '<li><a class="dropdown-item" href="#">History Log</a></li>' +
                            '<li><a class="dropdown-item" href="#">Download Invoice</a></li>' +
                            '<li><a class="dropdown-item" href="#">Other Transactions</a></li>' +
                            '</ul>' + '</div>' + '</td>';


                    } else if (Status == 4) {
                        cell5.innerHTML =
                            '<button disabled href="#" class="pending-btn text-white">Pending</button>';

                        cell6.innerHTML = '<td>' + '<div class="btn-group user_menu">' +
                            '<button class="btn" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" style="padding-right:45px;">' +
                            '<img src="/IMAGES/menu-3dots.png" alt="3dots">' + '</button>' + '<ul class="dropdown-menu" aria-labelledby="defaultDropdown">' +
                            '<li><a class="dropdown-item" onclick="editreschedule(\'' + json[i].RequestId + '\')">Edit & Reschedule</a></li>' +
                            '<li><a class="dropdown-item" onclick="cancelservice(\'' + json[i].RequestId + '\')">Cancel SR by Cust</a></li>' +
                            '<li><a class="dropdown-item" href="#">Inquiry</a></li>' +
                            '<li><a class="dropdown-item" href="#">History Log</a></li>' +
                            '<li><a class="dropdown-item" href="#">Download Invoice</a></li>' +
                            '<li><a class="dropdown-item" href="#">Other Transactions</a></li>' +
                            '</ul>' + '</div>' + '</td>';

                    } else if (Status == 1) {
                        cell5.innerHTML =
                            '<button disabled href="#" class="new-btn text-white">new</button>';

                        cell6.innerHTML = '<td>' + '<div class="btn-group user_menu">' +
                            '<button class="btn" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" style="padding-right:45px;">' +
                            '<img src="/IMAGES/menu-3dots.png" alt="3dots">' + '</button>' + '<ul class="dropdown-menu" aria-labelledby="defaultDropdown">' +
                            '<li><a class="dropdown-item" onclick="editreschedule(\'' + json[i].RequestId + '\')">Edit & Reschedule</a></li>' +
                            '<li><a class="dropdown-item" onclick="cancelservice(\'' + json[i].RequestId + '\')">Cancel SR by Cust</a></li>' +
                            '<li><a class="dropdown-item" href="#">Inquiry</a></li>' +
                            '<li><a class="dropdown-item" href="#">History Log</a></li>' +
                            '<li><a class="dropdown-item" href="#">Download Invoice</a></li>' +
                            '<li><a class="dropdown-item" href="#">Other Transactions</a></li>' +
                            '</ul>' + '</div>' + '</td>';

                    }



                }

            },
        error:
            function (response) {
                console.error(response);
                alert("error-1");
            }

    });
}
///////////////reschedule/////////////
function editreschedule(serviceID) {
    document.getElementById("editId").value = serviceID;

    document.getElementById("edit-modal-open-button").click();
}

$("#update-now-btn").click(function () {
    var serviceId = $("#editId").val();
    var date = $("#edit-date-modal").val();
    var time = $("#edit-time-modal").val();

    var addressLine1 = $("#edit-streetname-modal").val();
    var addressLine2 = $("#edit-housename-modal").val();
    var city = $("#edit-city-modal").val();
    var postalCode = $("#edit-postalcode-modal").val();
    var reason = $("#reschedule-modal-textarea").val();
    var model = {
        ServiceId: parseInt(serviceId),
        NewServiceDate: date,
        NewServicetime: time,
        AddressLine1: addressLine1,
        AddressLine2: addressLine2,
        City: city,
        PostalCode: postalCode,
        Reason: reason
    };
    $.ajax(
        {
            type: 'POST',
            url: '/Admin/UpdateServiceRequest',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: model,
            success:
                function (response) {

                    alert("service has been updated");
                },
            error:
                function (response) {
                    
                    alert("wrong-wrong");
                }
        });
});
/////////Cancel/////////
function cancelservice(serviceID) {
    document.getElementById("cancelId").value = serviceID;

    document.getElementById("cancel-modal-open-button").click();
}
$("#cancel-now-btn").click(function () {
    if (document.getElementById("cancel-modal-textarea").value.length >= 3) {
        var serviceId = $("#cancelId").val();
        var reason = $("#cancel-modal-textarea").val();
        var model = {
            ServiceId: parseInt(serviceId),
            Comments: reason
        }

        $.ajax(
            {
                type: 'POST',
                url: '/Admin/CancelService',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data: model,
                success:
                    function (response) {

                        alert("Service has been successfully Cancelled");
                    },
                error:
                    function (response) {
                        console.error(response);
                        alert("Something went wrong");
                    }
            });

    }
    else {
        alert("Please write in brief, why you want to cancel service");
    }
});


//date validation
$(function () {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;

    // or instead:
    // var maxDate = dtToday.toISOString().substr(0, 10);


    $('#edit-date-modal').attr('min', maxDate);
});



//////////filer data(service-history)///////////
function myFunction() {
    var input, filter, table, tr, td, i, j, cellValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("data-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        if (td) {
            for (j = 0; j < td.length; j++) {
                cellValue = td[j].textContent || td[j].innerText;
                if (cellValue.trim().toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}
function SelectedTextValue(ele) {
    if (ele.selectedIndex > 0) {
        var selectedText = ele.options[ele.selectedIndex].innerHTML;
        var selectedValue = ele.value;
        document.getElementById("myInput").value = selectedText;
    }
    else {
        document.getElementById("myInput").value = "";
    }
}



//excel sheet (User management) download
function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('data-table1');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || ('User-management.' + (type || 'xlsx')));
}
/////////Admin-(Get Usermanagement Details)/////////////
getUserManagementDetails();
function getUserManagementDetails() {

    $.ajax({
        type: 'POST',
        url: '/Admin/GetUserManagementDetails',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: data,
        success:
            function (response) {
                var json = JSON.parse(response);
                var table = document.getElementById("data-table1");
                $("#data-table1 td").remove();

                for (var i = 0; i < json.length; i++) {
                    var row = table.insertRow();

                    var cell1 = row.insertCell(0);

                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    var cell7 = row.insertCell(6);
                    var cell8 = row.insertCell(7);
                    var cell9 = row.insertCell(8);


                    var CustomerName = json[i].CustomerName;
                    var PostalCode = json[i].PostalCode;
                    var Phone = json[i].Phone;
                    var UserType = json[i].UserType;
                    var RegistrationDate = json[i].RegistrationDate;



                    cell1.innerHTML = '<td>' + CustomerName + '</td>';

                    cell3.innerHTML =
                        '<img src="/IMAGES/calendar2.png" />' +
                        '<strong id="date"></strong> ' + RegistrationDate;


                    if (UserType == 1) {
                        cell4.innerHTML = '<td>' + 'Customer' + '</td>';
                    } else if (UserType == 2) {
                        cell4.innerHTML = '<td>' + 'Service Provider' + '</td>';
                    }


                    cell5.innerHTML = '<td>' + Phone + '</td>';
                    if (PostalCode != null) {
                        cell6.innerHTML = '<td>' + PostalCode + '</td>';
                    }


                    var Status = json[i].Status;
                    if (Status == 1) {
                        cell7.innerHTML = '<td style="text-align: center;">' + '<button class="active-btn">Active</button>' + '</td>';
                    } else if (Status == 2) {
                        cell7.innerHTML = '<td style="text-align: center;">' + '<button class="inactive-btn">Inactive</button>' + '</td>';
                    }


                    cell8.innerHTML = '<td>' + '<div class="btn-group user_menu">' +
                        '<button class="btn" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" style="padding-right:45px;">' +
                        '<img src="/IMAGES/menu-3dots.png" alt="3dots">' + '</button>' + '<ul class="dropdown-menu" aria-labelledby="defaultDropdown">' +
                        '<li><a class="dropdown-item" onclick="activeinactive(\'' + json[i].UserId + '\',\'' + Status + '\',\'' + json[i].Email + '\')">Active/Inactive</a></li>' +
                        '</ul>' + '</div>' + '</td>';

                    cell9.innerHTML = json[i].Email;
                    cell9.setAttribute("hidden", true);

                }

            },
        error:
            function (response) {
                console.error(response);
                alert("error-1");
            }

    });
}
/////active-deactive////
function activeinactive(UserId, Status, Email) {
    document.getElementById("activeId").value = UserId;
    document.getElementById("status").value = Status;
    document.getElementById("emailId").value = Email;
    
    document.getElementById("active-modal-open-button").click();


}
$('#active-inactive-btn').click(function() {
    var serviceId = $("#activeId").val();
    var status = $("#status").val();
    var email = $("#emailId").val();
    
    var model = {
        ServiceId: parseInt(serviceId),
        Status: status,
        Email: email
    }
    $.ajax(
        {
            type: 'POST',
            url: '/Admin/ActivateDeActivateUser',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: model,
            success:
                function (response) {

                    alert("Changes Saved!");
                    getUserManagementDetails();
                    
                },
            error:
                function (response) {
                    console.error(response);
                    alert("no change");
                }
        });
});



//////////filer data(User management)///////////
function mysearchFunction() {
    var input, filter, table, tr, td, i, j, cellValue;
    input = document.getElementById("myInputs");
    filter = input.value.toUpperCase();
    table = document.getElementById("data-table1");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        if (td) {
            for (j = 0; j < td.length; j++) {
                cellValue = td[j].textContent || td[j].innerText;
                if (cellValue.trim().toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}
function SelectedDataValue(ele) {
    if (ele.selectedIndex > 0) {
        var selectedText = ele.options[ele.selectedIndex].innerHTML;
        var selectedValue = ele.value;
        document.getElementById("myInputs").value = selectedText;
    }
    else {
        document.getElementById("myInputs").value = "";
    }
}


