function SDC_startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = SDC_checkTime(m);
    document.getElementById('simple_digital_clock').innerHTML =
    h + ":" + m;
    var t = setTimeout(SDC_startTime, 500);
}
function SDC_checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
