'use client'
import Layout from '@/components/layout'
import { TreeItem } from '@sanity/ui'
import Matter from 'matter-js'
import { useEffect, useRef } from 'react'

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
      Bodies = Matter.Bodies

    // create engine
    var engine = Engine.create(),
      world = engine.world

    // create renderer
    var render = Render.create({
      element: box.current,
      canvas: canvas.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        showAngleIndicator: false,
        wireframes: false,
        background: 'white',
      },
    })

    Render.run(render)

    // create runner
    var runner = Runner.create()
    Runner.run(runner, engine)

    world.bodies = []

    // these static walls will not be rendered in this sprites example, see options
    Composite.add(world, [
      Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + 30,
        window.innerWidth,
        60,
        {
          isStatic: true,
          label: 'Ground',
        },
      ),
      Bodies.rectangle(
        -30,
        window.innerHeight / 2,
        60,
        window.innerHeight * 3,
        {
          isStatic: true,
          label: 'Wall Left',
        },
      ),
      Bodies.rectangle(
        window.innerWidth + 30,
        window.innerHeight / 2,
        60,
        window.innerHeight * 3,
        {
          isStatic: true,
          label: 'Wall Right',
        },
      ),
    ])

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
          Composites.stack(window.innerWidth / 6, -300, 1, 1, 10, 10, function (
            x,
            y,
          ) {
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
          }),
          Composites.stack(
            window.innerWidth - window.innerWidth / 5,
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
          Composites.stack(window.innerWidth / 6, -100, 1, 1, 10, 10, function (
            x,
            y,
          ) {
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
          }),
          Composites.stack(
            window.innerWidth - window.innerWidth / 5,
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
            window.innerWidth / 6 + 80,
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
            window.innerWidth - window.innerWidth / 3 + 80,
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
            window.innerWidth / 6 + 80,
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
            window.innerWidth - window.innerWidth / 3 + 80,
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
            window.innerWidth / 6 + 80 * id,
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
            window.innerWidth - window.innerWidth + 80 * id,
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
            window.innerWidth / 6 + 80 * id,
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
            window.innerWidth - window.innerWidth + 80 * id,
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
            window.innerWidth / 6 + 80 * id,
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
            window.innerWidth - window.innerWidth + 80 * id,
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
            window.innerWidth / 6 + 80 * id,
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
            window.innerWidth - window.innerWidth + 80 * id,
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
            window.innerWidth / 6 + 80 * id,
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
            window.innerWidth - window.innerWidth + 80 * id,
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
            window.innerWidth / 6 + 80 * id,
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
            window.innerWidth - window.innerWidth + 80 * id,
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
            window.innerWidth / 6 + 80 * id,
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
            window.innerWidth - window.innerWidth + 80 * id,
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
            window.innerWidth / 6 + 80 * id,
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
            window.innerWidth - window.innerWidth + 80 * id,
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
  }, [])
  return (
    <Layout>
      <div ref={box} className="w-full h-full">
        <canvas ref={canvas} className="w-full h-full" />
      </div>
    </Layout>
  )
}

export default AnimationPage
