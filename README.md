# xp_mirror
xp_arcade and Magic mirror and Photobooth

#Setup Magic Mirror:  
      https://github.com/sdetweil/MagicMirror_scripts

#Setup Retro Pi:
      https://github.com/RetroPie/RetroPie-Setup/blob/master/README.md

#Setup Photobooth:
      



#Python Script to control the 5 GPIO Buttons "xp_gpio_watcher.py" 
      (GPIO Buttons Mapped) to Magic Mirror Functions)
      
      L   S   R
        U   D
        
   L - Left    
   R - Right    
   S - Select (Enter)    
   U - Up    
   D - Down    
   
#Button Combos mapped to scripts on the Host OS. 
      L + R     = Magic Mirror mode on
      
      U + D     = Retro Pie
      
      L + U     = Photobooth
      
      S + U + D = X Windows + Terminal console 
      
      S         = Screenshot / Take a picture if in Photobooth
      
* GPIO Config for Rasberry Pi 
![Raspberry-Pi-GPIO-Layout-Model-B-Plus-rotated](https://user-images.githubusercontent.com/5242275/72920603-40409700-3d0f-11ea-9dfe-ce47f91459b7.png)

# GPIO 4, 17, 22, 23, 24
