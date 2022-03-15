
function tab1() {
    $("#sp-dashboard").removeClass("d-none");
    $("#sp-newservicerequest").addClass("d-none");
    $("#rightsidebar").addClass("d-none");
    $("#sp-serviceschedule").addClass("d-none");
    $("#sp-servicehistory").addClass("d-none");
    $("#sp-myrating").addClass("d-none");
    $("#sp-blockcustomer").addClass("d-none");
    $("#sp-mysetting").addClass("d-none");
}
function tab2() {
    $("#sp-dashboard").addClass("d-none");
    $("#sp-newservicerequest").removeClass("d-none");
    $("#rightsidebar").addClass("d-none");
    $("#sp-serviceschedule").addClass("d-none");
    $("#sp-servicehistory").addClass("d-none");
    $("#sp-myrating").addClass("d-none");
    $("#sp-blockcustomer").addClass("d-none");
    $("#sp-mysetting").addClass("d-none");
}
function tab3() {
    $("#sp-dashboard").addClass("d-none");
    $("#sp-newservicerequest").addClass("d-none");
    $("#rightsidebar").removeClass("d-none");
    $("#sp-serviceschedule").addClass("d-none");
    $("#sp-servicehistory").addClass("d-none");
    $("#sp-myrating").addClass("d-none");
    $("#sp-blockcustomer").addClass("d-none");
    $("#sp-mysetting").addClass("d-none");
}
function tab4() {
    $("#sp-dashboard").addClass("d-none");
    $("#sp-newservicerequest").addClass("d-none");
    $("#rightsidebar").addClass("d-none");
    $("#sp-serviceschedule").removeClass("d-none");
    $("#sp-servicehistory").addClass("d-none");
    $("#sp-myrating").addClass("d-none");
    $("#sp-blockcustomer").addClass("d-none");
    $("#sp-mysetting").addClass("d-none");
}
function tab5() {
    $("#sp-dashboard").addClass("d-none");
    $("#sp-newservicerequest").addClass("d-none");
    $("#rightsidebar").addClass("d-none");
    $("#sp-serviceschedule").addClass("d-none");
    $("#sp-servicehistory").removeClass("d-none");
    $("#sp-myrating").addClass("d-none");
    $("#sp-blockcustomer").addClass("d-none");
    $("#sp-mysetting").addClass("d-none");
}


function tab6() {
    $("#sp-dashboard").addClass("d-none");
    $("#sp-newservicerequest").addClass("d-none");
    $("#rightsidebar").addClass("d-none");
    $("#sp-serviceschedule").addClass("d-none");
    $("#sp-servicehistory").addClass("d-none");
    $("#sp-myrating").removeClass("d-none");
    $("#sp-blockcustomer").addClass("d-none");
    $("#sp-mysetting").addClass("d-none");
}
function tab7() {
    $("#sp-dashboard").addClass("d-none");
    $("#sp-newservicerequest").addClass("d-none");
    $("#rightsidebar").addClass("d-none");
    $("#sp-serviceschedule").addClass("d-none");
    $("#sp-servicehistory").addClass("d-none");
    $("#sp-myrating").addClass("d-none");
    $("#sp-blockcustomer").removeClass("d-none");
    $("#sp-mysetting").addClass("d-none");
}
function mysetting() {
    $("#sp-dashboard").addClass("d-none");
    $("#sp-newservicerequest").addClass("d-none");
    $("#rightsidebar").addClass("d-none");
    $("#sp-serviceschedule").addClass("d-none");
    $("#sp-servicehistory").addClass("d-none");
    $("#sp-myrating").addClass("d-none");
    $("#sp-blockcustomer").addClass("d-none");
    $("#sp-mysetting").removeClass("d-none");
}

//my setting tab code
$("#my-details-tab").click(function () {
    mydetails();
})
$("#change-password-tab").click(function () {
    changepassword();
})
function mydetails() {
    $("#my-details-tab").addClass("tab-button-active");
    $("#change-password-tab").removeClass("tab-button-active");

    $("#my-details").removeClass("d-none");
    $("#change-password").addClass("d-none");

}

function changepassword() {
    $("#change-password-tab").addClass("tab-button-active");
    $("#my-details-tab").removeClass("tab-button-active");


    $("#my-details").addClass("d-none");

    $("#change-password").removeClass("d-none");
}

//excel sheet (servicehistory) download
function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('service-history-table');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || ('Servicehistory.' + (type || 'xlsx')));
}

//////get new servicerequest///////
getnewServiceRequest();
function getnewServiceRequest() {
    data = {}
    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/GetNewServiceRequest',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {

                    var json = JSON.parse(response);
                    var table = document.getElementById("new-service-request-table");
                    $("#new-service-request-table td").remove();


                    for (var i = 0; i < json.length; i++) {
                        var row = table.insertRow();

                        var cell1 = row.insertCell(0);

                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);
                        var cell6 = row.insertCell(5);
                        cell1.innerHTML = '<td >' + json[i].ServiceRequestId + '</td>';
                        cell2.innerHTML = '<td>' + '<p class="date">' + ' <img src="/IMAGES/calendar2.png"/>' + json[i].ServiceStartDate + ' </p>' + '<p> <img src="/IMAGES/time.png" />' + json[i].ServiceStartDate + '</p>' + '</td>';
                        cell3.innerHTML = '<td>' + '<p>' + '...' + '</p>' + '<p>' + '<img src="/IMAGES/home.png">' + '...' + '</p>' + '</td >';
                        cell4.innerHTML = ' <td >' + '<p class="euro d-flex justify-content-center" style="color: #1d7a8c; font-size: 24px; font-weight: bold">' + ' &euro;' + json[i].TotalCost + '</p>' + '</td>';
                        cell5.innerHTML = json[i].SubTotal;
                        cell6.innerHTML = '<button class="accept-btn" onclick="acceptService(\'' + json[i].ServiceRequestId + '\')">Accept</button>';
                    }
                },
            error:
                function (response) {
                    console.error(response);
                    alert("success");
                }
        });
}

////////////get upcomng-service////////////
getupcomingServiceRequest();
function getupcomingServiceRequest() {
    data = {}
    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/GetUpcomingServiceRequest',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {
                    var json = JSON.parse(response);
                    var table = document.getElementById("upcoming-service-table");
                    $("#upcoming-service-table td").remove();


                    for (var i = 0; i < json.length; i++) {
                        var row = table.insertRow();
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);
                        var cell6 = row.insertCell(5);
                        cell1.innerHTML = '<td >' + json[i].ServiceRequestId + '</td>';
                        cell2.innerHTML = '<td>' + '<p class="date">' + ' <img src="/IMAGES/calendar2.png"/>' + json[i].ServiceStartDate + ' </p>' + '<p> <img src="/IMAGES/time.png" />' + json[i].ServiceStartDate + '</p>' + '</td>';
                        cell3.innerHTML = '<td>' + '<p>' + '...' + '</p>' + '<p>' + '<img src="/IMAGES/home.png">' + '...' + '</p>' + '</td >';
                        cell4.innerHTML = ' <td >' + '<p class="euro d-flex justify-content-center" style="color: #1d7a8c; font-size: 24px; font-weight: bold">' + ' &euro;' + json[i].TotalCost + '</p>' + '</td>';
                        cell5.innerHTML = json[i].Distance;
                        cell6.innerHTML = '<button class="cancel-btn" onclick="cancelServicerequest(\'' + json[i].ServiceRequestId + '\')">Cancel</button>';
                    }
                },
            error:
                function (response) {
                    console.error(response);
                    alert("success");
                }
        });
}




/////////row model popup(new service request)///////////
$('#new-service-request-table').on('click', 'td:nth-child(1)', function () {
    getDataFromDashboardTable(this);
});
$('#new-service-request-table').on('click', 'td:nth-child(2)', function () {
    getDataFromDashboardTable(this);
});
$('#new-service-request-table').on('click', 'td:nth-child(3)', function () {
    getDataFromDashboardTable(this);
});
$('#new-service-request-table').on('click', 'td:nth-child(4)', function () {
    getDataFromDashboardTable(this);
});
$('#new-service-request-table').on('click', 'td:nth-child(5)', function () {
    getDataFromDashboardTable(this);
});

function getDataFromDashboardTable(thisTd) {
    var currentRow = $(thisTd).closest("tr");
    var col1_ServiceId = currentRow.find("td:eq(0)").text();
    var col2_ServiceDate = currentRow.find("td:eq(1)").text();
    var col4_Payment = currentRow.find("td:eq(3)").text();
    //alert(col1_ServiceId);
    //alert(col2_ServiceDate);
    //alert(col4_Payment);
   /* var col6_Extras = currentRow.find("td:eq(5)").text()*/;
    //var col7_Address = currentRow.find("td:eq(6)").text();
    //var col8_Phone = currentRow.find("td:eq(7)").text();
    //var col9_Email = currentRow.find("td:eq(8)").text();
    //var col10_Comments = currentRow.find("td:eq(9)").text();
    //var col11_Comments = currentRow.find("td:eq(10)").text();
    //var col12_HavePet = currentRow.find("td:eq(11)").text();

    $("#newserviceRequestDateTime").html(col2_ServiceDate);
    //$("#serviceRequestDuration").html(col11_Comments);
    $("#newServiceRequestId").html(col1_ServiceId);
    //$("#serviceExtra").html(col6_Extras);
    $("#total-payment").html(col4_Payment);
    //$("#serviceRequestAddress").html(col7_Address);
    //$("#ServiceRequestPhone").html(col8_Phone);
    //$("#ServiceRequestEmail").html(col9_Email);
    //$("#dashboard-service-modal-comments").html(col10_Comments);
    //$("#dashboard-service-modal-havePet").html(col12_HavePet);

    //if (tableName == "serviceHistory") {
    //    $("#service-request-modal-btns-div").addClass("d-none");
    //}
    //else {
    //    $("#service-request-modal-btns-div").removeClass("d-none");
    //}
    document.getElementById("new-service-request-row-detail-modal-open-button").click();
}
/////////row modal popup(upcoming service request)
$('#upcoming-service-table').on('click', 'td:nth-child(1)', function () {
    getDataFromTable(this);
});
$('#upcoming-service-table').on('click', 'td:nth-child(2)', function () {
    getDataFromTable(this);
});
$('#upcoming-service-table').on('click', 'td:nth-child(3)', function () {
    getDataFromTable(this);
});
$('#upcoming-service-table').on('click', 'td:nth-child(4)', function () {
    getDataFromTable(this);
});
$('#upcoming-service-table').on('click', 'td:nth-child(5)', function () {
    getDataFromTable(this);
});
function getDataFromTable(thisTd) {
    var currentRow = $(thisTd).closest("tr");
    var col1_ServiceId = currentRow.find("td:eq(0)").text();
    var col2_ServiceDate = currentRow.find("td:eq(1)").text();
    var col4_Payment = currentRow.find("td:eq(3)").text();

    $("#upcomingserviceRequestDateTime").html(col2_ServiceDate);
    //$("#serviceRequestDuration").html(col11_Comments);
    $("#upcomingServiceRequestId").html(col1_ServiceId);
    //$("#serviceExtra").html(col6_Extras);
    $("#upcoming-total-paymentt").html(col4_Payment);
    document.getElementById("upcoming-service-request-row-detail-modal-open-button").click();
}


////////////accept service request//////
function acceptService(serviceID) {
    document.getElementById("acceptId").value = serviceID;
    document.getElementById("accept-modal-open-button").click();
}

document.getElementById("accept-now-btn").addEventListener("click", () => {
    var data = {};
    data.servicerequestId = document.getElementById("acceptId").value;
    data.comments = document.getElementById("accept-modal-textarea").value;

    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/AcceptServiceRequest',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {
                    alert("Your service request is successfully accepted !");
                    getnewServiceRequest();

                },
            error:
                function (response) {
                    console.error(response);
                    alert("not accepted");
                }
        });
});

//$("#service-detail-modal-cancel-btn").click{
//    document.getElementById("cancelId").value = ("upcomingServiceRequestId").value();
//    document.getElementById("cancel-modal-open-button").click();
//}

////////////cancel upcoming-service-request///////////
function cancelServicerequest(serviceID) {
    alert("a" + serviceID);
    document.getElementById("cancelId").value = serviceID;
    document.getElementById("cancel-modal-open-button").click();
}
document.getElementById("cancel-modal-btn").addEventListener("click", () => {
    var data = {};
    data.servicerequestId = document.getElementById("cancelId").value;
    data.comments = document.getElementById("cancel-modal-textarea").value;

    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/CancelUpcomingServiceRequest',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {
                    alert("Your service request is successfully Cancelled !");
                    getupcomingServiceRequest();

                },
            error:
                function (response) {
                    console.error(response);
                    alert("not cancelled");
                }
        });
});


////////////complete upcoming-service-request///////////
//function cancelServicerequest(serviceID) {
//    document.getElementById("completeId").value = serviceID;
//    document.getElementById("complete-modal-open-button").click();
//}
document.getElementById("complete-modal-btn").addEventListener("click", () => {
    var data = {};
    data.servicerequestId = document.getElementById("completeId").value;
    data.comments = document.getElementById("cancel-modal-textarea").value;

    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/CompleteUpcomingServiceRequest',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {
                    alert("Your service request is successfully Completed !");
                    getupcomingServiceRequest();

                },
            error:
                function (response) {
                    console.error(response);
                    alert("not complete");
                }
        });
});









//service & schedule (calendar)
const calendar = document.querySelector("#app-calendar");

for (let day = 1; day <= 31; day++) {
    console.log(day)
   
    //calendar.insertAdjacentHTML("beforeend", '<div class= "day" > ${ day } </div > ');
}




////////////get block custtomer data/////////////

getblockCustomer();
function getblockCustomer() {
   
    data = {}
    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/GetBlockCustomer',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {
                    var json = JSON.parse(response);
                    var table = document.getElementById("mytable5");
                    $("#mytable5 tr").remove();
                   

                    for (var i = 0; i < json.length; i++) {
                        var row = table.insertRow();
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                       
                        cell1.innerHTML = '<td >' + ' <div>' + '<img class="cap-icon cap-upgrade" src="/IMAGES/cap.png" alt="cap">' + '</div>' + '</td>';
                        cell2.innerHTML = '<td>' + '<div class="block-icon">' + '<p>' + json[i].FirstName + json[i].LastName + ' </p>' + '</div>' + '</td>';
                        cell3.innerHTML = '<button class="block-btn" onclick="blockcustomer(\'' + json[i].UserId + '\')">Block</button>';

                        
                    }
                },
            error:
                function (response) {
                    console.error(response);
                    alert("success");
                }
        });
}

/////////////block customer////////////

function blockcustomer(serviceID) {

    var blockuserid = serviceID;
    var model = {
        BlockUserId : blockuserid
    };
   
    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/BlockCustomerService',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: model,
            success:
                function (response) {
                    alert("blocked");
                    getblockCustomer();
                },
            error:
                function (response) {
                    console.error(response);
                    alert("not block");
                }
        });
}

function unblockcustomer(serviceID) {
    var blockuserid = serviceID;
    var model = {
        BlockUserId: blockuserid
    };

    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/BlockCustomerService',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: model,
            success:
                function (response) {
                    alert("blocked");
                    getblockCustomer();
                },
            error:
                function (response) {
                    console.error(response);
                    alert("not block");
                }
        });
}



















/////////get user details(my-setting)///////////////
getUserDetails();
function getUserDetails() {

    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/GetUserDetails',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {},
            success:
                function (response) {

                    var json = JSON.parse(response);
                    $("#sp-my-details-fname").val(json.FirstName);
                    $("#sp-my-details-lname").val(json.LastName);
                    $("#sp-my-details-email").val(json.Email);
                    $("#sp-my-details-contact-number").val(json.Mobile);
                },
            error:
                function (response) {
                    console.error(response);
                    alert("Details not found");
                }
        });
}

getAddressDetails();
function getAddressDetails() {

    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/GetAddressDetails',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {},
            success:
                function (response) {

                    var json = JSON.parse(response);
                    $("addressId").val(json.AddressId);
                    $("#sp-my-address-street-name").val(json.AddressLine1);
                    $("#sp-my-address-house-number").val(json.AddressLine2);
                    $("#sp-my-address-city").val(json.City);
                    $("#sp-my-address-postal-code").val(json.PostalCode);
                },
            error:
                function (response) {
                    console.error(response);
                    alert("Details not found");
                }
        });
}
///////////save user details(my-setting)/////////////
$("#sp-my-detail-save-btn").click(function () {

    var firstName = $("#sp-my-details-fname").val();
    var lastName = $("#sp-my-details-lname").val();
    var email = $("#sp-my-details-email").val();
    var mobile = $("#sp-my-details-contact-number").val();
    //var bdate = $("#sp-my-details-bdate").val();
    //var bmonth = $("#sp-my-details-bmonth").val();
    //var byear = $("#sp-my-details-byear").val();
    //var nationality = $("#sp-my-details-nationality").val();
    var streetname = $("#sp-my-address-street-name").val();
    var housenumber = $("#sp-my-address-house-number").val();
    var postalcode = $("#sp-my-address-postal-code").val();
    var city = $("#sp-my-address-city").val();

    var model = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Mobile: mobile,
        AddressLine1: streetname,
        AddressLine2: housenumber,
        PostalCode: postalcode,
        City: city
    }
    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/SaveDetails',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: model,
            success:
                function (response) {

                    alert("your details are successfully saved");
                },
            error:
                function (response) {
                    console.error(response);
                    alert("not updated");
                }
        });
});
///////////////provider add address(my-setting)/////////////
function AddproviderAddress() {
   
    var streetName = $("#sp-my-address-street-name").val();
    var houseNumber = $("#sp-my-address-house-number").val();
    var postalCode = $("#sp-my-address-postal-code").val();
    var city = $("#sp-my-address-city").val();


    var model = {
        AddressLine1: streetName,
        AddressLine2: houseNumber,
        PostalCode: postalCode,
        City: city
    };


    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/AddproviderAddress',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: model,
            success:
                function (response) {

                    alert("address as successfully add");
                    getUserDetails();
                },
            error:
                function (response) {
                    console.error(response);
                    alert("addresss are not added");
                }
        });
}


/////////////////change password(my-setting)////////////////
$("#sp-change-password-save-btn").click(function () {

    var oldPass = $("#sp-current-password").val();
    var newPass = $("#sp-password").val();
    var confPass = $("#sp-confirm-password").val();

    if (oldPass != "" && newPass != "" && confPass != "") {
        if (newPass == confPass) {
            var model = {
                Password: oldPass,
                NewPassword: newPass,
            }
            $.ajax(
                {
                    type: 'POST',
                    url: '/Serviceprovider/ChangePassword',
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: model,
                    success:
                        function (response) {

                            alert("password updated");
                        },
                    error:
                        function (response) {
                            console.error(response);
                            alert("not updated");
                        }
                });

        }
        else {
            alert("Both Password are not same");
        }
    }
    else {
        alert("Please fill all field");
    }
});
