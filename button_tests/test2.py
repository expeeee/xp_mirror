#!/usr/bin/env python  

import RPi.GPIO as GPIO
from time import sleep
GPIO.setmode(GPIO.BCM)  

#GPIO.setwarnings(False)
#LED = 16
BUTTON1 = 17
BUTTON2 = 27
BUTTON3 = 22
BUTTON4 = 23
BUTTON5 = 18


GPIO.setup(BUTTON1, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON2, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON3, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON4, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON5, GPIO.IN, pull_up_down=GPIO.PUD_UP)
#GPIO.setup(LED, GPIO.OUT)


while True:
	s1 = GPIO.input(BUTTON1)
	s2 = GPIO.input(BUTTON2)
	s3 = GPIO.input(BUTTON3)
	s4 = GPIO.input(BUTTON4)
	s5 = GPIO.input(BUTTON5)

        if s1 == False and s2 == False:
                print'button1 and 2' 
                sleep(1)
	if s1 == False:
		print'button1'
		sleep(1)
	if s2 == False:
		print'button2'
		sleep(1)
#!/usr/bin/env python  
# Borrowed some code from Alex Eames http://RasPi.tv  
# http://RasPi.tv/how-to-use-interrupts-with-python-on-the-raspberry-pi-and-rpi-gpio-part-3
  
