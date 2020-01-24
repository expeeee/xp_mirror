import RPi.GPIO as GPIO


import time 
import sys
GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)


GPIO.add_event_detect(17, GPIO.RISING)  # add rising edge detection on a channel
GPIO.add_event_detect(27, GPIO.RISING)  #for both buttons

start = time.time()
while True:
    if GPIO.event_detected(17) and GPIO.event_detected(27):
        print('Button 1 and 2 pressed')
    if GPIO.event_detected(17):    
        print('Button 1 pressed')
    if GPIO.event_detected(27):
        print('Button 2 pressed')
   # if time.time() - start > 5 :
   #     print('Timeout')
    time.sleep(0.01)
