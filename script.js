/**
 * Created by SanthoshReddy on 6/26/2016.
 */
// Code goes here

'use strict'

var matrixTbl = null;

function MatrixTable() {
    this.selectedCount = 0;
    this.tableDetl = null;
}



function resetMatrix() {
    var tableDetl = matrixTbl.tableDetl;
    matrixTbl.tableDetl = null;
    matrixTbl.selectedCount = 0;
    $("#" + matrixTbl.selectedColor).attr('checked', false);
    matrixTbl.selectedColor = "";
    $("#" + tableDetl.id).html("");
    matrixTbl.createTable(tableDetl);
}


MatrixTable.prototype.createTable = function (tableDetl) {
    this.tableDetl = tableDetl;
    var L_tbl = document.getElementById(this.tableDetl.id);
    var L_count = 0;
    for (var i = 0; i < this.tableDetl.row; i++) {
        var L_tr = document.createElement("tr");
        L_tbl.appendChild(L_tr);
        for (var j = 0; j < this.tableDetl.col; j++) {
            L_count++;
            var L_td = document.createElement("td");
            L_td.id = "td_" + L_count
            if(L_count==(matrixTbl.tableDetl.row*matrixTbl.tableDetl.col)){
                $(L_td).addClass("emptyCell");
                L_td.innerHTML = "";
            }else{
                L_td.innerHTML = L_count;
                $(L_td).click(matrixTbl.tdClicked);
            }
            L_tr.appendChild(L_td);
        }
    }

    $("#" + this.tableDetl.id + " td").addClass("matrixTblTd").addClass("matrixTblTdOut");

    $(document).on("mouseover","#" + this.tableDetl.id + " td",function(){
        $(this).addClass("matrixTblTdOver").removeClass("matrixTblTdOut");
    } )
    $(document).on("mouseout","#" + this.tableDetl.id + " td",function(){
        $(this).removeClass("matrixTblTdOver").addClass("matrixTblTdOut")
    } )

}


MatrixTable.prototype.randomize = function () {
    var table = document.getElementById(matrixTbl.tableDetl.id);
    for (var i = 0; i < table.childNodes.length; i++) {
        var L_tr = table.childNodes[i];
        for (var j = 0; j < L_tr.childNodes.length; j++) {
            var L_trRandomNum = getRandomInt(0, (matrixTbl.tableDetl.row) - 1);
            var L_tdRandomNum = getRandomInt(0, (matrixTbl.tableDetl.col) - 1);
            var srcTd = table.childNodes[L_trRandomNum].childNodes[L_tdRandomNum];
            var srcTdNextSibling = srcTd.nextSibling;
            var L_td = L_tr.childNodes[j];
            if (srcTd.innerHTML != L_td.innerHTML) {
                L_tr.insertBefore(srcTd, L_td.nextSibling);
                table.childNodes[L_trRandomNum].insertBefore(L_td, srcTdNextSibling);
            }
        }
    }
}
/*
 EVENTS ON THE  BY CLICK
 */
MatrixTable.prototype.tdClicked = function () {


    var rowIndex = $(this.parentNode).index();
    var colIndex = $(this).index();

    var L_table = document.getElementById("tbl_matrix");
    if(rowIndex!=0){
        var topCell = L_table.rows[rowIndex-1].cells[colIndex];
        if($(topCell).hasClass('emptyCell')){
            $(topCell).removeClass('emptyCell')
            $(topCell).html($(this).html()).click(matrixTbl.tdClicked);;
            $(this).addClass('emptyCell').html('').off();
            matrixTbl.checkForSuccess(L_table);
            return;
        }
    }
    if(rowIndex!=(matrixTbl.tableDetl.row-1) ){
        var bottomCell = L_table.rows[rowIndex+1].cells[colIndex];
        if($(bottomCell).hasClass('emptyCell')){
            $(bottomCell).removeClass('emptyCell')
            $(bottomCell).html($(this).html()).click(matrixTbl.tdClicked);;
            $(this).addClass('emptyCell').html('').off();
            matrixTbl.checkForSuccess(L_table);
            return;
        }
    }

    if(colIndex!=0){
        var leftCell = L_table.rows[rowIndex].cells[colIndex-1];
        if($(leftCell).hasClass('emptyCell')){
            $(leftCell).removeClass('emptyCell')
            $(leftCell).html($(this).html()).click(matrixTbl.tdClicked);;
            $(this).addClass('emptyCell').html('').off();
            matrixTbl.checkForSuccess(L_table);
            return;
        }
    }

    if(colIndex!=(matrixTbl.tableDetl.col-1)){
        var rightCell = L_table.rows[rowIndex].cells[colIndex+1];
        if($(rightCell).hasClass('emptyCell')){
            $(rightCell).removeClass('emptyCell')
            $(rightCell).html($(this).html()).click(matrixTbl.tdClicked);
            $(this).addClass('emptyCell').html('').off();
            matrixTbl.checkForSuccess(L_table);
            return;
        }
    }



}

MatrixTable.prototype.checkForSuccess = function (table) {
    var L_res = "12345678";
    var currRes="";

    for(var i=0;i<table.rows.length;i++){
        for(var j=0;j<table.rows[i].cells.length;j++){
            currRes+=$(table.rows[i].cells[j]).html();
        }
    }
    if(currRes==L_res && $(table.rows[2].cells[2]).hasClass("emptyCell") ){
        setTimeout(function(){
            $("#tbl_matrix > tr > td").css('visibility','hidden');
        },500);

    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function () {
    matrixTbl = new MatrixTable();
    matrixTbl.createTable({
        id: "tbl_matrix",
        row: 3,
        col: 3
    });
    matrixTbl.randomize();
});