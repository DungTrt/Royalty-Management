var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    if(selElmnt.options[j].hasAttribute('selected')){
        c.classList.add('same-as-selected');
    }
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", function(){
  closeAllSelect();
  $("span.canEdit").next().hide();
  $("span.canEdit").show();
});

$(function(){
    //$('[data-toggle="tooltip"]').tooltip()
    $(".form-group span.clear").click(function(){
        $(this).hide();
        let input=$(this).parent().find(".form-control");
        $(input).val('');
        $(input).focus();
    })
    $("#contractorFilter").select2({
      placeholder: '契約先を入力・選択',
      allowClear: true
    })
    $("#licenseMasterRegistrationLicenseCodeSelect").select2({
      placeholder: 'ライセンスコードを入力・選択',
      allowClear: true
    })
    // const psLicenseList = new PerfectScrollbar('#tableLicenseList', {
    //   wheelSpeed: 2,
    //   wheelPropagation: true,
    //   minScrollbarLength: 20
    // });

    // const psContractInfomationMaster = new PerfectScrollbar('#tableLicenseContract', {
    //   wheelSpeed: 2,
    //   wheelPropagation: true,
    //   minScrollbarLength: 20
    // });

    // const psLicensedMaster = new PerfectScrollbar('#tableLincensedMaster', {
    //   wheelSpeed: 2,
    //   wheelPropagation: true,
    //   minScrollbarLength: 20
    // });

    // const psContractInformationMasterRegistrationModalBody=new PerfectScrollbar('#contractInformationMasterRegistrationModalBody', {
    //   wheelSpeed: 2,
    //   wheelPropagation: true,
    //   minScrollbarLength: 20
    // })

    // const psLicenseMasterRegistrationModalBody=new PerfectScrollbar('#licenseMasterRegistrationModalBody', {
    //   wheelSpeed: 2,
    //   wheelPropagation: true,
    //   minScrollbarLength: 20
    // })

    // const pssearchContractTable=new PerfectScrollbar('#searchContractTable', {
    //   wheelSpeed: 2,
    //   wheelPropagation: true,
    //   minScrollbarLength: 20
    // })

    // window.addEventListener('resize',function(){
    //   psLicenseList.update();
    //   psContractInfomationMaster.update();
    //   psLicensedMaster.update();
    //   psContractInformationMasterRegistrationModalBody.update();
    //   psLicenseMasterRegistrationModalBody.update();
    //   pssearchContractTable.update();
    // })

    $("#btnAddLincense").click(function(){
      $("#licenseMasterRegistrationModal").modal('show');
    })

    $("#btnAddContractInformationMaster").click(function(){
      $("#contractInformationMasterRegistrationModal").modal('show');
    })
    $('[data-toggle="tooltip"]').tooltip({placement:"top"})

    $(".form-control.date").datepicker({
      language:'ja',
      format: 'yyyy/MM/dd',
      autoclose:true,
      clearBtn:true,
      todayHighlight:true
    })
    $(".form-control.month").datepicker({
      language:'ja',
      format: 'yyyy/MM',
      autoclose:true,
      clearBtn:true,
      todayHighlight:true,
      minViewMode: 'months'
    })

    $("#btnUpdateLicenseMasterRegistration").click(function(){
      Swal.fire({
        title: '<img src="./assets/images/info_warning.svg"/> ライセンスマスタ登録',
        text:'ライセンスマスタを登録しますか？',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'はい',
        cancelButtonText:'キャンセル',
      })
    })

    $("#btnUpdateContractorInfomation").click(function(){
      Swal.fire({
        title: '<img src="./assets/images/info_warning.svg"/> 契約情報マスタ修正',
        text:'契約情報を更新しますか',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'はい',
        cancelButtonText:'キャンセル',
      })
    })

    $("#btnUpdateLincesedMasterList").click(function(){
      const message=`製品情報を更新しますか？<br>
      - 商品登録 :１<br>
      - 登録削除 : 2 <br>
      - 内容修正 : 1`
      Swal.fire({
        title: '<img src="./assets/images/info_warning.svg"/> 製品情報更新',
        html:message,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'はい',
        cancelButtonText:'キャンセル',
      })
    })

    $(".sorting").click(function(e){
      if(!isResizing && !e.target.closest('resizer')){
        let trElement=$(this).parent();

      if($(this).hasClass('sorting_asc')){
        $(this).removeClass('sorting_asc');
        let imgElement=$(this).find("img");
        $(this).addClass("sorting_desc");
        $(imgElement).attr("src","./assets/images/Sorting_icon_Desc.svg");
      }
      else if($(this).hasClass('sorting_desc')){
        $(this).removeClass('sorting_desc');
        let imgElement=$(this).find("img");
        $(this).addClass("sorting_asc");
        $(imgElement).attr("src","./assets/images/Sorting_icon_asc.svg");
      }
      else{
        let sortingDescElements=trElement.find(".sorting_desc");
        sortingDescElements.each(function(index,element){
          $(element).removeClass('sorting_desc');
          let img=$(element).find("img");
          $(img).attr("src","./assets/images/Sorting_icon_default.svg");
        })
  
        let sortingAscElements=trElement.find(".sorting_asc");
        sortingAscElements.each(function(index,element){
          $(element).removeClass('sorting_asc');
          let img=$(element).find("img");
          $(img).attr("src","./assets/images/Sorting_icon_default.svg");
        })
  
        let imgElement=$(this).find("img");
        $(this).addClass("sorting_asc");
        $(imgElement).attr("src","./assets/images/Sorting_icon_asc.svg");
      }
      }

      
    })

    $("#btnAddLincesedMaster").click(function(){
      let tr=`<tr>
                <td></td>
                <td></td>
                <td>
                  <div>
                    <input type="text" class="form-control" placeholder="型番を入力">
                    <span class="material-icons btnSearchContract" onclick="showSearchContractModal()">search</span>
                  </div>
                </td>
                <td>
                  <input type="text" class="form-control" placeholder="1" style="padding:6px;text-align: right;">
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <input type="text" class="form-control date" placeholder="年/月/日" style="padding:6px;">
                </td>
                <td>
                  <input type="text" class="form-control" placeholder="" style="padding:6px;">
                </td>
                <td></td>
                <td>
                  <input class="form-check-input" type="checkbox" value="">
                </td>
                <td>
                  <a href="#!" class="btnRemoveForever" onclick="deleteForeverLicenseMaster()">
                    <img src="./assets/images/delete-forever.svg" />
                  </a>
                </td>
              </tr>`;
      $("#tableLincensedMaster tbody").append(tr);
      $(".form-control.date").datepicker({
        language:'ja',
        format: 'yyyy/MM/dd',
        autoclose:true,
        clearBtn:true,
        todayHighlight:true
      })
    })

    // $(".sorting_desc").click(function(){
    //   let trElement=$(this).parent();
    //   console.log(trElement);
    // })
    // $(".sorting_asc").click(function(){
    //   let trElement=$(this).parent();
    //   console.log(trElement);
    // })



    $("span.canEdit").click(function(e){
      e.stopPropagation();
      $("span.canEdit").show();
      $("span.canEdit").next().hide();
      $(this).hide();
      $(this).next().show().focus();
    })
    $("tbody td .form-control").click(function(e){
      e.stopPropagation();
      // $("span.canEdit").show();
      // $("span.canEdit").next().hide();
      // $(this).hide();
      // $(this).next().show().focus();
    })
})

function showSearchContractModal(){
  $("#searchContractModal").modal("show");
}

$("input").on('input',function(e){
  let clearBtn=$(this).parent().find(".clear");
  if(e.target.value.length>0){
    $(clearBtn).show();
  }
  else{
    $(clearBtn).hide();
  }
})

function clearSelect2Search(e){
  let input=$(e).parent().find(".select2-search__field");
  $(input).val("").change();
  $(input).focus();
}

const icons={
  'success':"./assets/images/check-circle.svg",
  'info':"./assets/images/info.svg",
  'danger':"./assets/images/error.svg"
} 
function showAlertDialog(title, message,type){

  let alert=document.createElement("div");
  let alertSection=document.getElementById('alert-section');

  alert.className=`alert alert-${type} alert-dismissible d-flex align-items-start`;
  alert.setAttribute("role","alert");
  alert.innerHTML=`<img src="${icons[type]}" />
  <div class="alert-content">
    <h4 class="alert-heading">${title}</h4>
    <p class="alert-body">${message}</p>
  </div>
  <a type="button" data-bs-dismiss="malertodal" aria-label="Close" class="alert-close">
    <img src="./assets/images/close.svg"/>
  </a>`;
  alertSection.appendChild(alert);
  const autoRemoveAlert=setTimeout(() =>{
    alertSection.removeChild(alert);
  },2000) 

  alert.onclick=function(e){
    if(e.target.closest(".alert-close")){
      clearTimeout(autoRemoveAlert);
    }
  }
}

function deleteLicense(){
  Swal.fire({
    title: '<img src="./assets/images/info_warning.svg"/> 契約情報マスタ修正',
    text:'契約情報を更新しますか',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:'はい',
    cancelButtonText:'キャンセル',
  })
}

function deleteLicenseMaster(){
  Swal.fire({
    title: '<img src="./assets/images/info_warning.svg"/> 契約情報マスタ修正',
    text:'契約情報を更新しますか',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:'はい',
    cancelButtonText:'キャンセル',
  })
}

function deleteContractInformationMaster(){
  Swal.fire({
    title: '<img src="./assets/images/info_warning.svg"/> 契約情報マスタ削除',
    text:'契約情報を削除しますか',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:'はい',
    cancelButtonText:'キャンセル',
  })
}

//resize Column Table
let isResizing=false;
let autoPreventSortAfterResize;
$(".resize").click(function (e) {
  e.stopPropagation();
})
document.addEventListener('DOMContentLoaded', function () {
  const createResizableTable = function (table) {
      const thCols = $(table).find("th");
      [].forEach.call(thCols, function (col) {
          // Add a resizer element to the column
          const resizer = col.querySelectorAll(".resizer");
          if(resizer.length>0){
            createResizableColumn(col, resizer[0]);
          }
          
      });
      
      // const tdCols = $(table).find("td");
      // [].forEach.call(tdCols, function (col) {
      //     // Add a resizer element to the column
      //     const resizer = document.createElement('div');
      //     resizer.classList.add('resizer');

      //     // Set the height
      //     resizer.style.height = `${table.offsetHeight}px`;

      //     col.appendChild(resizer);

      //     createResizableColumn(col, resizer);
      // });
  };

  const createResizableColumn = function (col, resizer) {
      let x = 0;
      let w = 0;

      const mouseDownHandler = function (e) {
          x = e.clientX;

          const styles = window.getComputedStyle(col);
          w = parseInt(styles.width, 10);

          document.addEventListener('mousemove', mouseMoveHandler);
          document.addEventListener('mouseup', mouseUpHandler);

          resizer.classList.add('resizing');
      };

      const mouseMoveHandler = function (e) {
          isResizing=true;
          const dx = e.clientX - x;
          col.style.minWidth = `${w + dx}px`;
          isResizing=true;
      };

      const mouseUpHandler = function () {
          resizer.classList.remove('resizing');
          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
          
          autoPreventSortAfterResize=setTimeout(function(){
            isResizing=false;
          },1000)
          
      };

      resizer.addEventListener('mousedown', mouseDownHandler);
  };

  createResizableTable($("#tableLicenseContract .table"));
  createResizableTable($("#tableLincensedMaster .table"));
  createResizableTable($("#tableLicenseList .table"));
});

$("#showOnlyListLicense").change(function () {
  $("#license-list").toggleClass("w100");
  $("#license-contract").toggleClass("hidden");
})
