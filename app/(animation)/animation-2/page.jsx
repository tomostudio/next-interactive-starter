'use client'
import React, { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import { getRandom } from '@/helpers/getRandom'

const {
  Bodies,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} = Matter

export default function Page() {
  const canvas = useRef(null)
  const world = useRef()
  const engineRef = useRef()
  const runnerRef = useRef()
  const [objectsCount, objectsCountSet] = useState(0)
  const [fps, fpsSet] = useState(0)

  useEffect(() => {
    if (runnerRef.current) {
      Runner.stop(runnerRef.current)
      Engine.clear(engineRef.current)
    }

    createWorld()

    return () => {
      console.log('clear')
      Runner.stop(runnerRef.current)
      Engine.clear(engineRef.current)
    }
  }, [canvas, world])

  const WIDTH = 1000
  const HEIGHT = 700

  function createWorld() {
    const engine = Engine.create()
    engineRef.current = engine
    world.current = engine.world

    console.log('createWorld')

    // create a renderer
    const render = Render.create({
      canvas: canvas.current || undefined,
      engine,
      options: {
        width: WIDTH,
        height: HEIGHT,
        background: '#666',
        showCollisions: false,
        showVelocity: false,
        showAxes: false,
        wireframes: false,
      },
    })

    const wallBorderWidth = 25
    const wallLength = 500

    // walls
    World.add(engine.world, [
      // celling
      // Bodies.rectangle(WIDTH / 2, HEIGHT / 4, wallLength, wallBorderWidth, { isStatic: true }),
      // ground
      Bodies.rectangle(
        WIDTH / 2,
        HEIGHT - HEIGHT / 4,
        wallLength * 0.7,
        wallBorderWidth,
        {
          isStatic: true,
        },
      ),

      // ground 2
      Bodies.rectangle(WIDTH / 2, HEIGHT - 30, WIDTH * 0.9, wallBorderWidth, {
        isStatic: true,
      }),

      Bodies.rectangle(
        WIDTH / 3 + WIDTH / 3,
        HEIGHT - HEIGHT / 2,
        wallBorderWidth,
        wallLength * 0.2,
        {
          isStatic: true,
        },
      ),
      Bodies.rectangle(
        WIDTH / 3,
        HEIGHT - HEIGHT / 2,
        wallBorderWidth,
        wallLength * 0.2,
        {
          isStatic: true,
        },
      ),
    ])

    // MOUSE
    const mouse = Mouse.create(render.canvas)
    render.mouse = mouse
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.5,
        render: {
          visible: true,
        },
      },
    })

    World.add(engine.world, mouseConstraint)

    let mouseIsDragging = false
    let setIntervalId

    Matter.Events.on(mouseConstraint, 'startdrag', () => {
      mouseIsDragging = true
    })
    Matter.Events.on(mouseConstraint, 'enddrag', () => {
      mouseIsDragging = false
    })
    Matter.Events.on(mouseConstraint, 'mousedown', (ev) => {
      if (mouseIsDragging === false) {
        setIntervalId = setInterval(() => {
          createBalls(ev.source.mouse.position)
        }, (1000 / 60) * 3)
      }
    })
    Matter.Events.on(mouseConstraint, 'mouseup', () => {
      clearInterval(setIntervalId)
    })

    //
    //
    // After Update
    //
    //
    Events.on(engine, 'afterUpdate', (ev) => {
      // const time = engine.timing.timestamp
      objectsCountSet(ev.source.world.bodies.length)

      ev.source.world.bodies.forEach((b) => {
        if (b.position.x > WIDTH || b.position.x < 0 || b.position.y > HEIGHT) {
          World.remove(engine.world, b)
        }
      })
      fpsSet(Math.abs(runner.fps))
    })

    function createBalls(positionXY) {
      if (!positionXY) {
        return
      }

      World.add(
        engine.world,
        Bodies.circle(
          positionXY.x + getRandom(15) || WIDTH / 2,
          positionXY.y + getRandom(15) || HEIGHT / 2,
          30 * Math.random() + 10,
          { restitution: 0.7 },
        ),
      )
    }

    createBalls()

    Render.run(render)

    // create runner
    const runner = Runner.create()
    runnerRef.current = runner
    // run the engine
    Runner.run(runner, engine)

    // add To Global
    window.Matter = Matter
    window.engine = engine
    window.runner = runner
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas className="bg-gray-700" ref={canvas} />
      <div className="mx-3 border select-none border-indigo-600p-3">
        bodies count: {objectsCount}
      </div>
      <div className="mx-3 border select-none border-indigo-600p-3">
        fps: {fps}
      </div>
    </div>
  )
}
