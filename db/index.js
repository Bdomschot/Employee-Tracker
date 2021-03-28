const connection = require('./connection');

module.exports = {
    
    getDepartments() {

        return connection.query("SELECT * FROM departments")

    },
    getRoles() {

        return connection.query("SELECT * FROM roles")

    },
    getEmployees() {

        return connection.query("SELECT * FROM employees")

    },
    createDepartment(department) {

        return connection.query("INSERT INTO departments SET ?",
            {
                name: department.department_name
            }
        )

    },
    createRole(results) {


        return connection.query("INSERT INTO roles SET ?",
            {
                department_id: results.departmentId,
                title: results.titleName,
                salary: results.salaryAmount
            }
        )


    },
    createEmployee(results) {

        return connection.query("INSERT INTO employees SET ?",
            {
                role_id: results.roleId,
                first_name: results.firstName,
                last_name: results.lastName,
                manager_id: results.managerId
                
            }
        )
    },
    updateRole(results) {

        return connection.query("UPDATE employees SET ? WHERE ?",
        [
            {
                role_id: results.roleId
            },
            {
                id: results.id 
            }
        ])
    },

}