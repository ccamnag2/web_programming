import { useEffect, useState } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) {
      return
    }

    // isRunning이 true일 때만 1초마다 seconds를 1 올린다.
    // prev를 쓰면 이전 초를 기준으로 더하므로, interval 안에서도 값이 꼬이지 않는다.
    const timerId = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    // Cleanup: isRunning이 바뀌거나 컴포넌트가 사라질 때 기존 interval을 지운다.
    // 지우지 않으면 Start를 누를 때마다 interval이 겹쳐 초가 빨리 올라간다.
    return () => {
      clearInterval(timerId)
    }
    // Dependency Array가 [isRunning]인 이유:
    // isRunning이 true/false로 바뀔 때만 Effect를 다시 실행해야 interval을 새로 만들거나 멈출 수 있다.
    // seconds를 넣으면 1초마다 Effect가 다시 실행되어 interval이 계속 지워지고 다시 생긴다.
  }, [isRunning])

  function handleStart() {
    // setIsRunning(true)로 State가 바뀐다.
    // State가 바뀌면 React가 Timer를 다시 그려(Re-render) 화면의 Paused를 Running으로 갱신한다.
    setIsRunning(true)
  }

  function handlePause() {
    // setIsRunning(false)로 State가 바뀐다.
    // State가 바뀌면 React가 Timer를 다시 그려(Re-render) 화면의 Running을 Paused로 갱신한다.
    setIsRunning(false)
  }

  function handleReset() {
    // 클릭이라는 사용자 동작에 반응해 seconds만 0으로 바꾼다.
    // isRunning은 건드리지 않아서 Running / Paused 상태는 유지된다.
    setSeconds(0)
  }

  return (
    <section className="timer">
      <h1>Timer</h1>
      <p>{seconds}초</p>
      <p className="timer-status">{isRunning ? 'Running' : 'Paused'}</p>
      <div className="timer-actions">
        <button type="button" onClick={handleStart}>
          Start
        </button>
        <button type="button" onClick={handlePause}>
          Pause
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </section>
  )
}

export default Timer
