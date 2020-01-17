#import libary's
import RPi.GPIO as GPIO
import time
import sys
import os
from subprocess import Popen
#import uinput

#set inputs and outputs
# GPIO 4, 17, 22, 23, 24
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(4,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(17,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(22,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(23,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(24,GPIO.IN, pull_up_down=GPIO.PUD_UP)

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
        
count = 0
#begin loop

while True:
    #Read states of inputs
    input_state1 = GPIO.input(4)
    input_state2 = GPIO.input(17)
    input_state3 = GPIO.input(22)
    input_state4 = GPIO.input(23)
    input_state5 = GPIO.input(24)

    #If GPIO(4) is shorted to ground

    if input_state1 != last_state1:
        count = count + 1
        print(input_state1, " " , count)
        if (player and not input_state1):
#            os.system('sudo killall omxplayer.bin')
#            omxc = Popen(['omxplayer', '-b','--win', '0 0 800 480', stream2])
#            os.system('echo "byebye world"')
           # last_state1 = True
           # time.sleep(0.8)
            player = False
        elif not input_state1:
#            omxc = Popen(['omxplayer', '-b','--win', '0 0 800 480', stream2])#start OMXPlayer and immage beginpoint 0 0  and fit to screen resolution 800x840)
            time.sleep(0.8)
            last_state1 = True
#            os.system('sudo echo 0 > /sys/class/backlight/rpi_backlight/bl_power')
            os.system('echo "hello world"')
            #player = True
            player = False


#   If GPIO(22) is shorted to ground
    if input_state2 != last_state2:
        if (player and not input_state2):
#            os.system('sudo killall omxplayer.bin')
#            omxc = Popen(['omxplayer', '-b','--win', '0 0 800 480', stream4])
            player = False 
        elif not input_state2:
#            omxc = Popen(['omxplayer', '-b','--win', '0 0 800 480', stream4])
            time.sleep(0.8)
            last_state2 = True
            os.system('echo "button2"')
            player = True

#   If GPIO(22) is shorted to ground
    if input_state3 != last_state3:
        if (player and not input_state3):
#            os.system('sudo killall omxplayer.bin')
#            omxc = Popen(['omxplayer', '-b','--win', '0 0 800 480', stream4])
            player = False
        elif not input_state3:
            time.sleep(0.8)
            last_state3 = True
            os.system('echo "button3"')
            player = True

#   If GPIO(22) is shorted to ground
    if input_state4 != last_state4:
        if (player and not input_state4):
#            os.system('sudo killall omxplayer.bin')
#            omxc = Popen(['omxplayer', '-b','--win', '0 0 800 480', stream4])
            player = False
        elif not input_state4:
            time.sleep(0.8)
            last_state4 = True
            os.system('echo "button4"')
            player = True

    #   If GPIO(22) is shorted to ground
    if input_state5 != last_state5:
        if (player and not input_state5):
#            os.system('sudo killall omxplayer.bin')
#            omxc = Popen(['omxplayer', '-b','--win', '0 0 800 480', stream4])
            player = False
        elif not input_state5:
            time.sleep(0.8)
            last_state5 = True
            os.system('echo "button5"')
            player = True
    #If omxplayer is running and GPIO(4) are NOT shorted to ground (end view)
 #   elif (player and input_state1 and input_state3):
 #       time.sleep(60)
 #       os.system('killall omxplayer.bin')
 #       os.system('sudo echo 1 > /sys/class/backlight/rpi_backlight/bl_power')
 #       player = False

    #If omxplayer is running and GPIO(17) is shorted to ground (poweroff)
 #   if input_state2 != last_state2:
 #       os.system('sudo poweroff')

 #   #Set last_input states
 #   last_state1 = input_state1
 #   last_state2 = input_state2
