#import libary's
import RPi.GPIO as GPIO
import time
import sys
import os
from subprocess import Popen
import uinput

#set inputs and outputs
# GPIO 17, 22, 27, 23, 18
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(17,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(18,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(22,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(23,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(27,GPIO.IN, pull_up_down=GPIO.PUD_UP)

#wrap streams

#stream4 = ("rtsp://admin:pass@192.168.1.203:1024/streaming/channels/2")

#set Boolean variables (sort of start value)

player = False

last_state1 = True
last_state2 = True
last_state3 = True
last_state4 = True
last_state5 = True

input_state1 = True
input_state2 = True
input_state3 = True
input_state4 = True
input_state5 = True

eind = True

#shut down the display

#os.system('sudo echo 1 > /sys/class/backlight/rpi_backlight/bl_power')
events = (
        uinput.KEY_UP,
        uinput.KEY_DOWN,
        uinput.KEY_LEFT,
        uinput.KEY_RIGHT,
        uinput.KEY_ENTER
        )         
count = 0
#begin loop

while True:
    #Read states of inputs
    input_state1 = GPIO.input(17)
    input_state2 = GPIO.input(18)
    input_state3 = GPIO.input(22)
    input_state4 = GPIO.input(23)
    input_state5 = GPIO.input(27)

    #If GPIO(4) is shorted to ground

    if input_state1 != last_state1:
#        count = count + 1
#        print(input_state1, " " , count)
        if (player and not input_state1):
            player = False
        elif not input_state1:
       #     time.sleep(0.8)
            last_state1 = True
            os.system('echo "button GPIO17"')
            with uinput.Device(events) as device:
                time.sleep(0.5) # This is required here only for demonstration
                device.emit_click(uinput.KEY_UP)
            player = False


#   If GPIO(22) is shorted to ground
    if input_state2 != last_state2:
        if (player and not input_state2):
            player = False 
        elif not input_state2:
#            time.sleep(0.8)
            last_state2 = True
            os.system('echo "button GPIO18"')
            player = True
            with uinput.Device(events) as device:
                time.sleep(0.5) # This is required here only for demonstration
                device.emit_click(uinput.KEY_DOWN)
            player = False

#   If GPIO(22) is shorted to ground
    if input_state3 != last_state3:
        if (player and not input_state3):
            player = False
        elif not input_state3:
 #           time.sleep(0.8)
            last_state3 = True
            os.system('echo "button GPIO22"')
            player = True
            with uinput.Device(events) as device:
                time.sleep(0.5) # This is required here only for demonstration
                device.emit_click(uinput.KEY_RIGHT)
            player = False

#   If GPIO(22) is shorted to ground
    if input_state4 != last_state4:
        if (player and not input_state4):
            player = False
        elif not input_state4:
 #           time.sleep(0.8)
            last_state4 = True
            os.system('echo "button GPIO23"')
            with uinput.Device(events) as device:
                time.sleep(0.5) # This is required here only for demonstration
                device.emit_click(uinput.KEY_LEFT)
            player = False
            player = True

    if input_state5 != last_state5:
        if (player and not input_state5):
            player = False
        elif not input_state5:
  #          time.sleep(0.8)
            last_state5 = True
            os.system('echo "Button GPIO 27"')
            player = True
            with uinput.Device(events) as device:
                time.sleep(0.5) # This is required here only for demonstration
                device.emit_click(uinput.KEY_ENTER)

    if input_state4 != last_state4 and input_state2 != last_state2:
            os.system('echo "4 and 2"')
            last_state4 = True 
            last_state2 = True
    #If omxplayer is running and GPIO(17) is shorted to ground (poweroff)
 #   if input_state2 != last_state2:
 #       os.system('sudo poweroff')

 #   #Set last_input states
 #   last_state1 = input_state1
 #   last_state2 = input_state2
