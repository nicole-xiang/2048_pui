# 2048_pui
Video (use andrew account): https://drive.google.com/file/d/1ihUilikMfKVwfh60CMvWng3gbLiHD8_k/view?usp=sharing

Hosting Link: https://nicole-xiang.github.io/2048_pui/

Figma Link: https://www.figma.com/file/8lc6za3L33ziktohochaHd/xinyixia?node-id=224%3A2

## Description 
Welcome to 2048! There are two versions of this game: classic and pokemon! You can  play/pause music by clicking on the play/pause button on the bottom of the screen, as well as adjusting the volume by clicking on the right two buttons. 

Don't know how to play? No worries - go to the instructions page by clicking on the button under the game board. Have fun!! 

Note: When you first load the game, it will take a few seconds to load all asset files (images & music) due to the size.  

## External libraries
1. Howler.js: I used this for adding music to the game, as well as sound controls like play, pause, increase/decrease volume. I chose to use this because I wanted to make the game more fun by adding some background music and this was a module perfect for this feature. Just like any other modules, I imported Howler.js into the main javascript file and used the build-in methods. 

2. jQuery: I used this for some parts of the javascript code because I think it makes these parts of code easier to implement since they are all on click events. Specifically, I used this module for making the sound control buttons functionable.

## Using the website 
Classic Mode & Pokemon Mode: 
- Before beginning, you can click on the play button on the bottom of the screen to play lofi music. You can also pause the music and increase/decrease the volume. 
- Your high score is saved! But note that if you switch over to pokemon mode, you will start over. 
- Start playing! 
- Note that the page doesn't scroll with up/down arrows. This is so that when you play the game using the arrow keys, the page doesn't keep moving.   


## Iteration from HW7 
I sticked to the original design from HW7 so no changes were made. 

## Major Challenges
Some major challenges I encountered were 1) not being able to run code on live server due to browser restrictions (CORS error) so I had to run it on localhost 2) basic gameplay logic was difficult to implement because there are many game logic details that I didn't realize at first so there was a lot of time spent on debugging 3) making the tiles merge was also difficult to implement because I had to get rid of old tiles, place new tile, and create the sliding animation before the tiles actually merge.  