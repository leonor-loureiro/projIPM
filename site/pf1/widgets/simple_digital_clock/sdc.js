function SDC_startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = SDC_checkTime(m);
    s = SDC_checkTime(s);
    document.getElementById('simple_digital_clock').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(SDC_startTime, 500);
}
function SDC_checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
