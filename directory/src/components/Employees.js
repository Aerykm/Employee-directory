import React, { Component } from "react";
import Container from "./Container"
import Row from "./Row";
import Col from "./Col";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Table from "./Table";
import API from "../utils/API";

class Employees extends Component {
    state = {
        result: [],
        filteredResult: [],
        search: "",
        order: true
    };

    componentDidMount() {
        API.getUsers().then((res) => {
            this.setState({ result: res.data.results, filteredResult: res.data.results })
        }).catch((err) => { console.log(err); })
    }

    formatDate(date) {
        let dob = new Date(date);
        let month = dob.getMonth() + 1;
        let day = dob.getDate();
        let year = dob.getFullYear();

        return [month, day, year].join("/");
    }

    handleSortNames() {
        if (this.state.order) {
            this.setState({ order: false })
        } else {
            this.setState({ order: true })
        }

        const compareNames = (a, b) => {
            let nameA = a.name.first.toLowerCase();
            let nameB = b.name.first.toLowerCase();

            if (!this.state.order) {
                return nameB.localeCompare(nameA)
            } else {
                return nameA.localeCompare(nameB)
            }
        }
        const sortedNames = this.state.filteredResult.sort(compareNames)
        this.setState({ filteredResult: sortedNames })
    }

    handleSortPhone() {
        if (this.state.order) {
            this.setState({ order: false })
        } else {
            this.setState({ order: true })
        }

        const comparePhone = (a, b) => {
            let phoneA = a.phone;
            let phoneB = b.phone;

            if (!this.state.order) {
                if (phoneA < phoneB) {
                    return 1
                } else {
                    return -1
                }
            } else {
                if (phoneA < phoneB) {
                    return -1
                } else {
                    return 1
                }
            }
        }
        const sortedPhones = this.state.filteredResult.sort(comparePhone)
        this.setState({ filteredResult: sortedPhones })
    }

    handleInputChange = (event) => {
        const typed = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: typed });
        const updatedList = this.state.result.filter((name) => {
            let fullName = Object.values(name).join("").toLocaleLowerCase();
            return fullName.indexOf(typed.toLowerCase()) !== -1;
        })
        this.setState({ filteredResult: updatedList });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <Header heading="Directory of employees" instructions="Use the search bar to look up a person's name, phone number, or email. Feel free to sort the table by clicking either of the buttons." />
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                        <SearchForm value={this.state.search} handleInputChange={this.handleInputChange} />
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                        <table className="table">
                            <tbody className="table-body">
                                <tr>
                                    <th>Picture</th>
                                    <th><button onClick={() => {
                                        return this.handleSortNames()
                                    }}>Name</button></th>
                                    <th><button onClick={() => {
                                        return this.handleSortPhone()
                                    }}>Phone</button></th>
                                    <th>Email</th>
                                    <th>DOB</th>
                                </tr>
                                {
                                    this.state.filteredResult.map((employee) => {
                                        return <Table alt="Photo of Employee" src={employee.picture.thumbnail} name={employee.name.first.concat(" ", employee.name.last)} phone={employee.phone} email={employee.email} dob={this.formatDate(employee.dob.date)} />
                                    })
                                }
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Employees;