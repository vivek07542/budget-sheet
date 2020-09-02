var btnBudgetSubmit=document.getElementById("budgetSubmit");
var displayBudget=document.getElementById("budgetValue");
var btnBudgetSubmit = document.getElementById("budgetSubmit");
var displayBudget = document.getElementById("budgetValue");
var btnExpenditureSubmit = document.getElementById("expenditureSubmit");
var txtExpenseType = document.getElementById("txtExpenseType");
var displayExpenseAmount = document.getElementById("expenseAmount");
var txtExpense = document.getElementById("txtExpense");
var displayExpenditure = document.getElementById("expenditureValue");
var tblData = document.getElementById("tblData");
var inputBudget = document.getElementById("budgetText");
var balance = document.getElementById("spnBalance");
// Budget Input Form

btnBudgetSubmit.addEventListener("click",function(){
  var inputBudget=document.getElementById("budgetText").value;
  displayBudget.textContent=inputBudget;
});
// Budget Input Form
btnBudgetSubmit.addEventListener("click", function () {
  displayBudget.textContent = inputBudget.value;
  displayExpenditure.textContent = 0;
  balance.textContent = inputBudget.value;
});

// Expenditure Input Form

btnExpenditureSubmit.addEventListener("click", function () {
  let expense = Number(txtExpense.value);
  displayExpenditure.textContent =
    Number(displayExpenditure.textContent) + expense;
  balance.textContent = Number(balance.textContent) - expense;

  let tr = createDynamicElement("tr");

  let tdtitlle = createDynamicElement("td");
  tdtitlle.textContent = txtExpenseType.value;

  let tdValue = createDynamicElement("td");
  tdValue.textContent = expense;

  let tdAction = createDynamicElement("td");
  let aEdit = createDynamicElement("a");
  aEdit.textContent = "Edit";


  aEdit.addEventListener("click",function(){
    txtExpense.value = expense;
    txtExpenseType.value=tdtitlle.textContent;
    let trParent = getNearestTableAncestor(this);
    trParent.parentNode.removeChild(trParent);
    displayExpenditure.textContent =
    Number(displayExpenditure.textContent) - expense;
    balance.textContent = Number(balance.textContent) + expense;
  });
  let aDelete = createDynamicElement("a");
  aDelete.textContent = "| Delete";
  aDelete.addEventListener("click", function (aDelete) {
    if (confirm("do you want to delete this row?")) {
      let trParent = getNearestTableAncestor(this);
      trParent.parentNode.removeChild(trParent);
      displayExpenditure.textContent =
      Number(displayExpenditure.textContent) - expense;
      balance.textContent = Number(balance.textContent) + expense;
    }
  });

  tdAction.appendChild(aEdit);
  tdAction.appendChild(aDelete);
  tr.appendChild(tdtitlle);
  tr.appendChild(tdValue);
  tr.appendChild(tdAction);
  tblData.appendChild(tr);
  txtExpense.value = txtExpenseType.value = "";
});

function createDynamicElement(type) {
  let elem = document.createElement(type);
  return elem;
}

function getNearestTableAncestor(htmlElementNode) {
  while (htmlElementNode) {
    htmlElementNode = htmlElementNode.parentNode;
    if (htmlElementNode.tagName.toLowerCase() === "tr") {
      return htmlElementNode;
    }
  }
  return undefined;
}

