const connection = require('./connection');

module.exports = {
    
    viewInfo(){

        return connection.query(`SELECT ee.first_name, ee.last_name, ro.title as title, de.name as department, CONCAT(emp.first_name, emp.last_name)as manager
                                FROM employee ee
                                LEFT JOIN role ro
                                ON ee.role_id = ro.id
                                LEFT JOIN department de
                                ON ro.department_id = de.id
                                LEFT JOIN employee emp
                                ON ee.manager_id = emp.id`)

    },
    getDepartment() {

        return connection.query("SELECT * FROM department")

    },
    getRole() {

        return connection.query("SELECT * FROM role")

    },
    getEmployee() {

        return connection.query("SELECT * FROM employee")

    },
    createDepartment(department) {

        return connection.query("INSERT INTO department SET ?",
            {
                name: department.department_name
            }
        )

    },
    createRole(results) {


        return connection.query("INSERT INTO role SET ?",
            {
                department_id: results.departmentId,
                title: results.titleName,
                salary: results.salaryAmount
            }
        )


    },
    createEmployee(results) {

        return connection.query("INSERT INTO employee SET ?",
            {
                role_id: results.roleId,
                first_name: results.firstName,
                last_name: results.lastName,
                manager_id: results.managerId
                
            }
        )
    },
    updateRole(results) {

        return connection.query("UPDATE employee SET ? WHERE ?",
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