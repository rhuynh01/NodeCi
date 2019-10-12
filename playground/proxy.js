class Greetings {
  english() {
    return 'Hello';
  }
  spanish() {
    return 'Hola';
  }
}

class MoreGreetings {
  german() {
    return 'Hallo';
  }
  french() {
    return 'Bonjour';
  }
}

const greetings = new Greetings();
const moreGreetings = new MoreGreetings();

const allGrettings = new Proxy(moreGreetings, {
  get: function(target, property) {
    // console.log(property);
    return target[property];
  }
});
