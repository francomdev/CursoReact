import { useState, useEffect } from "react"

function FollowMouse() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  
  useEffect(() => {
    const handleMove = (event) => {
      const {clientX, clientY} = event
      setPosition({x: clientX, y: clientY})
    }
    if (enabled){
      window.addEventListener('pointermove', handleMove)
    }
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  return (
    <section>
    <div style={{
      position: 'absolute',
      backgroundColor: '#09f',
      borderRadius: '50%',
      opacity: 0.8,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width:40,
      height:40,
      transform: `translate(${position.x}px, ${position.y}px)`
    }}></div>
    <button onClick={() => setEnabled(!enabled)}>{enabled ? 'Desactivar' : 'Activar'}</button>
    </section>
  )
  
}

function App() {
  const [toggle, setToggle] = useState(false)
  
  return (
    <main>
      { toggle && <FollowMouse />}
      <button onClick={() => setToggle(!toggle)}>Mostrar seguimiento de mouse</button>
    </main>
  )
}

export default App
