import { Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import './App.css'
import './Create.css'
import { useWebSocket } from "./WebSocketContext";
function Create() {
    const [show, setShow] = useState(false);
    const [send, setSend] = useState(false)
    const [component, setComponent] = useState(<div></div>)
    const [schedule, setSchedule] = useState([])
    const [machine, setMachine] = useState([])
    const handleClose = () => {
        setShow(false)
        setSend(true)
    };
    const handleShow = () => setShow(true);
    const websocket = useWebSocket()
    useEffect(() => {
        if (websocket) {
            websocket.addEventListener('message', (event) => {
                var data = JSON.parse(event.data)
                if (data.page === "create") {
                    if (data.type === "machine") {
                        var array = []
                        for (let key in data) {
                            let value = data[key].machine_name
                            if (typeof (value) !== 'undefined')
                                array.push(<option key={key} value={data[key].machine_id}>{value}</option>)
                        }
                        setMachine(array)
                    } else if (data.type === "component") {
                        var array = []
                        for (let key in data) {
                            let value = data[key].component_name
                            if (typeof (value) !== 'undefined')
                                array.push(<option key={key} value={data[key].component_id}>{value}</option>)
                        }
                        setComponent(array)
                    } else if (data.type === "schedule") {
                        const array = []
                        for (let key in data) {
                            let value = data[key].schedule_name
                            console.log(typeof (value))
                            if (typeof (value) !== 'undefined') {
                                console.log(`Key: ${key}, Value: ${value}`);
                                array.push(<option key={key} value={data[key].schedule_id}>{value}</option>)
                            }
                        }
                        setSchedule(array)
                        console.log("schedule", schedule, array)
                    } else if (data.type === "activity") {
                        console.log(data)
                    }
                }
            })
            websocket.onopen = (eve) => {
                websocket.send(JSON.stringify({
                    query: "component",
                    page: "create"
                }))
                websocket.send(JSON.stringify({
                    query: "machine",
                    page: "create"
                }))
                websocket.send(JSON.stringify({
                    query: "schedule",
                    page: "create"
                }))
            }
        }
    }, [websocket])
    useEffect(() => {
        if (show) {
            document.getElementById("root").style.background = "grey"
            document.getElementById("root").style.filter = "blur(5px)"

        } else {
            document.getElementById("root").style.filter = "none"
            document.getElementById("root").style.background = "white"
        }
    }, [show])
    useEffect(() => {
        if (send) {
            let name = document.getElementById("name").value
            let description = document.getElementById("decription").value
            let machine = document.getElementById("machine").value
            let component = document.getElementById("component").value
            let schedule = document.getElementById("schedule").value
            let user = document.getElementById("user").value
            var uploadJson = {
                page: 'create activity',
                query: 'insert',
                name: name,
                description: description,
                machine_id: machine,
                component_id: component,
                schedule_id: schedule,
                user: user
            }
            console.log(uploadJson)
            websocket.send(JSON.stringify(uploadJson))

        }
        setSend(false)
    }, [send])
    return (
        <div className="container-fluid">
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
            <body data-spy="scroll" data-target="#myScrollspy" data-offset="100" className="content">
                <h1>Create activity</h1>
                <div className="container">
                    <div className="row">
                        <nav className="col-sm-3" id="myScrollspy">
                            <ul className="nav nav-pills nav-stacked">
                                <li><a href="#section1">activity details</a></li>
                                <li><a href="#section2">activity schedule details</a></li>
                                <li><a href="#section3">activity assign details</a></li>
                            </ul>
                        </nav>
                        <div className="col-sm-9 bottom black">
                            <div id="section1">
                                <h3>activity details</h3>
                                <div className="jumbotron content">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="control-label col-sm-2" for="name">activity Name :</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="name" placeholder="Enter activity name" />

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-2" for="decription">activity description :</label>
                                            <div className="col-sm-10">
                                                <textarea className="form-control" rows={5} id="decription" placeholder="enter decription" />
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div id="section2">
                                <h3>activity schedule details</h3>
                                <div className="jumbotron content">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="control-label col-sm-2" for="machine">activity machine  :</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="machine" placeholder="enter machine" list="dataset" />
                                                <datalist id="dataset">
                                                    {machine}
                                                </datalist>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-2" for="pwd">activity component type :</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" rows={5} id="component" placeholder="enter component" list="dataset1" />
                                                <datalist id="dataset1">
                                                    {component}
                                                </datalist>
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-2" for="pwd">actiivity schedule type :</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" rows={5} id="schedule" placeholder="enter schedule type" list="dataset2" />
                                                <datalist id="dataset2">
                                                    {schedule}
                                                </datalist>
                                            </div>

                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div id="section3" className="fix">
                                <h3>Activity assign details</h3>
                                <div className="jumbotron content">
                                    <div className="form-group dropdown">
                                        <label className="control-label col-sm-2" for="user">actiivity schedule type :</label>
                                        <div className="col-sm-10 dropdown-content">
                                            <input type="search" className="form-control" rows={5} id="user" placeholder="search user" />
                                            <a href="a">a</a>
                                            <a href="a">a</a>
                                            <a href="a">a</a>
                                        </div>
                                    </div>
                                </div>
                                <h3>Submit</h3>
                                <p>clicking this button a new activity will be create the assign user will be default for this activity</p>
                                <Button variant="primary" onClick={handleShow}>
                                    create activity
                                </Button>
                                <Modal
                                    style={{ opacity: 1 }}
                                    show={show}
                                    onHide={handleClose}
                                    backdrop="false"
                                    keyboard={false}
                                    size="lg"
                                    fade={false}
                                    className="custom"
                                    fullscreen="true"

                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title><p>activity insertion</p></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="mbody">
                                        I will not close if you click outside me. Do not even try to press
                                        escape key.
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            ok
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>


            </body >

        </div >
    )
}
export default Create