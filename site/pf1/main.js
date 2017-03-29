function hideColumns() {
	var columns = document.getElementsByClassName('col-xs-4'), i;
	for (var i = 0; i < columns.length; i ++) {
		columns[i].style.display = 'none';
	}
}

function showColumns() {
	var columns = document.getElementsByClassName('col-xs-4'), i;
	for (var i = 0; i < columns.length; i ++) {
		columns[i].style.display = 'inline';
	}
}

function f1() {
	hideColumns();
}

function f2() {
	hideColumns();
}

function f3() {
	hideColumns();
}
