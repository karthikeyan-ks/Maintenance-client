import React, { useEffect, useState } from "react";
import "./existing.css"
import { useWebSocket } from "./WebSocketContext";
function Existing() {

    const websocket = useWebSocket()
    const data = [
        {
            name: "Activity 1",
            descritpion: "contains the description about the activty 1",
            id: 1
        },
    ]
    const [datalist, setDataList] = useState(data)
    useEffect(() => {
        if (websocket) {
            websocket.onmessage=(eve)=>{
                console.log(eve.data)
            }
            console.log(websocket.OPEN)
            websocket.onopen=(eve)=>{
                console.log("connection estalished in existing")
                websocket.send(JSON.stringify({
                    query:"activity",
                    page:"existing"
                }))
            }
        }
    }, [websocket])
   
    useEffect(() => {
        if(websocket){
            if(websocket.readyState===websocket.OPEN){
                console.log("fetching data")
                websocket.send(JSON.stringify({
                    query:"existing activity",
                    page:"existing"
                }))
            }
        }
        const dataView1 = datalist.map(element =>
            <div className='list-group-it' key={"1" + element.id}>
                <div className="container divsep" key={"2" + element.id}>
                    <div className="header" key={"3" + element.id}>
                        <h4 key={"4" + element.id}>{element.name}</h4>
                        <scan key={"5" + element.id}>{element.id}</scan>
                    </div>
                    <div className="body" key={"6" + element.id}>{element.descritpion}</div>
                    <div className="footer" key={"7" + element.id}>
                        footer1
                    </div>
                </div>
            </div>
        )
        setList(dataView1)
    }, [datalist])


    const [list, setList] = useState([])
    return (<div className="container-fluid">
        <body data-spy="scroll" className='listexisting'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i&display=swap"></link>
            <h3 className=''>Existing activity</h3>
            <div className="col-sm-10 dropdown-content">
                <input type="search" className="search" rows={5} id="pwd" placeholder="search activity" onChange={(event) => {
                    console.log(event.target.value)
                    let newData = []
                    datalist.forEach(element => {
                        console.log(element.name, element.name.includes(event.target.value))
                        if (element.name.includes(event.target.value)) {
                            newData.push(element)
                        }
                    });
                    console.log(newData)
                    if (event.target.value.length !== 0)
                        setDataList(newData)
                    else
                        setDataList(data)
                    console.log(list)
                    const dataView = data.map(element =>
                        <div className='list-group-it' key={"1" + element.id}>
                            <div className="container divsep" key={"2" + element.id}>
                                <div className="header" key={"3" + element.id}>
                                    <h4 key={"4" + element.id}>{element.name}</h4>
                                    <scan key={"5" + element.id}>{element.id}</scan>
                                </div>
                                <div className="body" key={"6" + element.id}>{element.descritpion}</div>
                                <div className="footer" key={"7" + element.id}>
                                    footer
                                </div>
                            </div>
                        </div>
                    )
                    setList(dataView)
                }} />
            </div>
            <ul className='list-group space'>
                {list}
            </ul>
        </body>

    </div >)
}
export default Existing