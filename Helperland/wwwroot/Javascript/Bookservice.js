//< !--jquery code start-- >

// tab code start
$(document).ready(function () {
    $('#profile-tab-classic-orange').click(function () {
        $('#awesome-tab-classic-orange').css({
            "background-color": "#f4f5f8",
            "color": "#646464"
        });
        $('#contact-tab-classic-orange').css({
            "background-color": "#f4f5f8",
            "color": "#646464"
        });
        $('#follow-tab-classic-orange').css({
            "background-color": "#f4f5f8",
            "color": "#646464"
        });
        $(this).css({
            "background-color": "#1d7a8c",
            "color": "#ffff"
        });
    });
});
$(document).ready(function () {
    $('#follow-tab-classic-orange').click(function () {
        $('#profile-tab-classic-orange').css({
            "background-color": "#f4f5f8",
            "color": "#646464"
        });
        $('#awesome-tab-classic-orange').css({
            "background-color": "#f4f5f8",
            "color": "#646464"
        });
        $('#contact-tab-classic-orange').css({
            "background-color": "#f4f5f8",
            "color": "#646464"
        });
        $(this).css({
            "background-color": "#1d7a8c",
            "color": "#ffff"
        });
    });
});
$(document).ready(function () {
    $('#contact-tab-classic-orange').click(function () {
        $('#profile-tab-classic-orange').css({
            "background-color": "#f4f5f8",
            "color": "#646464"
        });
        $('#follow-tab-classic-orange').css({
            "background-color": "#f4f5f8",
            "color": "#646464"
        });
        $('#awesome-tab-classic-orange').css({
            "background-color": "#f4f5f8",
            "color": "#646464"
        });
        $(this).css({
            "background-color": "#1d7a8c",
            "color": "#ffff"
        });
    });
});
$(document).ready(function () {
    $('#awesome-tab-classic-orange').click(function () {
        $('#profile-tab-classic-orange').css({
            "background-color": "#f4f5f8",
            "color": "#646464"
        });
        $('#follow-tab-classic-orange').css({
            "background-color": "#f4f5f8",
            "color": "#646464"
        });
        $('#contact-tab-classic-orange').css({
            "background-color": "#f4f5f8",
            "color": "#646464"
        });
        $(this).css({
            "background-color": "#1d7a8c",
            "color": "#ffff"
        });
    });
});
$(document).ready(function () {
    $('.check-btn').click(function () {
        $('#follow-tab-classic-orange').show(slow)
    });
});
//tab code end


$(document).ready(function () {
    $('.add-btn').click(function () {
        $('.add-address-box').show(slow)
    });
});
//<!--jquery code end-- >

//< !--bootstrap js cdn-- >
/*<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>*/

//JS code
//when click on button and open new tab
function Tab2Click() {

    $("#follow-tab-classic-orange").removeClass("disable-a-tag");
    document.getElementById("follow-tab-classic-orange").click();

}
function Tab3Click() {

    $("#contact-tab-classic-orange").removeClass("disable-a-tag");
    document.getElementById("contact-tab-classic-orange").click();

}
function Tab4Click() {

    $("#awesome-tab-classic-orange").removeClass("disable-a-tag");
    document.getElementById("awesome-tab-classic-orange").click();

}

//zipcode tab code
function SearchZipCode() {
    $("#PostalCode").val($("#postal-code").val());
    var zip = $("#postalform");
    var jsonInput = zip.serialize();
    console.log(jsonInput);
    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/IsValidZipcode',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: jsonInput,
            success:
                function (response) {
                    if (response.value == "True") {
                        Tab2Click();
                        SetAddressList();
                    } else {
                        alert("INVALID");
                    }
                },
            error:
                function (response) {
                    console.error(response);
                    alert("wrong");
                }
        });
}

$("#schedule-service-continue").click(function () {
    Tab3Click();
})

$("#add-address-continue").click(function () {
    Tab4Click();
})

//bed&bath add in summary
$("#schedule-service-bed").change(function () {
    $("#payment-summary-bed-bath").html($("#schedule-service-bed").val() + " " + $("#schedule-service-bath").val());
})

$("#schedule-service-bath").change(function () {
    $("#payment-summary-bed-bath").html($("#schedule-service-bed").val() + " " + $("#schedule-service-bath").val());
})

$("#schedule-service-hour").change(function () {
    $("#payment-summary-basic-hour").html($("#schedule-service-hour").val());
})


//date&time add  in summary 
$("#schedule-service-date").change(function () {
    $("#payment-summary-date-time").html($("#schedule-service-date").val() + " " + $("#schedule-service-time").val());
})

$("#schedule-service-time").change(function () {
    $("#payment-summary-date-time").html($("#schedule-service-date").val() + " " + $("#schedule-service-time").val());
})




//extra services add in summary and select
$("#schedule-service-inside-cabinet").change(function () {
    if ($(this).is(':checked')) {
        $("#payment-summary-inside-cabinet").removeClass("d-none");
        $("#inside-cabinet-div").addClass("rounded-circle-active");
        $("#inside-cabinet-text").addClass("extra-service-text");
        cabinetValue = parseFloat($("#schedule-service-inside-cabinet").val());
    }
    else {
        $("#payment-summary-inside-cabinet").addClass("d-none");
        $("#inside-cabinet-div").removeClass("rounded-circle-active");
        $("#inside-cabinet-text").removeClass("extra-service-text");
        cabinetValue = 0;
    }
})

$("#schedule-service-inside-fridge").change(function () {
    if ($(this).is(':checked')) {
        $("#payment-summary-inside-fridge").removeClass("d-none");
        $("#inside-fridge-div").addClass("rounded-circle-active");
        $("#inside-fridge-text").addClass("extra-service-text");
        fridgeValue = parseFloat($("#schedule-service-inside-fridge").val());
    }
    else {
        $("#payment-summary-inside-fridge").addClass("d-none");
        $("#inside-fridge-div").removeClass("rounded-circle-active");
        $("#inside-fridge-text").removeClass("extra-service-text");
        fridgeValue = 0;
    }
})

$("#schedule-service-inside-oven").change(function () {
    if ($(this).is(':checked')) {
        $("#payment-summary-inside-oven").removeClass("d-none");
        $("#inside-oven-div").addClass("rounded-circle-active");
        $("#inside-oven-text").addClass("extra-service-text");
        /*ovenValue = parseFloat($("#schedule-service-inside-oven").val());
        $("#payment-summary-total-time").html('<strong>' + totalhour + ' Hrs</strong>');
        $("#payment-summary-total-payment").text("$" + totalhour * 18);*/

    }
    else {
        $("#payment-summary-inside-oven").addClass("d-none");
        $("#inside-oven-div").removeClass("rounded-circle-active");
        $("#inside-oven-text").removeClass("extra-service-text");
        ovenValue = 0;
    }
})

$("#schedule-service-laundry-wash").change(function () {
    if ($(this).is(':checked')) {
        $("#payment-summary-laundry-wash").removeClass("d-none");
        $("#laundry-wash-div").addClass("rounded-circle-active");
        $("#laundry-wash-text").addClass("extra-service-text");
        //laundryValue = parseFloat($("#schedule-service-laundry-wash").val());
        /*$("#payment-summary-total-time").html('<strong>' + totalhour + ' Hrs</strong>');
        $("#payment-summary-total-payment").text("$" + totalhour * 18);*/

    }
    else {
        $("#payment-summary-laundry-wash").addClass("d-none");
        $("#laundry-wash-div").removeClass("rounded-circle-active");
        $("#laundry-wash-text").removeClass("extra-service-text");
        laundryValue = 0;
    }
})

$("#schedule-service-interior-window").change(function () {
    if ($(this).is(':checked')) {
        $("#payment-summary-interior-window").removeClass("d-none");
        $("#interior-window-div").addClass("rounded-circle-active");
        $("#interior-window-text").addClass("extra-service-text");
        windowValue = parseFloat($("#schedule-service-interior-window").val());
    }
    else {
        $("#payment-summary-interior-window").addClass("d-none");
        $("#interior-window-div").removeClass("rounded-circle-active");
        $("#interior-window-text").removeClass("extra-service-text");
        windowValue = 0;
    }
})

//total hours & payment count and add into a payment summery
function CreatePaySummery() {
    var dur = 0;
    var totalhour = 0;

    //add hours
    dur = parseFloat($("#schedule-service-hour").val());
    $("#payment-summary-basic-hour").text(dur + " Hrs");
    if (document.getElementById("schedule-service-inside-cabinet").checked) {
        totalhour += parseFloat($("#schedule-service-inside-cabinet").val());
    }
    if (document.getElementById("schedule-service-inside-fridge").checked) {
        totalhour += parseFloat($("#schedule-service-inside-fridge").val());
    }
    if (document.getElementById("schedule-service-inside-oven").checked) {
        
        totalhour += parseFloat($("#schedule-service-inside-oven").val());
        
    }
    if (document.getElementById("schedule-service-laundry-wash").checked) {
        totalhour += parseFloat($("#schedule-service-laundry-wash").val());
    }
    if (document.getElementById("schedule-service-interior-window").checked) {
        totalhour += parseFloat($("#schedule-service-interior-window").val());
    }
    totalhour += dur;
    $("#payment-summary-total-time").html('<strong>' + totalhour + ' Hrs</strong>');
    $("#payment-summary-total-payment").text("$" + totalhour * 18);

}
$("input[name=extra-service]").change(function () {
    CreatePaySummery();
});



//add-new-addresss
$("#add-address-new-address-button").click(function () {
    $("#postalcode").val($("#postal-code").val());
    $("#add-address-new-address-button").addClass("d-none");
    $("#add-adress-box").removeClass("d-none");
})

$("#add-address-cancel-btn").click(function () {
    $("#add-address-new-address-button").removeClass("d-none");
    $("#add-adress-box").addClass("d-none");
});

$("#add-address-save-btn").click(function () {
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
            url: '/Bookservice/AddAddress',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: model,
            success:
                function (response) {
                   
                    if (response == "true") {
                        document.getElementById("add-address-cancel-btn").click();
                        SetAddressList();
                    } else {
                        alert("INVALID....");
                    }
                },
            error:
                function (response) {
                    console.error(response);
                    alert("address is not saved");
                }
        });

});

//complete booking
$("#payment-complete-booking").click(function () {

    var pincode = $("#postal-code").val();
    var date = $("#schedule-service-date").val();
    var time = $("#schedule-service-time").val();
    var basicHour = $("#schedule-service-hour").val();
    var extraServices = [];
    var x = document.getElementsByName("extra-service");
    for (var i = 0; i < x.length; i++) {
        if (x[i].checked)
            extraServices.push(i + 1);
    }
    var comment = $("#Comments").val();
    var havePet = document.getElementById("schedule-havePet").checked;
    var addressId;
    var y = document.getElementsByName("address");
    for (var i = 0; i < y.length; i++) {
        if (y[i].checked) {
            addressId = y[i].value;
            break;
        }
    }

    var model = {
        Pincode: pincode,
        DateTime: date + " " + time,
        BasicHour: basicHour,
        Extras: extraServices,
        Comments: comment,
        HavePet: havePet,
        AddressId: addressId

    }

    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/CompleteBooking',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: model,
            success:
                function (response) {
                    if (response != "false") {
                        document.getElementById("complete-booking-service-id-span").innerHTML = response;
                        document.getElementById("complete-booking-success-modal").click();
                    }
                },

            error:
                function (response) {
                    console.error(response);
                    alert("wrong");
                }
        });

    /*alert(pincode);
    alert(date);
    alert(time);
    alert(basicHour);
    alert(extraServices);
    alert(comment);
    alert(havePet);
    alert(addressId);*/

});
function SetAddressList() {
    document.getElementById("addresslist").innerHTML = "";

    $.ajax(
        {
            type: 'POST',
            url: '/Bookservice/GetAddress',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: { postalCode: document.getElementById("postal-code").value },
            success:
                function (response) {

                    document.getElementById("addresslist").innerHTML = "";
                    var json = JSON.parse(response);
                    for (var i = 0; i < json.length; i++) {
                        var addressObj = json[i];

                        document.getElementById("addresslist").innerHTML +=
                            '<div class="address d-flex  align-items-center">' +
                            '<input type="radio" value = "' + addressObj.AddressId + '" name = "address" />' +
                            '<p style="margin-left:12px; margin-top: 10px; margin-bottom: 10px;"><b>Address:</b>' + addressObj.AddressLine1 + ' ' + addressObj.AddressLine2 + ', ' + addressObj.City + ' ' + addressObj.PostalCode + '<br>Phone number: ' + addressObj.Mobile + '</p>' +
                            '</div>';
                    }

                },

            error:
                function (response) {
                    console.error(response);
                    alert("wrong");
                }
        });
}

/// add ours and update payment
function updatePayment() {
    //add hours
    alert("Hey Payment");
    dur = parseFloat($("#schedule-service-hour").val());
    $("#payment-summary-basic-hour").text(dur + " Hrs");
    if (document.getElementById("schedule-service-inside-cabinet").checked) {
        totalhour += parseFloat($("#schedule-service-inside-cabinet").val());
    }
    if (document.getElementById("schedule-service-inside-fridge").checked) {
        totalhour += parseFloat($("#schedule-service-inside-fridge").val());
    }
    if (document.getElementById("schedule-service-inside-oven").checked) {
        totalhour += parseFloat($("#schedule-service-inside-oven").val());
    }
    if (document.getElementById("schedule-service-laundry-wash").checked) {
        totalhour += parseFloat($("#schedule-service-laundry-wash").val());
    }
    if (document.getElementById("schedule-service-interior-window").checked) {
        totalhour += parseFloat($("#schedule-service-interior-window").val());
    }
    totalhour += dur;
    $("#payment-summary-total-time").html('<strong>' + totalhour + ' Hrs</strong>');
    $("#payment-summary-total-payment").text("$" + totalhour * 18);
}





//date
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