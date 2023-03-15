'use client'
import Layout from '@/components/layout'
import { TreeItem } from '@sanity/ui'
import Matter from 'matter-js'
import { useEffect, useRef, useState } from 'react'

const AnimationPage = () => {
  const canvas = useRef()
  const box = useRef()

  useEffect(() => {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composites = Matter.Composites,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies,
      Vector = Matter.Vector,
      Body = Matter.Body

    // create engine
    var engine = Engine.create(),
      world = engine.world

    // create renderer
    var render = Render.create({
      element: box.current,
      canvas: canvas.current,
      engine: engine,
      options: {
        width: canvas.current.getBoundingClientRect().width,
        height: canvas.current.getBoundingClientRect().height,
        showAngleIndicator: false,
        wireframes: false,
        background: 'white',
      },
    })

    Render.run(render)

    // create runner
    var runner = Runner.create()
    Runner.run(runner, engine)

    // these static walls will not be rendered in this sprites example, see options
    const ground = Bodies.rectangle(
      canvas.current.getBoundingClientRect().width / 2,
      canvas.current.getBoundingClientRect().height + 30,
      canvas.current.getBoundingClientRect().width,
      60,
      {
        isStatic: true,
        label: 'Ground',
      },
    )
    const wallLeft = Bodies.rectangle(
      -30,
      canvas.current.getBoundingClientRect().height / 2,
      60,
      canvas.current.getBoundingClientRect().height * 5,
      {
        isStatic: true,
        label: 'Wall Left',
      },
    )
    const wallRight = Bodies.rectangle(
      canvas.current.getBoundingClientRect().width + 30,
      canvas.current.getBoundingClientRect().height / 2,
      60,
      canvas.current.getBoundingClientRect().height * 5,
      {
        isStatic: true,
        label: 'Wall Right',
      },
    )
    Composite.add(world, [ground, wallLeft, wallRight])

    const assets = [
      'Graphic_Element_Morin_apricot 1.svg',
      'Graphic_Element_Morin_apricot 2.svg',
      'Graphic_Element_Morin_blueberry 1.svg',
      'Graphic_Element_Morin_blueberry 2.svg',
      'Graphic_Element_Morin_orange 1.svg',
      'Graphic_Element_Morin_orange 2.svg',
      'Graphic_Element_Morin_orange 3.svg',
      'Graphic_Element_Morin_orange 4.svg',
      'Graphic_Element_Morin_raspberry 1.svg',
      'Graphic_Element_Morin_raspberry 2.svg',
    ]

    let stack = []

    assets.forEach((data, id) => {
      if (id === 0) {
        stack.push(
          Composites.stack(
            canvas.current.getBoundingClientRect().width / 6,
            -300,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width -
              canvas.current.getBoundingClientRect().width / 5,
            -200,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width / 6,
            -100,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width -
              canvas.current.getBoundingClientRect().width / 5,
            -300,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
        )
      } else if (id === 1) {
        stack.push(
          Composites.stack(
            canvas.current.getBoundingClientRect().width / 6 + 80,
            -400,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width -
              canvas.current.getBoundingClientRect().width / 3 +
              80,
            -300,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width / 6 + 80,
            -200,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width -
              canvas.current.getBoundingClientRect().width / 3 +
              80,
            -300,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
        )
      } else if (
        data === 'Graphic_Element_Morin_orange 3.svg' ||
        data === 'Graphic_Element_Morin_orange 4.svg'
      ) {
        stack.push(
          Composites.stack(
            canvas.current.getBoundingClientRect().width / 6 + 80 * id,
            -500,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width -
              canvas.current.getBoundingClientRect().width +
              80 * id,
            -400,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width / 6 + 80 * id,
            -300,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width -
              canvas.current.getBoundingClientRect().width +
              80 * id,
            -300,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
        )
      } else if (data === 'Graphic_Element_Morin_orange 1.svg') {
        stack.push(
          Composites.stack(
            canvas.current.getBoundingClientRect().width / 6 + 80 * id,
            -500,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 100, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width -
              canvas.current.getBoundingClientRect().width +
              80 * id,
            -400,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 100, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width / 6 + 80 * id,
            -300,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 100, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width -
              canvas.current.getBoundingClientRect().width +
              80 * id,
            -300,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 100, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
        )
      } else if (data === 'Graphic_Element_Morin_orange 2.svg') {
        stack.push(
          Composites.stack(
            canvas.current.getBoundingClientRect().width / 6 + 80 * id,
            -500,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 115, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width -
              canvas.current.getBoundingClientRect().width +
              80 * id,
            -400,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 115, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width / 6 + 80 * id,
            -300,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 115, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width -
              canvas.current.getBoundingClientRect().width +
              80 * id,
            -300,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 115, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
        )
      } else {
        stack.push(
          Composites.stack(
            canvas.current.getBoundingClientRect().width / 6 + 80 * id,
            -500,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width -
              canvas.current.getBoundingClientRect().width +
              80 * id,
            -400,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width / 6 + 80 * id,
            -300,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
          Composites.stack(
            canvas.current.getBoundingClientRect().width -
              canvas.current.getBoundingClientRect().width +
              80 * id,
            -300,
            1,
            1,
            10,
            10,
            function (x, y) {
              return Bodies.circle(x, y, 90, {
                render: {
                  strokeStyle: '#ffffff',
                  sprite: {
                    texture: `./assets/animation-1/${data}`,
                    xScale: 2,
                    yScale: 2,
                  },
                },
              })
            },
          ),
        )
      }
    })

    stack.forEach((data) => {
      Composite.add(world, [data])
    })

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      })

    Composite.add(world, mouseConstraint)

    // keep the mouse in sync with rendering
    render.mouse = mouse

    window.addEventListener('resize', () => {
      setTimeout(() => {
        render.canvas.width = canvas.current.getBoundingClientRect().width
        render.canvas.height = canvas.current.getBoundingClientRect().height

        Body.setPosition(
          ground,
          Vector.create(
            canvas.current.getBoundingClientRect().width / 2,
            canvas.current.getBoundingClientRect().height + 30,
          ),
        )
        Body.setPosition(
          wallLeft,
          Vector.create(-30, canvas.current.getBoundingClientRect().height / 2),
        )
        Body.setPosition(
          wallRight,
          Vector.create(
            canvas.current.getBoundingClientRect().width + 30,
            canvas.current.getBoundingClientRect().height / 2,
          ),
        )
      }, 10)
    })
  }, [])
  return (
    <Layout>
      <div ref={box} className="w-screen h-screen">
        <canvas ref={canvas} className="w-full h-full" />
      </div>
    </Layout>
  )
}

export default AnimationPage
