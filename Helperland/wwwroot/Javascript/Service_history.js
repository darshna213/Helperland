//< !--bootstrap js cdn-- >
/*<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>*/

//leftside vertical tab
function LogOut() {
    alert("you are SuccessFully LogOut");
}
$("#dashboard-tab").click(function () {
    $("#rightside-dashboard").removeClass("d-none");
    $("#rightside").addClass("d-none");
    $("#my-setting-tabs").addClass("d-none");
    $("#favourite-pro-tab-rightside").addClass("d-none");
    $("#invoices-tab-rightside").addClass("d-none");
    $("#notifications-tab-rightside").addClass("d-none");
    $("#service-schedule-tab-rightside").addClass("d-none");
})

$("#service-history-tab").click(function () {
    $("#rightside").removeClass("d-none");
    $("#rightside-dashboard").addClass("d-none");
    $("#my-setting-tabs").addClass("d-none");
    $("#favourite-pro-tab-rightside").addClass("d-none");
    $("#invoices-tab-rightside").addClass("d-none");
    $("#notifications-tab-rightside").addClass("d-none");
    $("#service-schedule-tab-rightside").addClass("d-none");
})
$("#service-schedule-tab").click(function () {
    $("#service-schedule-tab-rightside").removeClass("d-none");
    $("#rightside").addClass("d-none");
    $("#rightside-dashboard").addClass("d-none");
    $("#my-setting-tabs").addClass("d-none");
    $("#favourite-pro-tab-rightside").addClass("d-none");
    $("#invoices-tab-rightside").addClass("d-none");
    $("#notifications-tab-rightside").addClass("d-none");
})
$("#favourite-pro-tab").click(function () {
    $("#favourite-pro-tab-rightside").removeClass("d-none");
    $("#rightside-dashboard").addClass("d-none");
    $("#service-schedule-tab-rightside").addClass("d-none");
    $("#rightside").addClass("d-none");
    $("#invoices-tab-rightside").addClass("d-none");
    $("#notifications-tab-rightside").addClass("d-none");
    $("#my-setting-tabs").addClass("d-none");
})
$("#invoices-tab").click(function () {
    $("#invoices-tab-rightside").removeClass("d-none");
    $("#favourite-pro-tab-rightside").addClass("d-none");
    $("#service-schedule-tab-rightside").addClass("d-none");
    $("#rightside-dashboard").addClass("d-none");
    $("#rightside").addClass("d-none");
    $("#notifications-tab-rightside").addClass("d-none");
    $("#my-setting-tabs").addClass("d-none");
})
$("#notification-tab").click(function () {
    $("#notifications-tab-rightside").removeClass("d-none");
    $("#invoices-tab-rightside").addClass("d-none");
    $("#favourite-pro-tab-rightside").addClass("d-none");
    $("#rightside-dashboard").addClass("d-none");
    $("#service-schedule-tab-rightside").addClass("d-none");
    $("#rightside").addClass("d-none");
    $("#my-setting-tabs").addClass("d-none");
})
//my setting
$("#my-setting-dropdown").click(function () {
    $("#my-setting-tabs").removeClass("d-none");
    $("#rightside-dashboard").addClass("d-none");
    $("#rightside").addClass("d-none");
    $("#service-schedule-tab-rightside").addClass("d-none");
    $("#favourite-pro-tab-rightside").addClass("d-none");
    $("#invoices-tab-rightside").addClass("d-none");
    $("#notifications-tab-rightside").addClass("d-none");
})
//my setting tab code
$("#my-details-tab").click(function () {
    mydetails();
})
$("#my-addresses-tab").click(function () {
    myaddresses();
})
$("#change-password-tab").click(function () {
    changepassword();
})
function mydetails() {
    $("#my-details-tab").addClass("tab-button-active");
    $("#my-addresses-tab").removeClass("tab-button-active");
    $("#change-password-tab").removeClass("tab-button-active");

    $("#my-details").removeClass("d-none");
    $("#my-addresses").addClass("d-none");
    $("#change-password").addClass("d-none");

}

function myaddresses() {
    $("#my-addresses-tab").addClass("tab-button-active");
    $("#my-details-tab").removeClass("tab-button-active");
    $("#change-password-tab").removeClass("tab-button-active");

    $("#my-details").addClass("d-none");
    $("#my-addresses").removeClass("d-none");
    $("#change-password").addClass("d-none");

}

function changepassword() {
    $("#change-password-tab").addClass("tab-button-active");
    $("#my-details-tab").removeClass("tab-button-active");
    $("#my-addresses-tab").removeClass("tab-button-active");

    $("#my-details").addClass("d-none");
    $("#my-addresses").addClass("d-none");
    $("#change-password").removeClass("d-none");
}
//excel sheet (servicehistory) download
function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('content2-table');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
}


//////get Dashboard data///////
getDashboardData();
function getDashboardData() {
    data = {}
    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/GetServicesDashboard',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {
                    var json = JSON.parse(response);
                    var table = document.getElementById("content-table");
                    $("#content-table td").remove();


                    for (var i = 0; i < json.length; i++) {
                        var row = table.insertRow();

                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);

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
                        var add = json[i].AddressLine2 + json[i].AddressLine1 + json[i].PostalCode + json[i].City;
                        var SubTotal = json[i].SubTotal;

                        cell1.innerHTML = '<td data-target="#service-detail-modal" data-toggle="modal">' + json[i].RequestId + '</td>';
                        cell2.innerHTML = '<td data-target="#service-detail-modal" data-toggle="modal">' + '<p class="date">' + ' <img src="/IMAGES/calendar2.png"/>' + startDate + ' </p>' + '<p> <img src="/IMAGES/time.png" />' + startTime + '-' + endTime + '</p>' + '</td>';

                        if (json[i].ServiceProviderId != null) {
                            var sum = 0.0;
                            for (var rat = 0; rat < json[i].AverageRatings.length; rat++) {
                                sum += parseFloat(json[i].AverageRatings[rat]);
                            }
                            var averageRatings = 0;
                            if (json[i].AverageRatings.length != 0) {
                                averageRatings = sum / json[i].AverageRatings.length;
                            }
                            // const averageRatings = 3.0;
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
                            cell3.innerHTML = Start + middle + end;

                        }


                        cell4.innerHTML = ' <td data-target="#service-detail-modal" data-toggle="modal">' + '<p class="euro d-flex justify-content-center">' + ' &euro;' + TotalCost + '</p>' + '</td>';
                        cell5.innerHTML =
                            '<button class="re-scheduleservice" onclick="rescheduleService(\'' + json[i].RequestId + '\')">Reschedule</button>' +
                            '<button class="cancel-cancel" onclick="cancelService(\'' + json[i].RequestId + '\')">Cancel</button>';
                    }
                },
            error:
                function (response) {
                    console.error(response);
                    alert("success");
                }
        });
}

///////////Get servicehistory data///////////////

getServicehistoryData();
function getServicehistoryData() {
    data = {}
    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/GetServiceHistory',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {
                    var json = JSON.parse(response);
                    var table = document.getElementById("content2-table");
                    $("#content2-table td").remove();

                    for (var i = 0; i < json.length; i++) {
                        var row = table.insertRow();

                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);

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
                        var add = json[i].AddressLine2 + json[i].AddressLine1 + json[i].PostalCode + json[i].City;
                        var SubTotal = json[i].SubTotal;

                        cell1.innerHTML = '<td>' + '<p class="date">' + ' <img src = "/IMAGES/calendar-grey.png" />' + startDate + '</p>' + ' <p> <img src="/IMAGES/time.png">'  + startTime + '-' + endTime + '</p>' + '</td>';

                        if (json[i].ServiceProviderId != null) {
                            var sum = 0.0;
                            for (var rat = 0; rat < json[i].AverageRatings.length; rat++) {
                                sum += parseFloat(json[i].AverageRatings[rat]);
                            }
                            var averageRatings = 0;
                            if (json[i].AverageRatings.length != 0) {
                                averageRatings = sum / json[i].AverageRatings.length;
                            }
                            // const averageRatings = 3.0;
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
                            cell2.innerHTML = Start + middle + end;

                        }

                        
                        cell3.innerHTML += ' <td  data-target="#service-detail-modal" data-toggle="modal">' + '<p class="euro d-flex justify-content-center">' + ' &euro;' + TotalCost + '</p>' + '</td>';

                        var Status = json[i].Status;
                        if (Status == 3) {
                            cell4.innerHTML =
                                '<button class="status-cancelled" disabled>Cancelled</button>';

                            cell5.innerHTML =
                                '<button class="rate-sp" type="submit" disabled>Rate SP</button>';
                        } else if (Status == 2) {
                            cell4.innerHTML =
                                '<button disabled href="#" class="status-completed text-white">Completed</button>';

                            cell5.innerHTML =
                                '<input class="rate-sp" type="button" value="Rate SP"   onclick="rateService(\'' + json[i].RequestId + '\',\'' + json[i].ServiceProviderId + '\',\'' + json[i].SpFirstName + " " + json[i].SpLastName + '\')">';

                        } else if (Status == 4) {
                            cell4.innerHTML =
                                '<button disabled href="#" class="status-pending text-white">Pending</button>';
                            cell5.innerHTML =
                                '<button class="rate-sp" type="submit" disabled>Rate SP</button>';

                        }

                    }
                },
            error:
                function (response) {
                    console.error(response);
                    alert("wrong");
                }

        });
}
/////////row model popup///////////
$('#content-table').on('click', 'td:nth-child(1)', function () {
    getDataFromDashboardTable(this);
});
$('#content-table').on('click', 'td:nth-child(2)', function () {
    getDataFromDashboardTable(this);
});
$('#content-table').on('click', 'td:nth-child(3)', function () {
    getDataFromDashboardTable(this);
});
$('#content-table').on('click', 'td:nth-child(4)', function () {
    getDataFromDashboardTable(this);
});


$('#content2-table').on('click', 'td:nth-child(1)', function () {
    getDataFromDashboardTable(this);
});
$('#content2-table').on('click', 'td:nth-child(2)', function () {
    getDataFromDashboardTable(this);
});
$('#content2-table').on('click', 'td:nth-child(3)', function () {
    getDataFromDashboardTable(this);
});
$('#content2-table').on('click', 'td:nth-child(4)', function () {
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

    $("#serviceRequestDateTime").html(col2_ServiceDate);
    //$("#serviceRequestDuration").html(col11_Comments);
    $("#ServiceRequestId").html(col1_ServiceId);
    //$("#serviceExtra").html(col6_Extras);
    $("#net-amount").html(col4_Payment);
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
    document.getElementById("dashboard-service-details-a-tag").click();
}

function ratesp(serviceID) {

    document.getElementById("rate-sp-modal-open-button").click();
    document.getElementById("rescheduleID").value = serviceID;
}

function rescheduleService(serviceID) {

    document.getElementById("reschedule-modal-open-button").click();
    document.getElementById("rescheduleID").value = serviceID;
}

function cancelService(serviceID) {

    document.getElementById("cancelId").value = serviceID;
    document.getElementById("cancel-modal-open-button").click();
}

/////Updateservice request(re-schedule)//////////
$("#service-request-update-btn").click(function () {
    var data = {}
    data.serviceRequestId = parseInt(document.getElementById("rescheduleID").value);
    data.serviceStartDate = document.getElementById("schedule-service-date").value;
    data.startTime = document.getElementById("re-schedule-time").value;

    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/UpdateServiceRequest',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {
                    swal({
                        title: "Schedule Updated",
                        text: "Your response has been submmited",
                        icon: "info",
                        button: "OK",
                    });
                    getDashboardData();
                },
            error:
                function (response) {
                    console.error(response);
                    alert("wrong-wrong");
                }
        });
});


////////////cancel service request//////
document.getElementById("cancel-now-btn").addEventListener("click", () => {

    var data = {};
    data.serviceRequestId = document.getElementById("cancelId").value;
    data.comments = document.getElementById("cancel-modal-textarea").value;

    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/CancelServiceRequest',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {
                    swal({
                        title: "Service Cancelled",
                        text: "Your response has been submmited",
                        icon: "info",
                        button: "OK",
                    });
                    getDashboardData();

                },
            error:
                function (response) {
                    console.error(response);
                    alert(response);
                }
        });
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


    $('#schedule-service-date').attr('min', maxDate);
});
//////////rating modal////////////
$("input:radio[name=on-time-arrival-radio]").change(function () {
    var onTimeArrivalRating = document.querySelector('input[name="on-time-arrival-radio"]:checked').value;
    var friendlyRating = document.querySelector('input[name="friendly-radio"]:checked').value;
    var qualityOfServiceRating = document.querySelector('input[name="quality-of-service-radio"]:checked').value;

    var x = (parseInt(onTimeArrivalRating) + parseInt(friendlyRating) + parseInt(qualityOfServiceRating)) / 3 + "";
    $("#ratesp-modal-average-ratings").html(parseFloat(x).toFixed(2));
    
    switch (onTimeArrivalRating) {
        case "1":
            $("#on-time-arrival-star-2").html("☆");
            $("#on-time-arrival-star-3").html("☆");
            $("#on-time-arrival-star-4").html("☆");
            $("#on-time-arrival-star-5").html("☆");
            break;
        case "2":
            $("#on-time-arrival-star-2").html("★");
            $("#on-time-arrival-star-3").html("☆");
            $("#on-time-arrival-star-4").html("☆");
            $("#on-time-arrival-star-5").html("☆");
            break;
        case "3":
            $("#on-time-arrival-star-2").html("★");
            $("#on-time-arrival-star-3").html("★");
            $("#on-time-arrival-star-4").html("☆");
            $("#on-time-arrival-star-5").html("☆");
            break;
        case "4":
            $("#on-time-arrival-star-2").html("★");
            $("#on-time-arrival-star-3").html("★");
            $("#on-time-arrival-star-4").html("★");
            $("#on-time-arrival-star-5").html("☆");
            break;
        case "5":
            $("#on-time-arrival-star-2").html("★");
            $("#on-time-arrival-star-3").html("★");
            $("#on-time-arrival-star-4").html("★");
            $("#on-time-arrival-star-5").html("★");
            break;
    }
});
$("input:radio[name=friendly-radio]").change(function () {
    var onTimeArrivalRating = document.querySelector('input[name="on-time-arrival-radio"]:checked').value;
    var friendlyRating = document.querySelector('input[name="friendly-radio"]:checked').value;
    var qualityOfServiceRating = document.querySelector('input[name="quality-of-service-radio"]:checked').value;

    var x = (parseInt(onTimeArrivalRating) + parseInt(friendlyRating) + parseInt(qualityOfServiceRating)) / 3 + "";
    $("#ratesp-modal-average-ratings").html(parseFloat(x).toFixed(2));


    switch (friendlyRating) {
        case "1":
            $("#friendly-star-2").html("☆");
            $("#friendly-star-3").html("☆");
            $("#friendly-star-4").html("☆");
            $("#friendly-star-5").html("☆");
            break;
        case "2":
            $("#friendly-star-2").html("★");
            $("#friendly-star-3").html("☆");
            $("#friendly-star-4").html("☆");
            $("#friendly-star-5").html("☆");
            break;
        case "3":
            $("#friendly-star-2").html("★");
            $("#friendly-star-3").html("★");
            $("#friendly-star-4").html("☆");
            $("#friendly-star-5").html("☆");
            break;
        case "4":
            $("#friendly-star-2").html("★");
            $("#friendly-star-3").html("★");
            $("#friendly-star-4").html("★");
            $("#friendly-star-5").html("☆");
            break;
        case "5":
            $("#friendly-star-2").html("★");
            $("#friendly-star-3").html("★");
            $("#friendly-star-4").html("★");
            $("#friendly-star-5").html("★");
            break;
    }
});
$("input:radio[name=quality-of-service-radio]").change(function () {
    var onTimeArrivalRating = document.querySelector('input[name="on-time-arrival-radio"]:checked').value;
    var friendlyRating = document.querySelector('input[name="friendly-radio"]:checked').value;
    var qualityOfServiceRating = document.querySelector('input[name="quality-of-service-radio"]:checked').value;

    var x = (parseInt(onTimeArrivalRating) + parseInt(friendlyRating) + parseInt(qualityOfServiceRating)) / 3 + "";
    $("#ratesp-modal-average-ratings").html(parseFloat(x).toFixed(2));


    switch (qualityOfServiceRating) {
        case "1":
            $("#quality-of-service-star-2").html("☆");
            $("#quality-of-service-star-3").html("☆");
            $("#quality-of-service-star-4").html("☆");
            $("#quality-of-service-star-5").html("☆");
            break;
        case "2":
            $("#quality-of-service-star-2").html("★");
            $("#quality-of-service-star-3").html("☆");
            $("#quality-of-service-star-4").html("☆");
            $("#quality-of-service-star-5").html("☆");
            break;
        case "3":
            $("#quality-of-service-star-2").html("★");
            $("#quality-of-service-star-3").html("★");
            $("#quality-of-service-star-4").html("☆");
            $("#quality-of-service-star-5").html("☆");
            break;
        case "4":
            $("#quality-of-service-star-2").html("★");
            $("#quality-of-service-star-3").html("★");
            $("#quality-of-service-star-4").html("★");
            $("#quality-of-service-star-5").html("☆");
            break;
        case "5":
            $("#quality-of-service-star-2").html("★");
            $("#quality-of-service-star-3").html("★");
            $("#quality-of-service-star-4").html("★");
            $("#quality-of-service-star-5").html("★");
            break;
    }
});



function rateService(RequestId, serviceProviderId, serviceProviderName) {


    $("#rate-sp-service-id").val(RequestId);
    $("#rate-sp-service-provider-id").val(serviceProviderId);
    $("#rating-provider-name-modal").html(serviceProviderName);
    document.getElementById("rate-sp-modal-open-button").click();
}
$("#rate-sp-submit-btn").click(function () {

    if (document.getElementById("rate-sp-modal-comments").value.length >= 5) {
        var serviceId = $("#rate-sp-service-id").val();
        var serviceProviderId = $("#rate-sp-service-provider-id").val();
        var comment = $("#rate-sp-modal-comments").val();

        var onTimeArrivalRating = document.querySelector('input[name="on-time-arrival-radio"]:checked').value;
        var friendlyRating = document.querySelector('input[name="friendly-radio"]:checked').value;
        var qualityOfServiceRating = document.querySelector('input[name="quality-of-service-radio"]:checked').value;

        var averageRatings = (parseInt(onTimeArrivalRating) + parseInt(friendlyRating) + parseInt(qualityOfServiceRating)) / 3;
        var model = {
            ServiceId: serviceId,
            ServiceProviderId: serviceProviderId,
            Comments: comment,
            OnTime: onTimeArrivalRating,
            Friendly: friendlyRating,
            QualityOfService: qualityOfServiceRating,
            Average: averageRatings
        }

        $.ajax(
            {

                type: 'POST',
                url: '/Bookservice/RateService',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data: model,

                success:
                    function (response) {
                        swal({
                            title: "Good Job!",
                            text: "Your response has been submmited",
                            icon: "success",
                            button: "OK",
                        });
                        
                        getServicehistoryData();
                    },
                error:
                    function (response) {
                        console.error(response);
                        alert("error");

                    }
            });

    }
    else {
        checkCommentData();
        
        //alert("comment");
    }
});
var comment = document.getElementById("rate-sp-modal-comments");
function checkCommentData() {
    var commentValue = comment.value.trim();
    if (commentValue == "") {
        setcommentError(comment, "comment must be requird");


    } else {
        setcommentSuccess(comment);

    }
}
function setcommentError(u, msg) {
    var parentBox = u.parentElement;
    parentBox.className = "pass-error error";
    var span = parentBox.querySelector("span");

    span.innerText = msg;
}
function setcommentSuccess(u) {
    var parentBox = u.parentElement;
    parentBox.className = "pass-error success";

}








///////add address(my settting)/////
$("#add-address-new-address-button").click(function () {

    //$("#postalcode").val($("#postal-code").val());
    $("#add-address-new-address-button").addClass("d-none");
    $("#add-adress-box").removeClass("d-none");
})

$("#setting-add-address-cancel-btn").click(function () {
    $("#add-address-new-address-button").removeClass("d-none");
    $("#add-adress-box").addClass("d-none");
});
$("#setting-add-address-save-btn").click(function () {
    $("#add-adress-box").addClass("d-none");
    $("#add-address-new-address-button").removeClass("d-none");
})
$("#edit-address-save-btn-modal").click(function () {
    $("#edit-adddress-modal").addClass("d-none");

})


/////////get user details(my-setting)///////////////
getUserDetails();
function getUserDetails() {

    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/GetUserDetails',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {},
            success:
                function (response) {
                    var json = JSON.parse(response);
                    $("#my-details-fname").val(json.FirstName);
                    $("#my-details-lname").val(json.LastName);
                    $("#my-details-email").val(json.Email);
                    $("#my-details-contact-number").val(json.Mobile);
                },
            error:
                function (response) {
                    console.error(response);
                    alert("Details not found");
                }
        });
}
///////////save user details/////////////
$("#my-detail-save-btn").click(function () {

    var firstName = $("#my-details-fname").val();
    var lastName = $("#my-details-lname").val();
    var email = $("#my-details-email").val();
    var mobile = $("#my-details-contact-number").val();

    var model = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Mobile: mobile
    }

    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/SaveDetails',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: model,
            success:
                function (response) {
                    checkData();
                    if (firstName != " " && lastName != " " && mobile != " ") {
                        swal({
                            title: "Good Job!",
                            text: "your Details has Saved Successfully",
                            icon: "success",
                            button: "OK",
                        });
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
var fname = document.getElementById("my-details-fname");
var lname = document.getElementById("my-details-lname");
var contactnumber = document.getElementById("my-details-contact-number");
function checkData() {
    var fnameValue = fname.value.trim();
    var lnameValue = lname.value.trim();
    var contactnumberValue = contactnumber.value.trim();

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
        setError(contactnumber, "Contactnumber ");

    } else {
        setSuccess(contactnumber);
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







////////////////////get user address//////////////////

SetAddressList()
function SetAddressList() {

    document.getElementById("UserAddressList").innerHTML = "";

    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/GetUserAddress',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

            // data: { postalCode: document.getElementById("postal-code").value},
            success:
                function (response) {

                    //document.getElementById("UserAddressList").innerHTML = "";
                    var json = JSON.parse(response);
                    var table = document.getElementById("UserAddressList");
                    for (var i = 0; i < json.length; i++) {

                        var row = table.insertRow();

                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        cell1.innerHTML = '<tr>' + '<td>' + ' <p class="my-addresses-text">' + ' <b>Address:</b>' + json[i].AddressId + ' ' + json[i].AddressLine1 + ' ' + json[i].AddressLine2 + ', ' + json[i].City + ' ' + json[i].PostalCode + '<br>Phone number: ' + json[i].Mobile + '</p>' + ' </td>';
                        cell2.innerHTML = '<tr>' + '<td class="address-btn">' + '<div class="d-flex">' + '<button type="button" class="btn edit-btn" onclick="editaddressbtn(\'' + json[i].AddressId + '\')" data-toggle="modal" data-target="#edit-adddress-modal"><i class="far fa-edit"></i></button>'
                            + '<button type="button" class="btn delete-btn" onclick="deleteaddressbtn(\'' + json[i].AddressId + '\')"><i class="far fa-trash-alt"></i></button>' + '</div>' + ' </td>' + '</tr>';
                    }

                },

            error:
                function (response) {
                    console.error(response);
                    alert("wrong");
                }
        });
}

/////////add user adress/////////////
function UserAddAddress() {
    var streetName = $("#streetname").val();
    var houseNumber = $("#housename").val();
    var postalCode = $("#postalcode").val();
    var city = $("#city").val();
    var mobile = $("#phonenumber").val();

    var model = {
        StreetName: streetName,
        HouseNumber: houseNumber,
        PostalCode: postalCode,
        City: city,
        Mobile: mobile
    };

    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/UserAddAddress',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: model,
            success:
                function (response) {

                    SetAddressList();

                },
            error:
                function (response) {
                    console.error(response);
                    alert("Details not found");
                }
        });
}
///////////edit address(my-setting)//////////
function editaddressbtn(AddressId) {
    document.getElementById("edit-address-modal-open").click();
    document.getElementById("addressid").value = AddressId;
}

$("#edit-address-save-btn-modal").click(function () {


    var data = {}
    data.AddressId = parseInt(document.getElementById("addressid").value);
    data.addressLine1 = document.getElementById("streetname-modal").value;
    data.addressLine2 = document.getElementById("housename-modal").value;
    data.postalCode = document.getElementById("postalcode-modal").value;
    data.city = document.getElementById("city-modal").value;
    data.mobile = document.getElementById("phonenumber-modal").value;


    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/UpdateUserAddress',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {
                    var json = JSON.parse(response);
                    $("#streetname-modal").val(json.AddressLine1);
                    $("#housename-modal").val(json.AddressLine2);
                    $("#postalcode-modal").val(json.Email);
                    $("#city-modal").val(json.City);
                    $("#phonenumber-modal").val(json.Mobile);

                    SetAddressList();

                },
            error:
                function (response) {
                    console.error(response);
                    alert("wrong-wrong");
                }
        });

});
///////////////cancel address ///////////////
function deleteaddressbtn(AddressId) {

    document.getElementById("delete-address-modal-open-button").click();
    document.getElementById("deleteId").value = AddressId;
}
document.getElementById("remove-now-btn").addEventListener("click", () => {

    var data = {};
    data.addressId = parseInt(document.getElementById("deleteId").value);


    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/CancelUserAddress',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: data,
            success:
                function (response) {

                    SetAddressList();

                },
            error:
                function (response) {
                    console.error(response);
                    alert("fail");
                }
        });
});
/////////////////change password////////////////
getStoredPassword();
function getStoredPassword() {

    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/GetStoredPassword',
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



$("#change-password-save-btn").click(function () {
    var storedPass = $("#sp-stored-password").val();
    var oldPass = $("#current-password").val();
    var newPass = $("#password").val();
    var confPass = $("#confirm-password").val();

    if (oldPass != "" && newPass != "" && confPass != "") {
        if (storedPass == oldPass) {
            if (newPass == confPass) {
                var model = {
                    Password: oldPass,
                    NewPassword: newPass,
                    ConfirmPassword: confPass,
                }
                $.ajax(
                    {
                        type: 'POST',
                        url: '/Bookservice/ChangePassword',
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        data: model,
                        success:
                            function (response) {
                                checkPasswordData();
                                if (oldPass != "" && newPass != "" && confPass != "" && storedPass == oldPass && newPass == confPass) {
                                    swal({
                                        title: "Congrats!",
                                        text: "your Password has change Successfully",
                                        icon: "success",
                                        button: "OK",
                                    });
                                   
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
    }
});
//password save validation
var oldpassword = document.getElementById("current-password");
var newpassword = document.getElementById("password");
var confirmpassword = document.getElementById("confirm-password");
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
