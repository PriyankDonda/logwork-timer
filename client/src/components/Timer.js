import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Timer() {

  const [totalTime, setTotalTime] = useState(0)
  const [action, setAction] = useState('play')
  const [work, setWork] = useState('')
  const [workTime, setWorkTime] = useState(0)
  const [data, setData] = useState([])
  const [secondTime, setSecondTime] = useState(false)
  const [tempIndex, setTempIndex] = useState(0)

  const getTodayData = async () => {
    await fetch('/today', {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ date: "" + new Date().toJSON().slice(0, 10).replace(/-/g, '/'), total: totalTime, works: data })
    }).then(async (res) => {
      const data = await res.json()
      console.log(data)
      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.error)
      }
      setTotalTime(data.total)
      setData(data.works)
    }).catch((e) => {
      console.log(e)
    })
  }

  useEffect(() => {
    getTodayData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    let interval = null

    if (action === 'pause') {
      interval = setInterval(() => {
        setWorkTime(prevTime => prevTime + 1000)
        setTotalTime(prevTime => prevTime + 1000)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [action])

  const startTimer = (uindex, uwork, utime) => {
    if (work === '') {
      if (uwork) {
        setWork(uwork)
        setWorkTime(utime)
        setTempIndex(uindex)
        setSecondTime(true)
      } else {
        return alert('Please write down the work first then start timer!')
      }
    }
    // else {
      setAction('pause')
      document.querySelector(':root').style.setProperty('--green', '#DC3545')
      document.querySelector(':root').style.setProperty('--bgGreen', '#e187903f')
    // }
  }

  const stopTimer = async () => {
    setAction('play')
    document.querySelector(':root').style.setProperty('--green', '#23A127')
    document.querySelector(':root').style.setProperty('--bgGreen', '#9bfb9e2e')

    if (!secondTime) {
      const obj = {
        index: data.length + 1,
        work: work,
        time: workTime
      }

      // setWorkTime(0)
      // setWork('')

      await setData([...data, obj])
      // console.log(data)

      await fetch('/today', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ date: "" + new Date().toJSON().slice(0, 10).replace(/-/g, '/'), total: totalTime, works: obj })
      }).then(async (res) => {
        // const resdata = await res.json()
        // console.log(resdata)
      }).catch((e) => {
        console.log('error : ', e)
      })
    } else {
      const tempwork = work
      const temptime = workTime

      await fetch(`/today/${tempIndex}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ date: "" + new Date().toJSON().slice(0, 10).replace(/-/g, '/'), total: totalTime, work: tempwork, time: temptime })
      }).then(async (res) => {
        // const resdata = await res.json()
        // console.log(resdata)
      }).catch((e) => {
        console.log('error : ', e)
      })
      setSecondTime(false)
    }
    setWorkTime(0)
    setWork('')
    getTodayData()
  }

  return (
    <>
      <div className='container'>
        <div className='centerBox'>
          <div className='leftBox'>
            <ul>
              <li className='leftLink'><Link to='/dashboard'>Dashboard</Link></li>
              <li className='leftLink activeLink'><Link to='/timer'>Time Tracker</Link></li>
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
                <p>WORKED TODAY: </p>
                <div className='todayTotal'>
                  <span>{("0" + Math.floor((totalTime / 3600000) % 60)).slice(-2)}:</span>
                  <span>{("0" + Math.floor((totalTime / 60000) % 60)).slice(-2)}:</span>
                  <span>{("0" + Math.floor((totalTime / 1000) % 60)).slice(-2)}</span>
                </div>
              </div>

              <div >
                <input className='workInput' placeholder='What are you working on?' value={work} onChange={(e) => setWork(e.target.value)} />
                {
                  action === 'play' ?
                    <img src="/greenplay.png" alt='play' className='playPause' onClick={() => startTimer()} />
                    :
                    <>
                      <img src="/redpause.png" alt='pause' className='playPause' onClick={() => stopTimer()} />
                      <span id='currWorkTime'>
                        <span>{("0" + Math.floor((workTime / 3600000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((workTime / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((workTime / 1000) % 60)).slice(-2)}</span>
                      </span>
                    </>
                }
              </div>

              <div >
                <table className='todayWork'>
                  <tbody>
                    {
                      data.map((dataobj) => (
                        <tr className='trow' key={dataobj.index}>
                          <td className='tindex'>{dataobj.index}</td>
                          <td className='twork'>{dataobj.work}</td>
                          <td className='tend'>
                            <p className='ttime'>
                              <span>{("0" + Math.floor((dataobj.time / 3600000) % 60)).slice(-2)}:</span>
                              <span>{("0" + Math.floor((dataobj.time / 60000) % 60)).slice(-2)}:</span>
                              <span>{("0" + Math.floor((dataobj.time / 1000) % 60)).slice(-2)}</span>
                            </p>
                            <img src="/greenplay.png" alt='play' className='playInWork' onClick={() => {  startTimer(dataobj.index, dataobj.work, dataobj.time) }} />
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Timer