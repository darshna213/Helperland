
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
                        
                        cell1.innerHTML = '<td >' + json[i].RequestId + '</td>';
                        cell2.innerHTML = '<td>' + '<p class="date">' + ' <img src="/IMAGES/calendar2.png"/>' + startDate+ ' </p>' + '<p> <img src="/IMAGES/time.png" />' + startTime +'-'+ endTime + '</p>' + '</td>';
                        cell3.innerHTML = '<td>' + '<p>' + CustomerName + '</p>' + '<p>' + '<img src="/IMAGES/home.png">' + add + '</p>' + '</td >';
                        cell4.innerHTML = ' <td >' + '<p class="euro d-flex justify-content-center" style="color: #1d7a8c; font-size: 24px; font-weight: bold">' + ' &euro;' + TotalCost + '</p>' + '</td>';
                        cell5.innerHTML = SubTotal;
                        cell6.innerHTML = '<button class="accept-btn" onclick="acceptService(\'' + json[i].RequestId + '\')">Accept</button>';
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
                        var add = json[i].AddressLine2 +' '+ json[i].AddressLine1 +' ' + json[i].PostalCode+' '+ json[i].City;
                        var Distance = json[i].Distance
                        cell1.innerHTML = '<td>' + json[i].RequestId + '</td>';
                        cell2.innerHTML = '<td style="width: 20%;">' + '<p class="date">' + ' <img src="/IMAGES/calendar2.png"/>' + startDate + ' </p>' + '<p> <img src="/IMAGES/time.png" />' + startTime + '-' + endTime + '</p>' + '</td>';
                        cell3.innerHTML = '<td>' + '<p>' + CustomerName + '</p>' + '<p>' + '<img src="/IMAGES/home.png">' + add + '</p>' + '</td >';
                        cell4.innerHTML = ' <td >' + '<p class="euro d-flex justify-content-center" style="color: #1d7a8c; font-size: 24px; font-weight: bold">' + ' &euro;' + TotalCost + '</p>' + '</td>';
                        cell5.innerHTML = Distance;
                        var currentDateTime = new Date();
                        var current_date = currentDateTime.getDate() + '-' + (currentDateTime.getMonth() + 1) + '-' + currentDateTime.getFullYear();
                        if (getTime(current_date) > getTime(startDate)) {
                        cell6.innerHTML = '<div class="d-flex">' +
                            '<button class="cancel-btn" onclick="cancelServicerequest(\'' + json[i].RequestId + '\')">Cancel</button>' +
                            '<button class="upcoming-complete-btn" onclick="completeServicerequest(\'' + json[i].RequestId + '\')">Complete</button>' + ' </div >';
                        }
                        cell6.innerHTML = '<button class="cancel-btn" onclick="cancelServicerequest(\'' + json[i].RequestId + '\')">Cancel</button>';
                    }
                },
            error:
                function (response) {
                    console.error(response);
                    alert("success");
                }
        });
}
function getTime(d) {
    return new Date(d.split("-").reverse().join("-")).getTime()
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
    var col5_Name = currentRow.find("td:eq(4)").text();
    
    var col7_Address = currentRow.find("td:eq(6)").text();
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
    $("#newserviceRequestname").html(col5_Name);
    $("#newserviceRequestAddress").html(col7_Address);
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
    var col5_Name = currentRow.find("td:eq(2)").text();
   ///* var col6_Extras = currentRow.find("td:eq(5)").text()*/;
    var col7_Address = currentRow.find("td:eq(6)").text();
    //var col8_Phone = currentRow.find("td:eq(7)").text();
    //var col9_Email = currentRow.find("td:eq(8)").text();
    //var col10_Comments = currentRow.find("td:eq(9)").text();
    //var col11_Comments = currentRow.find("td:eq(10)").text();
    //var col12_HavePet = currentRow.find("td:eq(11)").text();

    $("#upcomingserviceRequestDateTime").html(col2_ServiceDate);
    //$("#serviceRequestDuration").html(col11_Comments);
    $("#upcomingServiceRequestId").html(col1_ServiceId);
    //$("#serviceExtra").html(col6_Extras);
    $("#upcoming-total-payment").html(col4_Payment);
    $("#upcomingserviceRequestname").html(col5_Name);
    $("#upcomingserviceRequestAddress").html(col7_Address);
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
    document.getElementById("upcoming-service-request-row-detail-modal-open-button").click();
}
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

$("#new-service-request-accept-modal-btn").click(function () {
    var data = {};

    //document.getElementById("acceptId").value = $("#newServiceRequestId").html();
    data.servicerequestId = $("#newServiceRequestId").html();
    data.comments = "accepted";
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

    document.getElementById("cancelId").value = serviceID;
    document.getElementById("cancel-modal-open-button").click();
}
$("#service-detail-modal-cancel-btn").click(function () {
    var data = {};

    //document.getElementById("acceptId").value = $("#newServiceRequestId").html();
    data.servicerequestId = $("#upcomingServiceRequestId").html();
    data.comments = "Cancelled";
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
                    alert("not accepted");
                }
        });
});
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


//////////complete upcoming-service-request///////////
function completeServicerequest(serviceID) {
    document.getElementById("completeId").value = serviceID;
    document.getElementById("complete-modal-open-button").click();
}
$("#service-detail-modal-complete-btn").click(function () {
    var data = {};

    //document.getElementById("acceptId").value = $("#newServiceRequestId").html();
    data.servicerequestId = $("#upcomingServiceRequestId").html();
    data.comments = "Completed";
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
                    alert("not accepted");
                }
        });
});
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

//////////service history////////////////
getServiceHistory();
function getServiceHistory() {

    data = {}
    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/GetServiceHistory',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {

                    var json = JSON.parse(response);
                    var table = document.getElementById("service-history-table");
                    $("#service-history-table td").remove();


                    for (var i = 0; i < json.length; i++) {
                        var row = table.insertRow();
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        
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

                       
                        var add = json[i].AddressLine2 + ' ' + json[i].AddressLine1 + ' ' + json[i].PostalCode + ' ' + json[i].City;
                      


                        cell1.innerHTML = '<td >' + json[i].RequestId + '</td>';
                        cell2.innerHTML = '<td>' + '<p class="date">' + ' <img src="/IMAGES/calendar2.png"/>' + startDate + ' </p>' + '<p> <img src="/IMAGES/time.png" />' + startTime + '-' + endTime + '</p>' + '</td>';
                        cell3.innerHTML = '<td>' + '<p>' + CustomerName + '</p>' + '<p>' + '<img src="/IMAGES/home.png">' + add + '</p>' + '</td >';


                    }
                },
            error:
                function (response) {
                    console.error(response);
                    alert("success");
                }
        });
}

/////////row modal popup(upcoming service request)
$('#service-history-table').on('click', 'td:nth-child(1)', function () {
    getHistoryFromTable(this);
});
$('#service-history-table').on('click', 'td:nth-child(2)', function () {
    getHistoryFromTable(this);
});
$('#service-history-table').on('click', 'td:nth-child(3)', function () {
    getHistoryFromTable(this);
});

function getHistoryFromTable(thisTd) {
    var currentRow = $(thisTd).closest("tr");
    var col1_ServiceId = currentRow.find("td:eq(0)").text();
    var col2_ServiceDate = currentRow.find("td:eq(1)").text();
    var col3_Name = currentRow.find("td:eq(2)").text();
    var col4_Payment = currentRow.find("td:eq(4)").text();
    var col3_Name = currentRow.find("td:eq(2)").text();
    //var col3_Address = currentRow.find("td:eq(3)").text();

    $("#servicehistoryDateTime").html(col2_ServiceDate);
    //$("#serviceRequestDuration").html(col11_Comments);
    $("#servicehistoryId").html(col1_ServiceId);
    //$("#serviceExtra").html(col6_Extras);
    $("#history-total-payment").html(col4_Payment);
    $("#servicehistoryname").html(col3_Name);
    //$("#servicehistoryAddress").html(col3_Address);

    document.getElementById("service-history-row-detail-modal-open-button").click();

}







//service & schedule (calendar)
//const calendar = document.querySelector("#app-calendar");

//for (let day = 1; day <= 31; day++) {
//    console.log(day)

//calendar.insertAdjacentHTML("beforeend", '<div class= "day" > ${ day } </div > ');
//}

/////////my rating///////////
getmyRatings();
function getmyRatings() {

    data = {}
    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/GetMyRating',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {
                    var json = JSON.parse(response);
                    var table = document.getElementById("my-ratings-table");
                    $("#my-ratings-table td").remove();
                   
                    for (var i = 0; i < json.length; i++) {
                        var row = table.insertRow();
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                      
                        var RequestId = json[i].RequestId;
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
                        
                        cell1.innerHTML = '<td >' + RequestId + '<br />' + '<b>' + CustomerName +'</b>' +'</td>';
                        cell2.innerHTML = '<td>' + '<p class="date">' + ' <img src="/IMAGES/calendar2.png"/>' + startDate + ' </p>' + '<p> <img src="/IMAGES/time.png" />' + startTime + '-' + endTime + '</p>' + '</td>';

                        var averageRatings = json[i].Ratings;
                        middle = "";
                        for (let i = 0; i < averageRatings; i++) {
                            middle =
                                middle + '<img src="/IMAGES/star-yellow.png">';
                        }
                        for (let i = 0; i < 5 - averageRatings; i++) {
                            middle =
                                middle + '<img src="/IMAGES/star-grey.png">';
                        }

                        cell3.innerHTML = '<p class="m-0">Rating</p>' + middle + '<span>Very Good</span>';

                        var Comments = json[i].Comments

                        cell4.innerHTML = '<td colspan="3">' + '<b>' + Comments + '</b>' + '</td>';
                    }
                },
            error:
                function (response) {
                    console.error(response);
                    alert("success");
                }
        });
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

                        
                        var CustomerName = json[i].CustomerName;

                        cell1.innerHTML = '<td >' + ' <div>' + '<img class="cap-icon cap-upgrade" src="/IMAGES/cap.png" alt="cap">' + '</div>' + '</td>';
                        cell2.innerHTML = '<td>' + '<div class="block-icon">' + '<p>' + CustomerName + ' </p>' + '</div>' + '</td>';

                        IsBlocked = json[i].IsBlocked;
                        if (IsBlocked ) {

                            cell3.innerHTML = '<button class="block-btn d-none" onclick="blockcustomer(\'' + json[i].RequestId + '\')">Block</button>'+
                            '<button class="block-btn " onclick="unblockcustomer(\'' + json[i].RequestId + '\')">Unblock</button>';
                        } else {
                            cell3.innerHTML = '<button class="block-btn" onclick="blockcustomer(\'' + json[i].RequestId + '\')">Block</button>'+
                            '<button class="block-btn d-none" onclick="unblockcustomer(\'' + json[i].RequestId + '\')">Unblock</button>';
                        }

                        

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
        BlockUserId: blockuserid,
        IsBlocked: true,
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
                    alert("UNblocked");
                    getblockCustomer();
                },
            error:
                function (response) {
                    console.error(response);
                    alert("not unblock");
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

                    checkData();
                    if (streetname != "" && housenumber != " " && city != " " && firstName != " " && lastName != " " && mobile != " ") {
                        alert("your detais are successfully saved");
                    }

                },
            error:
                function (response) {
                    console.error(response);
                    checkData();
                }
        });
});
//save details validation
var fname = document.getElementById("sp-my-details-fname");
var lname = document.getElementById("sp-my-details-lname");
var contactnumber = document.getElementById("sp-my-details-contact-number");
var addressline1 = document.getElementById("sp-my-address-street-name");
var addressline2 = document.getElementById("sp-my-address-house-number");
var city = document.getElementById("sp-my-address-city");

function checkData() {
    var fnameValue = fname.value.trim();
    var lnameValue = lname.value.trim();
    var contactnumberValue = contactnumber.value.trim();
    var addressline1Value = addressline1.value.trim();
    var addressline2Value = addressline2.value.trim();
    var cityValue = city.value.trim();


    if (fnameValue == "") {
        setError(fname, "FirstName are requird");

    } else {
        setSuccess(fname);

    }
    if (lnameValue == "") {
        setError(lname, "LastName are requird");

    } else {
        setSuccess(lname);

    }
    if (contactnumberValue == "") {
        setError(contactnumber, "Contactnumber must be requird ");

    } else {
        setSuccess(contactnumber);
    }
    if (addressline1Value == "") {
        setError(addressline1, "StreetName must be requird ");

    } else {
        setSuccess(addressline1);
    }
    if (addressline2Value == "") {
        setError(addressline2, "HouseNumber must be requird ");

    } else {
        setSuccess(addressline2);
    }
    if (cityValue == "") {
        setError(city, "city must be requird ");

    } else {
        setSuccess(city);
    }

}
function setError(u, msg) {
    var parentBox = u.parentElement;
    parentBox.className = "col-md-3 error";
    var span = parentBox.querySelector("span");

    span.innerText = msg;
}
function setSuccess(u) {
    var parentBox = u.parentElement;
    parentBox.className = "col-md-3 success";

}




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

                    checkData();
                    getUserDetails();
                },
            error:
                function (response) {
                    console.error(response);
                    checkData();
                    //alert("addresss are not added");
                }
        });
}


/////////////////change password(my-setting)////////////////
getStoredPassword();
function getStoredPassword() {

    $.ajax(
        {
            type: 'POST',
            url: '/Serviceprovider/GetStoredPassword',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {},
            success:
                function (response) {

                    var json = JSON.parse(response);
                    $("#sp-stored-password").val(json.Password);


                },
            error:
                function (response) {
                    console.error(response);
                    alert("password not found");
                }
        });
}



$("#sp-change-password-save-btn").click(function () {

    var storedPass = $("#sp-stored-password").val();
    var oldPass = $("#sp-current-password").val();
    var newPass = $("#sp-password").val();
    var confPass = $("#sp-confirm-password").val();
  
    if (oldPass != "" && newPass != "" && confPass != "") {
        if (storedPass == oldPass) {


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

                                
                                checkPasswordData();
                                if (oldPass != "" && newPass != "" && confPass != "" && storedPass == oldPass && newPass == confPass) {
                                    alert("yuor Password has change Successfully");
                                }
                              
                            },
                        error:
                            function (response) {
                                checkPasswordData();
                                console.error(response);
                             
                            }
                    });

            }
            else {

                checkPasswordData();

            }

        }
        else {
           
            checkPasswordData();
        }
    }
    else {
        checkPasswordData();
        //alert("Please fill all field");
    }

});


//password save validation
var oldpassword = document.getElementById("sp-current-password");
var newpassword = document.getElementById("sp-password");
var confirmpassword = document.getElementById("sp-confirm-password");
var stordpassword = document.getElementById("sp-stored-password");

function checkPasswordData() {
    var oldpasswordValue = oldpassword.value.trim();
    var newpasswordValue = newpassword.value.trim();
    var confirmpasswordValue = confirmpassword.value.trim();
    var stordpasswordValue = stordpassword.value.trim();
    
    if (oldpasswordValue == "") {
        setpassError(oldpassword, "OldPassword must be requird");
       

    } else {
        setpassSuccess(oldpassword);

    }
    if (newpasswordValue == "") {
        setpassError(newpassword, "NewPassword must be requird");

    } else {
        setpassSuccess(newpassword);

    }
    if (confirmpasswordValue == "") {
        setpassError(confirmpassword, "ConfirmPassword must requird");

    } else {
        setpassSuccess(confirmpassword);

    }
    if (newpasswordValue != confirmpasswordValue) {
        setpassError(confirmpassword, "Password not matched");
    } else {
        setpassSuccess(confirmpassword);

    }
    if (stordpasswordValue != oldpasswordValue) {

        setpassError(oldpassword, "Current Password not matched");
    } else {
        setpassSuccess(oldpassword);

    }

    
    
}
function setpassError(u, msg) {
    var parentBox = u.parentElement;
    parentBox.className = "pass-error error";
    var span = parentBox.querySelector("span");

    span.innerText = msg;
}
function setpassSuccess(u) {
    var parentBox = u.parentElement;
    parentBox.className = "pass-error success";

}
