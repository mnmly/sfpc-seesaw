# sfpc-seesaw
  
  *The server and frontend for a seesaw project for SFPC final.*

  It allows anyone to controll the seesaw game (simply servo on arduino...) from practically anywhere with internet connection.
  This app sets up the server and frontend for mobile users, and uses device's acceleration to tilt like a seesaw.

  At final event for SFPC in NYC, I skyped a friend in Portland and have him played the game while taking a video of seesaw so he can see it :)

  Use in combination with [sfpc-seesaw-arduino](https://github.com/mnmly/sfpc-seesaw-arduino),
  which will be responsible for recieving the tilt infomation from this app and reflecting the change on arduino's servo.
  
  
  ![](http://c.mnmly.com/Ve5d/diagram.gif)
  [![](http://c.mnmly.com/VMaR/Image%202014-05-05%20at%2010.48.08%20PM.png)](https://vimeo.com/94125713)
  ![](http://c.mnmly.com/VNNe/controller.png)

## Installation

    # This app requires you have node 0.11.11 installed.
    # Install node version manager `n` if you don't have one
    $ npm install n --global && n 0.11.11

    $ npm install .

### Running an app

#### On local

    $ make serve

    $ cd /path/to/sfpc-seesaw-arduino
    $ make serve

#### On server

    # Start with forever default PORT set to 4100
    $ make start
    
    $ cd /path/to/sfpc-seesaw-arduino
    # Point the end point using `SOCKET_HOST` env.
    $ SOCKET_HOST=http://example.com:4100 make serve

## LICENSE
  MIT
