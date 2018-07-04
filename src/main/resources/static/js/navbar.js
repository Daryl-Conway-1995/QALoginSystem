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
        this.setState({ delete: true });
        var self = this;
        $.ajax({
            "url": "http://localhost:8080/app/delete",
            type: 'DELETE',
            data: JSON.stringify(self.props.employee),
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "c7bb89b4-2b6c-3cdb-cd22-86fdba25c43c"
            },
            "processData": false,
            success: function(result) {

            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    },
    render: function() {
        if (this.state.delete) return null;
        else return (
            <tr>
                <td>{this.props.employee.firstName} </td>
                <td>{this.props.employee.lastName} </td>
                <td>{this.props.employee.userName} </td>
                <td>
                    <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        );
    }
});

const EmployeeTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.employees.forEach(function (employee) {
            rows.push(<Employee employee={employee}/>);
        });
        return (
            <div className="container">
                <br/>
                <br/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>First Name </th>
                        <th>Last Name </th>
                        <th>userName </th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>);
    }
});

var UserDetails = React.createClass({

    loadEmployeesFromServer: function () {
        const self = this;
        $.ajax({
            url: "http://localhost:8080/app/all"
        }).then(function (data) {
            self.setState({employees: data});
        });
    },

    getInitialState: function () {
        return {employees: []};
    },

    componentDidMount: function () {
        this.loadEmployeesFromServer();
    },
    componentWillMount: function () {
        this.loadEmployeesFromServer();
    },

    statics: {
        update: function() {
            self.loadEmployeesFromServer();
            this.render();
        }
    },

    render() {
        console.log(this.state.employees);
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
    fNameChange: function(e) {
        this.setState({
            firstName: e.target.value
        })
    },
    lNameChange: function(e) {
        this.setState({
            lastName: e.target.value
        })
    },
    UserNameChange: function(e) {
        this.setState({
            userName: e.target.value
        })
    },
    submit: function (e) {
        e.preventDefault();

        const data = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "userName": this.state.userName,
        };
        var json_Data = JSON.stringify(data);
        console.log(json_Data);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "app/addUser",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "7583589c-5a8a-9fa1-a6c1-cce43c23293d"
            },
            "processData": false,
            "data": json_Data
        }
        console.log(settings);
        $.ajax(settings)
            .done(function(data) {
            })
            .fail(function(jqXhr) {
                console.log(data);
                console.log('failed to register for some reason.');
            });

    },
    render: function (e) {
        return (
            <div className="container">
                <form>
                    <br/>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="inputFName">First Name</label>
                        <input type="text" className="form-control" id="inputFName" placeholder="First name" onChange={this.fNameChange} val={this.state.firstName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLName">Last Name</label>
                        <input type="text" className="form-control" id="inputLName" placeholder="Last name" onChange={this.lNameChange} val={this.state.lastName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputUsername">userName</label>
                        <input type="text" className="form-control" id="inputUserName" placeholder="userName" onChange={this.UserNameChange} val={this.state.userName}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" onClick={this.submit}>Submit</button>
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
