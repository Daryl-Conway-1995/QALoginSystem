package com.example.qa_account_system;

import com.example.qa_account_system.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {}