# statsCodeforcesWebAndTelegramBot

Using this repo, you can have a telegram bot present in a group, that would inform, post standings and rating changes(with a congradulation message for those who get promoted to a higher level) of a list of handels by a semi-automatic process.

This gives a web interface, can be hosted locally, for commanding the bot to perform an action.

Web interface:
  
![image](https://github.com/SaiKamalP/statsCodeforcesWebAndTelegramBot/assets/104264136/2afa2318-4784-41af-bab5-c2a1eee47fe8)

Here a list of upcomming contests and 3 finished contests are displayed.
The contests going to be held on the next 2 to 3 days are highilated.

This gives options to Inform(informs about contest to group members.), post standings and post rating changes.
clicking any of which would first ask for a conformation message.
Once confirmed, the message gets posted on the provided Telegram chat, by the bot.
You can only inform about a contest 2 or 3 days before start( you can change this behaviour in js1.js).

Standings and rating changes are psoted as an image.



Steps to setup:
      
      mkdir statsCodeforcesBot
      cd mkdir
      git clone https://github.com/SaiKamalP/statsCodeforcesWebAndTelegramBot.git
      ls
      cd <type the directory name shown in ls>
      cd public_html
      ls
Once you are on public_html directory, open telegram.js file
and replace the telegram bot token with your token (a dummy token code is place initially)
and replace the telegram chat Id with your group chat Id (a dummy chat Id is place initially)
(refer online on how to get chatId of a group.)

next its time to place handels of group mates( or people whose rating changes and standings you want to post on telegram)

open codeforcesHandels.json file and place your list of handles there(as an example handle1, handle2, handel3 are shown in the file). //make sure you put correct handels, if at least one handle is wrong the javascript will throw error(can be seen in cosole of website).

By this the configuration part is done.

Now just open index.html file in browser and test your bot.

