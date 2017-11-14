new Vue({
    el:"#app",
    data: {
        isGameFinish: true,
        player : {
            health:100,
        },
        monster : {
            health:100,
        },
        heals:5,
        specialAttack : 3,
        logs: [],
    },
    methods: {
        startNewGame: function() {
            this.isGameFinish = false;
        },
        finishGame: function() {
            this.restartGame();
            this.isGameFinish = true;
            this.logs = [];
        },
        restartGame:function() {
            this.isGameFinish = false;
            this.player.health = 100;
            this.monster.health = 100;
            this.heals =5;
            this.specialAttack = 3;
            this.logs = [];
        },
        outputDmg: function(who) {
            var dmg =0;
            switch (who) {
                case 'player':
                    dmg = Math.floor(Math.random() * (10-5) + 5 );
                    break;
                case 'player-special':
                    dmg = Math.floor(Math.random() * (20-6) + 6);
                    break;    
                case 'monster':
                    dmg = Math.floor(Math.random() * (17-5) + 5 );
                    break;
                default:
                    break;
            }
            return dmg;
        },
        outputHeal: function() {
            var heal = 0;
            heal = Math.floor(Math.random() * (30 - 15) + 15);
            return heal;
        },
        playerAttack: function(attackType) {
            var dmg = 0;
            switch (attackType) {
                case 'normal':
                    dmg = this.outputDmg('player');
                    this.monster.health -= dmg;
                    break;
                case 'special':
                    if (this.specialAttack == 0) {
                        alert('No more Special Attack');
                        return;
                    }
                    dmg = this.outputDmg('player-special')
                    this.monster.health -= dmg;
                    this.reduceSpecialAttack();
                    break;
                
                default:
                    break;
            }
            if (this.monster.health <= 0) {
                var ok = confirm('You Win. Monster Slained. Start a new game?');
                if (ok) {
                    this.restartGame();
                } else {
                    this.finishGame();
                }
            } else {
                this.addToLog('player', 'dmg', dmg);
                this.monsterAttack();
            }
        },
        reduceSpecialAttack:function() {
            this.specialAttack -= 1;
        },
        reduceHeals:function() {
            this.heals -= 1;
        },
        playerHeal: function() {
            if (this.heals == 0) {
                alert('No more Heals');
                return;
            }
            var heal = 0;
            heal = this.outputHeal();
            if (this.player.health + heal >= 100) {
                this.player.health = 100;
            } else {
                this.player.health += heal;
            }
            this.reduceHeals();
            this.addToLog('player', 'heals', heal);
            this.monsterAttack();
        },
        monsterAttack: function() {
            var dmg = this.outputDmg('monster');
            this.player.health -= dmg;
            if (this.player.health <= 0) {
                var ok = confirm('You Lost. Monster Won. Start a new game?');
                if (ok) {
                    this.restartGame();
                } else {
                    this.finishGame();
                }
            } else {
                this.addToLog('monster', 'dmg', dmg);
            }
            
        },
        addToLog: function(who, action, value) {
            
            var actor = '';
            var does = '';
            switch (who) {
                case 'player':
                    actor = 'Player';
                    switch (action) {
                        case 'heals':
                            does = " heals " + value + " health";
                            break;
                        default:
                            does = " deals " + value + " damage";
                            break;
                    }
                    msg = actor + does ;
                    msgObj = {
                        player: msg
                    }
                    break;
                case 'monster':
                    actor = 'Monster';
                    switch (action) {
                        case 'heals':
                            does = " heals " + value + " health";
                            break;
                        default:
                            does = " deals " + value + " damage";
                            break;
                    }
                    msg = actor + does;
                    msgObj = {
                        monster: msg
                    }
                    break;
                default:
                    break;
            }

            
            console.log(msgObj)
            this.logs.unshift(msgObj);
        }
    }
});