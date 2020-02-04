let counter = 50 

addEventListener("DOMContentLoaded", function(){
    const monsterURL = "http://localhost:3000/monsters"

    const createDiv = document.querySelector("#create-monster")
    const form = document.createElement("form")
    const inp1 = document.createElement("input")
    inp1.setAttribute("name", "name")
    const inp2 = document.createElement("input")
    inp2.setAttribute("name", "age")
    const inp3 = document.createElement("input")
    inp3.setAttribute("name", "description")
    const submitButton = document.createElement("button")
    submitButton.innerText = "Submit"
    submitButton.setAttribute("name", "submit")
    form.append(inp1, inp2, inp3, submitButton)
    createDiv.append(form)

    form.addEventListener("submit", function(e){
        e.preventDefault()
        const name = document.querySelector('input[name = "name"]').value
        const age = document.querySelector('input[name = "age"]').value
        const description = document.querySelector('input[name = "description"]').value
        let newMonster = {
            name: name,
            age: age,
            description: description
        }
        const configurationObject = {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(newMonster)
        }
        fetch(monsterURL, configurationObject)
            .then(response => response.json())
            .then(function(){
                renderMonster(newMonster)
            })
        e.target.reset()
    })

    function fetchMonsters(){
        return fetch(monsterURL)
            .then(response => response.json())
            .then(monsters => {
                // debugger
                render50Monsters(monsters)
        })
    }

    function render50Monsters(monsters){ 
        let first50Monsters = monsters.slice(counter - 50, counter)
        for (let i = 0; i < first50Monsters.length; i++) {
            renderMonster(first50Monsters[i]);
        }
       
    }

    const buttonNext = document.querySelector("#forward")
    buttonNext.addEventListener("click", function(e){
        // console.log("word")
        e.preventDefault()
        counter += 50
        const div = document.querySelector("#monster-container")
        div.innerHTML = ''
        fetchMonsters()
    })

    const buttonBack = document.querySelector("#back")
    buttonBack.addEventListener("click", function(e){
        e.preventDefault()
        counter -= 50
        // console.log("word")
        if (counter > 49){
            const div = document.querySelector("#monster-container")
            div.innerHTML = ''
            fetchMonsters()
        }else{
            counter = 50
        }

    })

    // function renderFirst50Monsters(monsters){
    //     const first50Monsters = monsters.slice(0,50)
    //     for (let i = 0; i < first50Monsters.length; i++) {
    //         renderMonster(monsters[i]);
    //     }
    // }
    
    function renderSecond50Monsters(monsters){
        const first50Monsters = monsters.slice(50,100)
        for (let i = 0; i < first50Monsters.length; i++) {
            renderMonster(monsters[i]);
        }
    }
    
    function renderMonster(monster){
        const monsterCont = document.querySelector('#monster-container')
        const h2Tag = document.createElement("h2")
        h2Tag.innerText = monster.name
        const h4Tag = document.createElement("h4")
        h4Tag.innerText = monster.age
        const pTag = document.createElement("p")
        pTag.innerText = monster.description
        monsterCont.append(h2Tag, h4Tag, pTag)
    }



    fetchMonsters()

}) //END OF THE DOM CONTENT LOADED FUNCTION