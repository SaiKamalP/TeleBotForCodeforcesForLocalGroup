# TeleBotForCodeforcesForLocalGroup

Using this repo, you can have a telegram bot present in a group, that would inform, post standings and rating changes(with a congradulation message for those who get promoted to a higher level) of a list of handels by a semi-automatic process.

This gives a web interface, can be hosted locally, for commanding the bot to perform an action.

Web interface:

![Screenshot from 2023-06-03 12-04-50](https://github.com/SaiKamalP/TeleBotForCodeforcesForLocalGroup/assets/104264136/de5783c8-bcd4-4d83-a885-36b53bbd8caa)


Here a list of upcomming contests and 3 finished contests are displayed.
The contests going to be held on the next 2 to 3 days are highilated.

This gives options to Inform(informs about contest to group members.), post standings and post rating changes.
clicking any of which would first ask for a conformation message.
Once confirmed, the message gets posted on the provided Telegram chat, by the bot.
You can only inform about a contest 2 or 3 days before start( you can change this behaviour in js1.js).

Standings and rating changes are posted as an image on telegram.
Example:
For standings,
![Screenshot from 2023-06-03 12-26-03](https://github.com/SaiKamalP/TeleBotForCodeforcesForLocalGroup/assets/104264136/f66c566c-3ef9-410f-a446-4c475645d7a8)


 For rating changes,
 ![Screenshot from 2023-06-03 12-29-55](https://github.com/SaiKamalP/TeleBotForCodeforcesForLocalGroup/assets/104264136/d4df0e1c-dab9-46d7-b757-ebeb850bc41e)


The corrsponding images will get posted on telegram.

Steps to setup:
      
      mkdir statsCodeforcesBot
      cd mkdir
      git clone https://github.com/SaiKamalP/TeleBotForCodeforcesForLocalGroup.git
      ls
      cd <type the directory name shown by ls>
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

