var NavigationBar = React.createClass({
    getInitialState: function() {
        return {display: true };
    },
    AddAccounts() {
        ReactDOM.render(
            <inputUser/>, document.getElementById("body")
        );
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
                            <a className="nav-link" href="#">Dashboard </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Accounts
                            </a>
                            <div className="dropdown-menu bg-primary" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" onClick={this.AddAccounts} href="#">Add acount</a>
                                <a className="dropdown-item" href="#">View accounts</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
});

const Dashboard = React.createClass({
    render: function () {
        return (
            <h1 style={{textAlign:"center"}}>Welcome to the Dashboard</h1>
        );
    }
});

const inputUser = React.createClass({
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
