const dog = {
    isSleepy: false,
    isHungry: true,
    sound: "Woof!",
    name: "Spot",
    makeSound: function(){
        console.log(this.sound);
    },
    sleep: function(){
        this.isSleepy = false;
        this.isHungry = true;
        console.log(this.name + " took a nap and is now hungry.");
    },
    feed: function(){
        this.isHungry = false;
        this.isSleepy = true;
        console.log(this.name + " just ate and is now sleepy.");
    }
  };

  dog.makeSound();
  console.log("hungry: " + dog.isHungry + " sleepy: " + dog.isSleepy);
  dog.feed();
  console.log("hungry: " + dog.isHungry + " sleepy: " + dog.isSleepy);
  dog.sleep();
  console.log("hungry: " + dog.isHungry + " sleepy: " + dog.isSleepy);