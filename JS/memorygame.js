// select the start game button
document.querySelector(".control-buttons span").onclick = function() {

    // prompt window to ask for Name
    let yourName = prompt("Whats Your Name?");

    // if name is Empty 
    if ( yourName == null || yourName == "") {

        // set name as There 
        document.querySelector(".name span").innerHTML = 'There';

        // if name is not empty
    } else {

        // set name from variable yourName
        document.querySelector(".name span").innerHTML = yourName ;

    }

    // remove splash screen
    document.querySelector(".control-buttons ").remove();
};

    // effect duration
    let duration = 1000;

    // select blocks container
    let blockscontainer = document.querySelector(".memory-game-blocks");

    // creat array from game blocks 
    let blocks = Array.from(blockscontainer.children);

    // creat range of keys 
    // let order range = [...Array(blocks.length).keys()];
    let orderRange = Array.from(Array(blocks.length).keys());

    shuffle(orderRange);

    // add order css property to game blocks 
    blocks.forEach((block, index) => {
        
        block.style.order = orderRange[index];

    // add click event 
    block.addEventListener('click', function() {

        // trigger the flip block function
        flipBlock(block);
    });
});

    // flip block function 
    function flipBlock(selectedBlock) {

        // add class is flipped 
        selectedBlock.classList.add('is-flipped');

        // cllect all flipped cards
        let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

        // if there is two selected blocks 
        if (allFlippedBlocks.length === 2) {
           // console.log('flipped');

           // stop clicking function
            stopClicking();

           // check matched clock function
           checkedMachedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
           
        }
    }

    // stop clicking function
    function stopClicking() {

        // add class to stop clicking on main container
        blockscontainer.classList.add('no-clicking')

        // set time out
        setTimeout(() => {
            
            // remove class no click after duration
            blockscontainer.classList.remove('on-click') 

        }, duration);
    }

    // check matched block
    function checkedMachedBlocks (firstBlock, secondBlock) {

    

        if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

            
            firstBlock.classList.add('has-match');
            secondBlock.classList.add('has-match');

            document.getElementById('success').play();
             

        } else {
            

             setTimeout(() => {
            
                firstBlock.classList.remove('is-flipped');
                secondBlock.classList.remove('is-flipped');
                

        }, duration);

        document.getElementById('fail').play();

        }
    }

    // shuffle function 
    function shuffle(array) {

        // setting vars 
        let current = array.length,
            temp,
            random;

        while (current > 0) {

            // get random number
            random = Math.floor(Math.random() * current);

            // decrease length by one 
            current-- ;

            // 1- save current element in stash 
            tamp = array[current];

            // 2- current element = random element 
            array[current] = array[random];

            // 3- raandom element = get element from stash
            array[random] = temp;
        }

        return array;
    };
