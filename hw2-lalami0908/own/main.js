let todoArr = [];
let currentState = 0;
let itemcnt = 0;

var CurrentStateCodes = {
    all: 0,
    active: 1,
    completed: 2,
};

const input = document.getElementById('todo-input');
input.addEventListener('keyup', event => {
    if (event.code === 'Enter' && event.target.value !== '')  {
        const newItem = addItem(event.target.value);
        event.target.value = '';
    }
});

/* ================= data constructor ================*/
class ItemNode {
    constructor(node, id) {
      this.node = node;
      this.id = id;
      this.isComplete = false;
    }
}

/*  ================= modify  data =================*/
function addItem(content) {

	const itemNode = document.createElement("LI");
	itemNode.setAttribute("class", "todo-app__item");
	newItem = new ItemNode(itemNode, itemcnt);
	todoArr.push(newItem);

	const wrapper = document.createElement("DIV");
	wrapper.setAttribute("class", "todo-app__checkbox");

	const checkbox = document.createElement("INPUT");
	checkbox.setAttribute("id", itemcnt.toString());
	checkbox.setAttribute("onClick", "clickCheckbox(this)");
	checkbox.setAttribute("type", "checkbox");

	const label = document.createElement("LABEL");
	label.setAttribute("for", itemcnt.toString());

	const detail = document.createElement("H1");
	detail.setAttribute("class", "todo-app__item-detail");
	detail.innerHTML = content

	const imgX = document.createElement("img");
	imgX.setAttribute("class", "todo-app__item-x");
	imgX.setAttribute("onclick", "deleteItem(this.parentNode)")
	imgX.src = "./img/x.png"

	wrapper.appendChild(checkbox);
	wrapper.appendChild(label);
	itemNode.appendChild(wrapper);
	itemNode.appendChild(detail);
    itemNode.appendChild(imgX);

	document.getElementById('todo-list').appendChild(itemNode);
    document.getElementById("footer").style["display"] = "";
    
	updateLeftCount();
	updateClearButton();
	itemcnt += 1;
}

function deleteItem(itemNode) {
	for (var i = todoArr.length - 1; i >= 0; i--) {
		if(todoArr[i].node === itemNode){
			todoArr.splice(i,1);
			break;
		}	
    }
    // if there is no node hide footer and set the currentState to all
	if(todoArr.length === 0){
        document.getElementById("footer").style["display"] = "none";

        document.getElementById("state_all").style["border"] = "1px solid rgba(0, 0, 0, 0.089)";
        document.getElementById("state_active").style["border"] = "none";
        document.getElementById("state_completed").style["border"] = "none";
        currentState = CurrentStateCodes.all;
	}
	itemNode.remove();
	updateLeftCount();
	updateClearButton();
}
/* ==================== some action =========================*/
/* click checkbox to complete node or cancel complete */
function clickCheckbox(itemNode) {
	pnode = itemNode.parentNode.parentNode; 
	text = pnode.getElementsByTagName('H1')[0];

	let tnode = todoArr.find(obj => {return obj.node === pnode});

	if(tnode.isComplete == false) {
		tnode.isComplete = true;
		text.style["textDecoration"] = "line-through";
		text.style["opacity"] = 0.5;

	} else {
		tnode.isComplete = false;
		text.style["textDecoration"] = "none";
		text.style["opacity"] = 1;
	}
	updateLeftCount();
	updateClearButton();
}
/* Choose the stage the node are displayed now, modify the apprance of button, and update items show */
function changeCurrentState(state) {
    
    document.getElementById("state_active").style["border"] = "none";
	document.getElementById("state_completed").style["border"] = "none";
    document.getElementById("state_all").style["border"] = "none";
    state.style["border"] =  "1px solid rgba(0, 0, 0, 0.089)";

    selectedState = state.id;
	if(selectedState === "state_all"){
		currentState = CurrentStateCodes.all;
	} else if(selectedState === "state_active"){
		currentState = CurrentStateCodes.active;
	} else if(selectedState === "state_completed"){
		currentState = CurrentStateCodes.completed;
	}
    updateItemShow();
}
/* remove the nodes are completed */
function clearCompleted() {
    items = todoArr.filter(obj => {return obj.isComplete === true});
	completedNodes = items.map(obj => {return obj.node});

	completedNodes.map(deleteItem);
	updateLeftCount();
	updateClearButton();
}

/* ================= Update the display on the view ======================*/

/* Update the remaining count in the lower left corner */
function updateLeftCount() {
	const leftCount = todoArr.filter(obj => {return obj.isComplete === false}).length;	
	actnode = document.getElementById("leftCount");
	actnode.innerHTML = leftCount + " Left";
}

/* If there is any node is completed, show the clear button, otherwise hide the button */
function updateClearButton() {
	const completedExist = todoArr.some(obj => {return obj.isComplete === true});
	const node = document.getElementById("clear-completed");
	if(completedExist){
		node.style["visibility"] =  "";
	} else{
		node.style["visibility"] =  "hidden";
	}
}
/* update item show after changing current state */
function updateItemShow() {	
    // show every items
    allNodes = todoArr.map(obj => {return obj.node})
    allNodes.map(showItem);
    // Determine the current stage and hide the opposite node
	if(currentState === CurrentStateCodes.active){
		items = todoArr.filter(obj => {return obj.isComplete === true});
		itemNodes = items.map(obj => {return obj.node});
		itemNodes.map(hideItem);
	} else if (currentState === CurrentStateCodes.completed){
		items = todoArr.filter(obj => {return obj.isComplete === false});
		itemNodes = items.map(obj => {return obj.node});
		itemNodes.map(hideItem);
	}
}

function showItem(node) {
	if(node != undefined){
		node.style["display"] = "";
	}
}

function hideItem(node) {
	if(node != undefined){
		node.style["display"] = "none";
	}
}
