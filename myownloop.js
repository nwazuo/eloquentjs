function myLoop(value, test, udpation, body) {
     while(test(value)) {
        body(value);
        value = udpation(value);
    }
}

myLoop(0, i  => i < 6, a => a + 1, b => console.log(b));