package com.example.qa_account_system.database_files;

import com.example.qa_account_system.database_files.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {}