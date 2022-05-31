import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [data, setData] = useState([])

  const getDashboardData = async () => {
    await fetch('/dashboard', {
      method: "GET",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(async (res) => {
      const data = await res.json()
      // console.log(data.reverse())
      if (res.status !== 200) {
        throw new Error(res.error)
      }
      setData(data.reverse())
    }).catch((e) => {
      console.log(e)
    })
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <>
      <div className='container'>
        <div className='centerBox'>
          <div className='leftBox'>
            <ul>
              <li className='leftLink activeLink'><Link to='/dashboard'>Dashboard</Link></li>
              <li className='leftLink'><Link to='/timer'>Time Tracker</Link></li>
              {/* <li className='leftLink'>Timeline</li>
              <li className='leftLink'>Reports</li>
              <li className='leftLink'>Projects</li>
              <li className='leftLink'>Clients</li>
              <li className='leftLink'>Team</li>
              <li className='leftLink'>Download</li>
              <li className='leftLink'>Settings</li>
              <li className='leftLink'>Subscription</li>
              <li className='leftLink'>Pricing</li> */}
            </ul>
          </div>

          <div className='rightBox'>
            <div className='rightCenterBox'>
              <div >
                {
                  data.map((arr) => (
                    <table className='todayWork' key={arr._id}>
                      <thead className='thead'>
                        <tr className='trow'>
                          <td>{arr.date}</td>
                          <td className='tend'>Total:<pre> </pre> <span>{("0" + Math.floor((arr.total / 3600000) % 60)).slice(-2)}:</span>
                            <span>{("0" + Math.floor((arr.total / 60000) % 60)).slice(-2)}:</span>
                            <span>{("0" + Math.floor((arr.total / 1000) % 60)).slice(-2)}</span>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          arr.works.map((dataobj) => (
                            <tr className='trow' key={dataobj.index}>
                              <td className='tindex'>{dataobj.index}</td>
                              <td className='twork'>{dataobj.work}</td>
                              <td className='tend'>
                                <p className='ttime'>
                                  <span>{("0" + Math.floor((dataobj.time / 3600000) % 60)).slice(-2)}:</span>
                                  <span>{("0" + Math.floor((dataobj.time / 60000) % 60)).slice(-2)}:</span>
                                  <span>{("0" + Math.floor((dataobj.time / 1000) % 60)).slice(-2)}</span>
                                </p>
                                <img src="/greenplay.png" alt='play' className='playInWork' />
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard