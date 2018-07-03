var NavigationBar = React.createClass({
    getInitialState: function() {
        return {display: true };
    },
    AddAccounts() {

        ReactDOM.render(
            <InputUser/>, document.getElementById("body")
        );
    },
    ShowDashboard() {
        ReactDOM.render(
            <Dashboard/>, document.getElementById("body")
        )
    },
    ShowAccounts() {
        ReactDOM.render(
            <UserDetails/>, document.getElementById("body")
        )
    },
    render: function() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <a className="navbar-brand" href="#">AccountApp</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={this.ShowDashboard}>Dashboard </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Accounts
                            </a>
                            <div className="dropdown-menu bg-primary" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" onClick={this.AddAccounts} href="#">Add acount</a>
                                <a className="dropdown-item" href="#"onClick={this.ShowAccounts}>View accounts</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
});

var Employee = React.createClass({
    getInitialState: function() {
        return {display: true };
    },
    handleDelete() {
        var self = this;
        $.ajax({
            url: self.props.employee._links.self.href,
            type: 'DELETE',
            success: function(result) {
                self.setState({display: false});
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    },
    render: function() {
        if (this.state.display==false) return null;
        else return (
            <tr>
                <td>{this.props.employee.name}</td>
                <td>{this.props.employee.age}</td>
                <td>{this.props.employee.years}</td>
                <td>
                    <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        );
    }
});

var EmployeeTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.employees.forEach(function (employee) {
            rows.push(<Employee employee={employee}/>);
        });
        return (
            <div className="container">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Years</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
});


var UserDetails = React.createClass({

    loadEmployeesFromServer: function () {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/employees"
        }).then(function (data) {
            self.setState({employees: data._embedded.employees});
        });
    },

    getInitialState: function () {
        return {employees: []};
    },

    componentDidMount: function () {
        this.loadEmployeesFromServer();
    },

    render() {
        console.log(this.state.employees)
        return ( <EmployeeTable employees={this.state.employees}/> );
    }
});


const Dashboard = React.createClass({
    render: function () {
        return (
            <h1 style={{textAlign:"center"}}><br/><br/><br/>Welcome, this is a basic user system that allows:<br/> the creation, editing and deletion of user details</h1>
        );
    }
});

const InputUser = React.createClass({
    getInitialState: function() {
        return {}
    },
    render: function () {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="inputFName">First Name</label>
                        <input type="text" className="form-control" id="inputFName" placeholder="First name" onChange={this.nameChange} val={this.state.firstName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLName">Last Name</label>
                        <input type="text" className="form-control" id="inputLName" placeholder="Last name" onChange={this.lastChange} val={this.state.lastName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAccountNum">Account Number</label>
                        <input type="text" className="form-control" id="inputAccountNumber" placeholder="Account Number" onChange={this.accountNumberChange} val={this.state.accountNumber}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
});

const Main = React.createClass({
    render: function () {
        return (
            <div>
                <NavigationBar/>
                <div id="body">
                    <Dashboard/>
                </div>
            </div>
        )
    }
});

ReactDOM.render(<Main/>, document.getElementById('HOME'));
