# The Exploding Kitten

This application recreate a fun board game called  "Exploding Kitten".
The player are able to play with the computer AI.


## Getting Started
1. Clone the Repo
2. Open index.html
3. Have Fun


### How to Use
![Alt text](http://i.giphy.com/7VIrrel4MWJGM.gif)

#### Summary
This game allows player to play with the a virtual player. Each player take turn to to play their cards. The player can play as many cards as he/she wish but he/she must end the turn by drawing a card from the drawing pile. The player who got the exploding kitten will lose.

#### Rules

**Step 1**

Play a card from your hand and following the instructions on the card. Or play no cards at all; that's cool too.

**Step 2**

After you follow the instructions on a card, you can play more cards. *You can play as many cards as you'd like*.

**Step 3**

Finally, end your turn by drawing a card from the Draw Pile into your hand and hoping it's not an Exploding Kitten.


#### Cards type

There are several magic cards that help player to avoid getting the exploding kitten:
* Defuse - Defuse the bomb before it is exploded.
* See The Future - See the top three cards in the drawing pile.
* Attack - Skip the turn and the next player must play 2 turns.
* Skip - Skip the turn.
* Favor - Demand a card from the other player.
* Shuffle - Shuffle the drawing pile.
* Draw From Bottom - Draw from the bottom of the pile.


## Live Version

This app is deployed on https://yisheng90.github.io/GA-Project-1-The-Exploding-Kitten-/

## Built With

* [jQuery](http://jquery.com/)
* JavaScript   
* css
* html
* Graphic by Pixelmator

## Workflow

* Day 1     : Drafting the basic game structure.
* Day 2 - 4 : Coding game logics.
* Day 5     : Implement game graphic.
* Day 6 - 14: Debug.

## Development

##### **The Approach**
I employed **Object-Oriented Programming** methodology in the development. Each card in the pile is an object, inherits unique property from it's parent class. This unique property when be rendered when the card is played. This approach allows me to encapsulate specific method to an object and hence made my code cleaner and readable.

##### **The Virtual Player**
The virtual player aims to model a real-life player's decision making process in the game. It was challenging due to the numerous scenarios available. I have tried different methodology and ultimately settled down with the **Probabilistic Decision Tree** model.

With probabilistic decision tree model, each card is assigned with a score based on different scenario. After the assessment, the card with the highest score will be played. To ensure volatility of the virtual player, I added some randomness to each score assigned.    

##### **The Graphic**
![Alt text](http://i.imgur.com/xX4Dbdu.png)


## Authors

* **Lee Yi Sheng** - *Responsible for keeping vests white* - [yisheng90](https://github.com/yisheng90)

## Acknowledgments

This application is built for programming practice purposes only.
This is not an official "Exploding Kittens" application. if you love the game, please visit  http://www.explodingkittens.com/ for more informations.
