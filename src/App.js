//import logo from './logo.svg';
import './App.css';
import React, { /* useCallback , */ useRef, useEffect } from 'react';
import videojs from 'video.js'
import { Fabric, CompoundButton, DetailsList, SelectionMode, Stack, Checkbox, CommandBarButton, Link, Text } from '@fluentui/react'
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons(/* optional base url */);

function App() {

  const [moments, setMoments] = React.useState([])
  const [state, setState] = React.useState({ current_idx: null, inputs: {} })

  /*
    const video_ref = useCallback(node => {
      if (node !== null) {
        videojs(node, {
          autoplay: true,
          controls: true//,
          // sources: [{
          //   src: '/video/mp4/out-test-2020-11-05_18-30-30.mp4',
          //   type: 'video/mp4'
          //  }]
        }, function onPlayerReady() {
          console.log('onPlayerReady', this)
        })
      }
    }, [])
  */

  const video_ref = useRef(null)
  useEffect(() => {
    console.log(`initialising videojs on ${video_ref.current}`)
    let mPlayer = videojs(video_ref.current, {
      autoplay: true,
      controls: true,
      aspectRatio: '4:3'
      //,
      // sources: [{
      //   src: '/video/mp4/out-test-2020-11-05_18-30-30.mp4',
      //   type: 'video/mp4'
      //  }]
    }, function onPlayerReady() {
      console.log('onPlayerReady', this)
    })

    return () => {
      mPlayer.dispose()
    }

  }, [video_ref])

  function getMovements() {

    fetch("/api/movements")
      .then(res => res.json())
      .then(
        (result) => {
          setMoments(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.warn(error)
        }
      )
  }
  useEffect(getMovements, [])

  function _onItemInvoked(e, idx) {
    if (idx !== state.current_idx && e.video) {
      setState({ current_idx: idx, inputs: { ...state.inputs, [idx]: { reviewed: true } } })
      //setMoments([...moments.slice(0, idx), { ...moments[idx], reviewed: true }, ...moments.slice(idx + 1)])
      let mPlayer = videojs(video_ref.current)
      if (mPlayer.src() !== `/video/${e.video.file}`) {
        mPlayer.src({ type: "video/mp4", src: `/video/${e.video.file}` })
      }
      mPlayer.currentTime(Math.max(0, e.video.index - 4)) // 4 seconds before moments
      mPlayer.play()
      //console.log(mPlayer.remainingTime())
      //if (mPlayer.remainingTime() < e.duration + 4) {
      //  alert('movement goes onto the next file')
      //}
      console.log(e)
    }
  }

  function reset() {
    setState({ current_idx: null, inputs: {} })
  }

  function process() {
    const body = JSON.stringify(Object.keys(state.inputs).map((i) => { return { ...moments[i], ...state.inputs[i] } }))

    fetch('/api/movements', {
      body,
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'content-length': Buffer.byteLength(body)
      }
    }).then(async (res) => {
      if (!res.ok) {
        console.error(`non 200 err : ${res.status}`)
      } else if (res.status === 201) {
        //window.location.reload(true)
        getMovements()
        setState({ current_idx: null, inputs: {} })
      } else {
        console.error(`non 200 err : ${res.status}`)
      }
    }, err => {
      console.error(`err : ${err}`)
    })
  }

  return (
    <Fabric>
      <main id="mainContent" data-grid="container">

        <nav className="header">
          <a href="" className="logo">Home Surveillance</a>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" for="menu-btn"><span className="navicon"></span></label>
          <ul className="menu">
            <li><a href="#work">CCTV</a></li>
            <li><a href="#about">Network</a></li>
            <li><a href="#contact">Other</a></li>
          </ul>
        </nav>

        <div style={{ "height": "43px", "width": "100%" }} />

        <Stack horizontal wrap >

          <Stack.Item styles={{ root: { width: "700px" } }} grow={1}>
            <video ref={video_ref} className="video-js vjs-default-skin" width="640" height="268" />
            <div>{state.current_idx ? `${moments[state.current_idx].video.file} (${moments[state.current_idx].video.index})` : ""}</div>
          </Stack.Item>


          <Stack.Item styles={{ root: { width: "300px" } }} grow={1}>
            <DetailsList
              items={moments}
              compact={false}
              listProps={state}
              columns={[
                {
                  name: "Reviewed Movement (seconds)", key: "start", minWidth: 200, maxWidth: 200, onRender: (i, idx) => {
                    console.log(`rendering ${idx} - input ${state.inputs[idx]}`)
                    return <Checkbox label={`${i.start} (${i.duration})`} checked={state.inputs[idx] ? state.inputs[idx].reviewed : false} disabled />
                  }
                },
                {
                  name: "Save", key: "stat", minWidth: 80, maxWidth: 80, onRender: (i, idx) => {
                    return <div> <Checkbox checked={state.inputs[idx] ? state.inputs[idx].save : false} onChange={(e, val) => setState({ current_idx: idx, inputs: { ...state.inputs, [idx]: { reviewed: true, save: val } } })} /> </div>
                  }
                }
              ]}
              selectionMode={SelectionMode.single}
              isHeaderVisible={true}
              onActiveItemChanged={_onItemInvoked}
            />
            <CompoundButton primary secondaryText="they will not appear again" onClick={process} style={{ "marginTop": 10, "marginLeft": 50 }}>Record Reviews</CompoundButton>
            <CompoundButton secondaryText="clear your reviews" onClick={reset} style={{ "marginTop": 10, "marginLeft": 50 }}>Reset</CompoundButton>
          </Stack.Item>


        </Stack>
      </main>
    </Fabric >
  );
}

export default App;
