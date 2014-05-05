# balance-server
  
  *The server and frontend for the balance ball game project for SFPC final.*

  It allows anyone to controll the balance ball game (simply servo on arduino...) from practically anywhere with internet connection.
  This app sets up the server and frontend for mobile users, and uses device's acceleration to tilt like a seesaw.

  At final event for SFPC, I called up a friend in Portland from NYC, and have him played the game by video skyping :)

  Simultaneously You need run `balance-arduino-client`.
  It will be responsible for recieving the tilt infomation from this app and reflecting the change on arduino's servo.

## Installation

    # This app requires you have node 0.11.11 installed.
    # Install node version manager `n` if you don't have one
    $ npm install n --global && n 0.11.11

    $ npm install .

### Running an app

#### On local

    $ make serve

    $ cd /path/to/balance-arduino-client
    $ make serve

#### On server

    # Start with forever default PORT set to 4100
    $ make start
    
    $ cd /path/to/balance-arduino-client
    # Point the end point using `SOCKET_HOST` env.
    $ SOCKET_HOST=http://example.com:4100 make serve

## LICENSE
  MIT
