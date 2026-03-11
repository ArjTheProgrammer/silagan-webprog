
document.addEventListener('DOMContentLoaded', function() {
	class Student {
		constructor(name, isPresent = null) {
			this.name = name;
			this.isPresent = isPresent;
		}
	}
	const addBtn = document.querySelector('.add-btn');
	const studentInput = document.querySelector('.student-input');
	const studentList = document.querySelector('.student-list');

	addBtn.addEventListener('click', function() {
		const name = studentInput.value.trim();
		if (!name) {
			alert("please enter a student name.")
			return
		};

		const student = new Student(name);
		console.log(student);

		const li = document.createElement('li');
		li.className = 'student-item';

		const infoDiv = document.createElement('div');
		const nameSpan = document.createElement('span');
		nameSpan.className = 'student-name';
		nameSpan.textContent = student.name;
		const statusSpan = document.createElement('span');
		statusSpan.className = 'status';
		statusSpan.textContent = '';
		infoDiv.appendChild(nameSpan);
		infoDiv.appendChild(statusSpan);

		const btnGroup = document.createElement('div');
		btnGroup.className = 'button-group';

		const presentBtn = document.createElement('input');
		presentBtn.type = 'button';
		presentBtn.className = 'present-btn';
		presentBtn.value = 'Mark Present';
		presentBtn.addEventListener('click', function() {
			statusSpan.textContent = '(Present)';
			li.style.backgroundColor = '#2564eb36';
			li.style.borderColor = '#2563eb';
			statusSpan.style.color = '#2563eb';
			student.isPresent = true;
		});

		const absentBtn = document.createElement('input');
		absentBtn.type = 'button';
		absentBtn.className = 'absent-btn';
		absentBtn.value = 'Mark Absent';
		absentBtn.addEventListener('click', function() {
			statusSpan.textContent = '(Absent)';
			li.style.backgroundColor = '#f59d1a3e';
			li.style.borderColor = '#f59e1a';
			statusSpan.style.color = '#f59e1a';
			student.isPresent = false;
		});

		const removeBtn = document.createElement('input');
		removeBtn.type = 'button';
		removeBtn.className = 'remove-btn';
		removeBtn.value = 'Remove';
		removeBtn.addEventListener('click', function() {
			li.remove();
		});

		btnGroup.appendChild(presentBtn);
		btnGroup.appendChild(absentBtn);
		btnGroup.appendChild(removeBtn);

		li.appendChild(infoDiv);
		li.appendChild(btnGroup);

		studentList.appendChild(li);
		studentInput.value = '';
	});
});
