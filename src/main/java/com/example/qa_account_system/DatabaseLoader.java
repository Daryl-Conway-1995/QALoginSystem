package com.example.qa_account_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final EmployeeRepository repository;

    @Autowired
    public DatabaseLoader(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Employee("Daryl", "Conway", "Creator"));
        this.repository.save(new Employee("literally", "anyone",  "user3854"));
        this.repository.save(new Employee("Crystal", "maize", "notrunning"));
        this.repository.save(new Employee("James", "blond", "00seven"));
    }
}