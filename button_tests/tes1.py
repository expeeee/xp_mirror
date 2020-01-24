#!/usr/bin/env python  
# Borrowed some code from Alex Eames http://RasPi.tv  
# http://RasPi.tv/how-to-use-interrupts-with-python-on-the-raspberry-pi-and-rpi-gpio-part-3
  
import RPi.GPIO as GPIO  
from time import sleep
GPIO.setmode(GPIO.BCM)  

BUTTON1=17
BUTTON2=22
BUTTON3=27
BUTTON4=23
BUTTON5=18
#LED=16

GPIO.setup(BUTTON1, GPIO.IN, pull_up_down=GPIO.PUD_UP)  
GPIO.setup(BUTTON2, GPIO.IN, pull_up_down=GPIO.PUD_UP) 
GPIO.setup(BUTTON3, GPIO.IN, pull_up_down=GPIO.PUD_UP) 
GPIO.setup(BUTTON4, GPIO.IN, pull_up_down=GPIO.PUD_UP) 
GPIO.setup(BUTTON5, GPIO.IN, pull_up_down=GPIO.PUD_UP) 
#GPIO.setup(LED,GPIO.OUT) 

def _butOne(channel):  
    print "falling edge detected on button #1"  
  
def _butTwo(channel):  
    print "falling edge detected on button #2"  

def _but3(channel):  
    print "falling edge detected on button #3"  
  
def _but4(channel):  
    print "falling edge detected on button #4"  

def _but5(channel):  
    print "falling edge detected on button #5"  


raw_input("Press Enter when ready\n>")  
  
GPIO.add_event_detect(BUTTON1, GPIO.BOTH, callback=_butOne, bouncetime=300)  
GPIO.add_event_detect(BUTTON2, GPIO.BOTH, callback=_butTwo, bouncetime=300)  
GPIO.add_event_detect(BUTTON3, GPIO.BOTH, callback=_but3, bouncetime=300)  
GPIO.add_event_detect(BUTTON4, GPIO.BOTH, callback=_but4, bouncetime=300)  
GPIO.add_event_detect(BUTTON5, GPIO.BOTH, callback=_but5, bouncetime=300)  
  
try:  
  while True:
     sleep(0.1) # do nothing much but don't hog the CPU
  
except KeyboardInterrupt:  
  GPIO.cleanup()       # clean up GPIO on CTRL+C exit
