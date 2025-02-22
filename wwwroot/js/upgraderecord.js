﻿function showAddUpgradeRecordModal() {
    $.get('/Vehicle/GetAddUpgradeRecordPartialView', function (data) {
        if (data) {
            $("#upgradeRecordModalContent").html(data);
            //initiate datepicker
            $('#upgradeRecordDate').datepicker({
                endDate: "+0d",
                format: getShortDatePattern().pattern
            });
            $('#upgradeRecordModal').modal('show');
        }
    });
}
function showEditUpgradeRecordModal(upgradeRecordId) {
    $.get(`/Vehicle/GetUpgradeRecordForEditById?upgradeRecordId=${upgradeRecordId}`, function (data) {
        if (data) {
            $("#upgradeRecordModalContent").html(data);
            //initiate datepicker
            $('#upgradeRecordDate').datepicker({
                endDate: "+0d",
                format: getShortDatePattern().pattern
            });
            $('#upgradeRecordModal').modal('show');
        }
    });
}
function hideAddUpgradeRecordModal() {
    $('#upgradeRecordModal').modal('hide');
}
function deleteUpgradeRecord(upgradeRecordId) {
    $("#workAroundInput").show();
    Swal.fire({
        title: "Confirm Deletion?",
        text: "Deleted Upgrade Records cannot be restored.",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "#dc3545"
    }).then((result) => {
        if (result.isConfirmed) {
            $.post(`/Vehicle/DeleteUpgradeRecordById?upgradeRecordId=${upgradeRecordId}`, function (data) {
                if (data) {
                    hideAddUpgradeRecordModal();
                    successToast("Upgrade Record Deleted");
                    var vehicleId = GetVehicleId().vehicleId;
                    getVehicleUpgradeRecords(vehicleId);
                } else {
                    errorToast("An error has occurred, please try again later.");
                }
            });
        } else {
            $("#workAroundInput").hide();
        }
    });
}
function saveUpgradeRecordToVehicle(isEdit) {
    //get values
    var formValues = getAndValidateUpgradeRecordValues();
    //validate
    if (formValues.hasError) {
        errorToast("Please check the form data");
        return;
    }
    //save to db.
    $.post('/Vehicle/SaveUpgradeRecordToVehicleId', { upgradeRecord: formValues }, function (data) {
        if (data) {
            successToast(isEdit ? "Upgrade Record Updated" : "Upgrade Record Added.");
            hideAddUpgradeRecordModal();
            getVehicleUpgradeRecords(formValues.vehicleId);
            if (formValues.addReminderRecord) {
                setTimeout(function () { showAddReminderModal(formValues); }, 500);
            }
        } else {
            errorToast("An error has occurred, please try again later.");
        }
    })
}
function getAndValidateUpgradeRecordValues() {
    var serviceDate = $("#upgradeRecordDate").val();
    var serviceMileage = $("#upgradeRecordMileage").val();
    var serviceDescription = $("#upgradeRecordDescription").val();
    var serviceCost = $("#upgradeRecordCost").val();
    var serviceNotes = $("#upgradeRecordNotes").val();
    var vehicleId = GetVehicleId().vehicleId;
    var upgradeRecordId = getUpgradeRecordModelData().id;
    var addReminderRecord = $("#addReminderCheck").is(":checked");
    //validation
    var hasError = false;
    if (serviceDate.trim() == '') { //eliminates whitespace.
        hasError = true;
        $("#upgradeRecordDate").addClass("is-invalid");
    } else {
        $("#upgradeRecordDate").removeClass("is-invalid");
    }
    if (serviceMileage.trim() == '' || parseInt(serviceMileage) < 0) {
        hasError = true;
        $("#upgradeRecordMileage").addClass("is-invalid");
    } else {
        $("#upgradeRecordMileage").removeClass("is-invalid");
    }
    if (serviceDescription.trim() == '') {
        hasError = true;
        $("#upgradeRecordDescription").addClass("is-invalid");
    } else {
        $("#upgradeRecordDescription").removeClass("is-invalid");
    }
    if (serviceCost.trim() == '') {
        hasError = true;
        $("#upgradeRecordCost").addClass("is-invalid");
    } else {
        $("#upgradeRecordCost").removeClass("is-invalid");
    }
    return {
        id: upgradeRecordId,
        hasError: hasError,
        vehicleId: vehicleId,
        date: serviceDate,
        mileage: serviceMileage,
        description: serviceDescription,
        cost: serviceCost,
        notes: serviceNotes,
        files: uploadedFiles,
        addReminderRecord: addReminderRecord
    }
}