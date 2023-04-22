<template>
	<form @submit.prevent="submitForm">
		<div class="container">
			<div class="contact-box">
				<h2>Add New Employee</h2>
				<div class="left">
					<input
						type="text"
						required
						v-model="employee.first_name"
						class="field300"
						placeholder="First Name" />
					<input
						type="gender"
						required
						v-model="employee.gender"
						class="field300"
						placeholder="Gender" />
					<input
						type="text"
						required
						v-model="employee.salary"
						class="field300"
						placeholder="Salary" />
					<input
						type="date"
						required
						v-model="employee.birth_day"
						class="field300"
						placeholder="Date of Birth" />
					<button class="btn-2">Clear</button>
				</div>
				<div class="right">
					<input
						type="text"
						required
						v-model="employee.last_name"
						class="field300"
						placeholder="Last Name" />
					<input
						type="text"
						required
						v-model="employee.location"
						class="field300"
						placeholder="Location" />
					<input
						type="text"
						required
						v-model="employee.emp_id"
						class="field300"
						placeholder="Enployee ID" />
					<button class="btn-1" type="submit" value="Submit">Submit</button>
				</div>
			</div>
		</div>
	</form>
	<div class="table-section">
		<h2>List of All Employees</h2>
		<Card class="card">
			<table>
				<thead>
					<tr>
						<th>emp_id</th>
						<th>first_name</th>
						<th>last_name</th>
						<th>birth_day</th>
						<th>gender</th>
						<th>Salary</th>
						<th>super_id</th>
						<th>branch_id</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(employee, index) in employees" :key="index">
						<td>{{ employee.emp_id }}</td>
						<td>{{ employee.first_name }}</td>
						<td>{{ employee.last_name }}</td>
						<td>{{ employee.birth_day }}</td>
						<td>{{ employee.gender }}</td>
						<td>{{ employee.salary }}</td>
						<td>{{ employee.super_id }}</td>
						<td>{{ employee.branch_id }}</td>
						<td style="text-align: center">
							<span @click.prevent="editData(employee)" class="editButton">
								Edit</span
							>
							<span class="deleteButton">Delete</span>
						</td>
					</tr>
				</tbody>
			</table>
		</Card>
	</div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			// title: "Employees Record",
			// tableTitle: "List of Employees",
			updateData: false,
			employee: {
				emp_id: "",
				first_name: "",
				last_name: "",
				birth_day: "",
				gender: "",
				salary: "",
				supper_id: 100,
				branch_id: 2,
			},

			employees: [],
		};
	},

	created() {
		this.getEmployeesData();
	},

	methods: {
		getEmployeesData() {
			axios
				.get("http://192.168.1.42:3000/employee")
				.then((res) => {
					console.log("Res: ", res.data);
					this.employees = res.data;
				})
				.catch((error) => {
					console.log("Error", error);
				});
		},

		saveEmployee() {
			axios
				.post("http://192.168.1.42:3000/employee", this.employee)
				.then((res) => {
					// console.log("Message: ", res);
					this.employees = [res.data[0], ...this.employees];
				})
				.catch((error) => {
					console.log("Error", error);
				});
		},

		editData(employee) {
			Object.keys(this.employee).forEach((key) => {
				this.employee[key] = employee[key];
			});
		},

		submitForm() {
			if (this.updateData) {
				this.updateEmployeeData();
			} else {
				this.saveEmployee();
			}
		},

		updateEmployeeData() {
			axios
				.put(
					"http://192.168.1.42:3000/employee" + this.employee.emp_id,
					this.employee
				)
				.then((res) => {
					console.log(res);
					let editedData = res.data;
					this.employee = this.employee.map((item) => {
						if (editedData.emp_id === item.emp_id) {
							return editedData;
						}
						return item;
					});
				})
				.catch((error) => {
					console.log("Error: ", error);
				});
		},
	},
};
</script>
