import React from 'react'
import { useSelector } from 'react-redux'
import './loginhistory.css'

const LoginHistory = () => {

    const logindata = useSelector((state)=>state.loginhistoryreducer.data)

  return (
    <div className='login-history-container'>
        <h2>Login History</h2>
        <table>
            <thead>
                <tr>
                <th>Date</th>
                <th>IP Address</th>
                <th>Browser</th>
                <th>OS</th>
                <th>Device Type</th>
                </tr>
            </thead>
            <tbody>
            {logindata.map((data)=>(
                <tr key={data._id}>
                    <td>{new Date(data.logintime).toLocaleString()}</td>
                    <td>{data.ipAddress}</td>
                    <td>{data.browser}</td>
                    <td>{data.os}</td>
                    <td>{data.devicetype}</td>
                </tr>
            ))}
            </tbody>
        </table>

    </div>
  )
}

export default LoginHistory