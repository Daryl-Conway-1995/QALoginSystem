package com.example.qa_account_system;

import com.example.qa_account_system.Employee;
import com.example.qa_account_system.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping(path= "/app")
public class DatabaseController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping(path = "/addUser")
    public @ResponseBody String addNewEmployee (@RequestBody Employee employee) {
        System.out.println(employee.getfName());
        employeeRepository.save(employee);
        return "Added new employee";
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Employee> findAllEmployees() {
        return employeeRepository.findAll();
    }

    @DeleteMapping(path = "/delete")
    public @ResponseBody String deleteEmployee (@RequestBody Employee employee) {
        employeeRepository.delete(employee);
        return "Deleted employee";
    }
}
