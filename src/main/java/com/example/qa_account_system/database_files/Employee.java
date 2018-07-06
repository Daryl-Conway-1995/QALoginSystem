package com.example.qa_account_system.database_files;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Employee {

    private @Id @GeneratedValue Long id;
    private String firstName;
    private String userName;
    private String lastName;

    private Employee() {}

    public Employee(String firstName, String lastName, String username) {

        this.firstName = firstName;
        this.userName = username;
        this.lastName = lastName;
    }


    //region get methods
//    public String getLastName() {
//        return lastName;
//    }

    public Long getId() {
        return id;
    }

    public String getfName() {
        return firstName;
    }

    public String getUserName() {
        return userName;
    }
    //endregion

    //region set methods
//    public void setLastName(String age) {
//        this.lastName = lastName;
//    }

    public void setfName(String firstName) {
        this.firstName = firstName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
    //endregion


    @Override
    public String toString() {
        return ("id:"+getId() +" name:"+ getfName()+" "+"getLastName()"+" username:"+getUserName());
    }
}