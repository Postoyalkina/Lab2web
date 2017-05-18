function Circle(r) {
	this.r = r == undefined ? 0.0 : r;

	this.circuit = function() {
		return this.r * Math.PI * 2;
	};

	this.area = function() {
		return this.r * this.r * Math.PI;
	};

	this.changeCirc = function(proc)
	{
		this.r += proc*this.r/100;
	}
}

function CircleView(r) {
	Circle.call(this, r);

	this.createOperationView = function(rowIndex) {
		var view = document.createDocumentFragment();

		var deleteButton = document.createElement("button");
		deleteButton.appendChild(document.createTextNode("Delete"));
		deleteButton.addEventListener("click", function() {
		 	data.deleteCircle(rowIndex);
		});
		view.appendChild(deleteButton);

		return view;
	}

	this.createRow = function(rowIndex) {
	    var tr = document.createElement('tr');
	    tr.id = "row_" + rowIndex;

	    var td1 = document.createElement('td');
	    td1.appendChild(document.createTextNode('#' + (rowIndex+1)));
		tr.appendChild(td1);

	    var td2 = document.createElement('td');
	    td2.appendChild(document.createTextNode(this.r));
	    tr.appendChild(td2);
	    
	    var td3 = document.createElement('td');
	    td3.appendChild(document.createTextNode(this.circuit().toFixed(3)));
		tr.appendChild(td3);

		var td4 = document.createElement('td');
	    td4.appendChild(document.createTextNode(this.area().toFixed(3)));
		tr.appendChild(td4);

		var td5 = document.createElement('td');
	    td5.appendChild(this.createOperationView(rowIndex));
		tr.appendChild(td5);

		return tr;

	}
}

function getRandom() {
	return Math.round(Math.random()*100)+1;
}

var data = {
	circles : [
		new CircleView(1),
		new CircleView(2),
		new CircleView(3)
	],

	refreshTable : function() {
		var tableBody = document.getElementById('circles');
		tableBody.innerHTML = '';
		for(var i = 0; i < this.circles.length; ++i) {
			tableBody.appendChild(this.circles[i].createRow(i));
		}

	},

	add : function(r) {
		this.circles.push(new CircleView(r));
		this.refreshTable();
	},

	addRandom : function() {
		this.add(getRandom());
	},

	addCirc : function() {
		var form = document.getElementById("newCirclef");
		var r = parseFloat(form.elements.nCr.value);
		this.add(r);
	},

	change : function() {
		var form = document.getElementById("changeCirclef");
		var r = parseFloat(form.elements.proc.value);
		var i = parseFloat(form.elements.index.value);
		this.circles[i-1].changeCirc(r);
		this.refreshTable();

	},

	deleteCircle : function(index) {
		this.circles.splice(index, 1);
		this.refreshTable();
	},

	clear : function() {
		this.circles = [];
		this.refreshTable();
	}

}