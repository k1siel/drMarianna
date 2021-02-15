"use strict";

//jakis syf
let lool = {
    load: function () {
        console.log("działa")
        let x = "LRUDXyellow$13"
        x = x.slice(1)
        console.log(x.includes("W"))

        marianna.createThrow()
        pill.generate()
        setInterval(lupa.blue, 500)
        setInterval(lupa.red, 500)
        setInterval(lupa.yellow, 500)
    }
}

let board = {
    width: 8,
    height: 18,
    boardTable: [],
    delTable: [],
    boardInterval: null,
    heightCounter: 0,  /// positionY
    level: 1,

    createBoard: function () {
        //stworzenie tablicy przechowującej informacje oraz planszy z divów
        let boardDiv = document.getElementById("board")
        this.boardInterval = null
        this.boardTable = []
        for (let i = 0; i < this.height; i++) {
            this.boardTable.push([])

            for (let j = 0; j < this.width; j++) {
                this.boardTable[i].push(0);

                if (i < 2) {
                    if (j < 3 || j > 4) {
                        this.boardTable[i][j] = 1
                    }

                }
                let littleDiv = document.createElement("div")
                littleDiv.classList = "pole"
                littleDiv.dataset.y = i;
                littleDiv.dataset.x = j;

                boardDiv.appendChild(littleDiv)
            }
        }
        board.zawirusuj()
        board.refresh()
        marianna.throwPill()


        score.setScore()

        document.querySelector(".debilYellow").style.visibility = "visible"
        document.querySelector(".debilRed").style.visibility = "visible"
        document.querySelector(".debilBlue").style.visibility = "visible"

        let levelNumber = document.getElementById("lvl")
        levelNumber.innerHTML = ""



        if (this.level > 1) {
            let bgColor = Math.floor(Math.random() * (3 - 1)) + 1;

            if (bgColor == 1) {
                document.querySelector("body").style.backgroundImage = 'url("img/kafelki2.png")'
            }
            else if (bgColor == 2) {
                document.querySelector("body").style.backgroundImage = 'url("img/kafelki3.png")'
            }
            else {
                document.querySelector("body").style.backgroundImage = 'url("img/kafelki4.png")'
            }
        }

        if (this.level >= 10) {
            for (let i = 0; i < 2; i++) {
                let cyfra = document.createElement("div")
                cyfra.classList.add("cyfra")
                cyfra.style.backgroundImage = "url('img/cyfry/" + String(this.level).charAt(i) + ".png')"
                cyfra.style.width = "32px"
                cyfra.style.height = "32px"
                levelNumber.appendChild(cyfra)

            }
        } else {

            let cyfra1 = document.createElement("div")
            cyfra1.classList.add("cyfra")
            cyfra1.style.backgroundImage = "url('img/cyfry/0.png')"
            cyfra1.style.width = "32px"
            cyfra1.style.height = "32px"
            let cyfra2 = document.createElement("div")
            levelNumber.appendChild(cyfra1)

            cyfra2.classList.add("cyfra")
            cyfra2.style.backgroundImage = "url('img/cyfry/" + this.level + ".png')"
            cyfra2.style.width = "32px"
            cyfra2.style.height = "32px"
            levelNumber.appendChild(cyfra2)

        }
    },

    wirusiki: ["red", "yellow", "blue", "red"],

    zawirusuj: function () {
        board.wirusiki = ["red", "yellow", "blue", "red"]
        console.log(this.wirusiki[-1])

        for (let i = 0; i < board.level; i++) {
            if (this.wirusiki[this.wirusiki.length - 1] == "red") {
                this.wirusiki.push("yellow")
            }
            else if (this.wirusiki[this.wirusiki.length - 1] == "yellow") {
                this.wirusiki.push("blue")
            }
            else if (this.wirusiki[this.wirusiki.length - 1] == "blue") {
                this.wirusiki.push("red")
            }
        }


        board.updateVirus(board.wirusiki.length)
        //dodaj se zeby ise nie mogly powtarzac dane
        let randomY = 0
        let randomX = 0
        let randomCoords = function () {
            randomY = Math.floor(Math.random() * (17 - 8)) + 8;
            randomX = Math.floor(Math.random() * (7 - 0)) + 0;
        }
        randomCoords()
        for (let i = 0; i < this.wirusiki.length; i++) {



            while (this.boardTable[randomY][randomX] != 0) {
                randomCoords()
                console.log("lol")
            }


            this.boardTable[randomY][randomX] = "W" + this.wirusiki[i]
        }
    }
    ,

    positionX: 3, // zmienna określająca pozycje w tablicy aktualnej piguły

    //funkcja posuwająca pigułe
    movePill: function () {

        if (board.stopPill() == true) {
            clearInterval(board.boardInterval)
            board.clearPills()
        }
        else {
            board.delPill()
            board.heightCounter++
            board.putPill()



            board.refresh()
        }

    },

    //wyrysowanie wszystkich divków od nowa na podstawie tablicy
    refresh: function () {
        let boardDiv = document.getElementById("board")
        boardDiv.innerHTML = ""
        for (let i = 0; i < board.height; i++) {
            for (let j = 0; j < board.width; j++) {
                let littleDiv = document.createElement("div")
                littleDiv.classList.add("pole")
                littleDiv.dataset.y = i;
                littleDiv.dataset.x = j;
                let urlColor = ""
                let idKloca = ""
                if (String(board.boardTable[i][j]).includes("$")) {
                    idKloca = board.boardTable[i][j].split("$")[1]

                    littleDiv.classList.add(idKloca)

                }
                if (String(board.boardTable[i][j]).includes("red")) {
                    urlColor += "br_"

                }
                else if (String(board.boardTable[i][j]).includes("blue")) {
                    urlColor += "bl_"
                    littleDiv.style.backgroundColor = "blue"
                }
                else if (String(board.boardTable[i][j]).includes("yellow")) {
                    littleDiv.style.backgroundColor = "yellow"
                    urlColor += "yl_"
                }

                if (String(board.boardTable[i][j]).includes("L")) {
                    urlColor += "left"
                }
                else if (String(board.boardTable[i][j]).includes("R")) {
                    urlColor += "right"
                }
                else if (String(board.boardTable[i][j]).includes("U")) {
                    urlColor += "up"
                }
                else if (String(board.boardTable[i][j]).includes("D")) {
                    urlColor += "down"
                }
                else if (String(board.boardTable[i][j]).includes("W")) {
                    urlColor += "wirus"
                }
                else if (String(board.boardTable[i][j]).includes("X")) {
                    urlColor += "dot"
                }
                else if (String(board.boardTable[i][j]).includes("Z")) {
                    urlColor += "x"
                }
                else if (String(board.boardTable[i][j]).includes("O")) {
                    urlColor += "o"
                }

                if (urlColor.length > 3) {
                    littleDiv.style.backgroundImage = "url(\"img/" + urlColor + ".png\")";
                }
                boardDiv.appendChild(littleDiv)
            }
        }
    },

    //usunięcie piguły z tablicy
    delPill: function () {
        if (pill.orientation == "horizontal") {
            board.boardTable[board.heightCounter].splice(board.positionX, 2, 0, 0)
        }
        else {
            board.boardTable[board.heightCounter - 1].splice(board.positionX, 1, 0)
            board.boardTable[board.heightCounter].splice(board.positionX, 1, 0)
        }

    },
    //wstawienie piguły do tablicy
    putPill: function () {
        if (pill.orientation == "horizontal") {
            board.boardTable[board.heightCounter].splice(board.positionX, 2, "L" + pill.color1 + "$" + pill.idek, "R" + pill.color2 + "$" + pill.idek)
        }
        else {
            board.boardTable[board.heightCounter - 1].splice(board.positionX, 1, "U" + pill.color2 + "$" + pill.idek)
            board.boardTable[board.heightCounter].splice(board.positionX, 1, "D" + pill.color1 + "$" + pill.idek)
        }

    },


    stopPill: function () {
        //zatrzymanie gdy dotknie dolnej krawędzi

        if (board.heightCounter >= 17) {

            return true


        }

        //zatrzymanie piguły poziomej
        if (pill.orientation == "horizontal") {


            if (board.boardTable[board.heightCounter + 1][board.positionX] != 0 || board.boardTable[board.heightCounter + 1][board.positionX + 1] != 0) {
                if (board.heightCounter <= 1) {
                    let flaga = document.querySelector(".wygryw")
                    console.log(flaga)
                    flaga.style.backgroundImage = 'url("img/go.png")'
                    lupa.redAnimation = "laugh"
                    lupa.blueAnimation = "laugh"
                    lupa.yellowAnimation = "laugh"
                    document.getElementById("marianna").style.backgroundImage = 'url("img/go_dr.png")'
                    flaga.style.left = "35.5%"
                    flaga.style.width = "334px"
                    flaga.style.height = "119px"

                    marianna.throwTable[3][10] = 0
                    marianna.throwTable[3][11] = 0
                    marianna.refreshThrow()

                    return true
                }
                else {

                    return true
                }

            }
        }
        //zatrzymanie piguły pionowej
        if (pill.orientation == "vertical") {


            if (board.boardTable[board.heightCounter + 1][board.positionX] != 0) {
                if (board.heightCounter <= 1) {
                    let flaga = document.querySelector(".wygryw")
                    console.log(flaga)
                    flaga.style.backgroundImage = 'url("img/go.png")'
                    document.getElementById("marianna").style.backgroundImage = 'url("img/go_dr.png")'
                    flaga.style.left = "35.5%"
                    flaga.style.width = "334px"
                    flaga.style.height = "119px"
                    marianna.throwTable[3][10] = 0
                    marianna.throwTable[3][11] = 0
                    marianna.refreshThrow()

                    return true
                }
                else {

                    return true
                }
            }
        }

    },

    delCounter: 0,
    //zbijanie pigułek
    clearPills: function () {
        controls.removeKey()
        board.refresh()
        this.delTable = []
        this.delCounter = 0

        for (let i = 0; i < this.height; i++) {
            this.delTable.push([])
            for (let j = 0; j < this.width; j++) {
                this.delTable[i].push(0)
            }
        }
        let verticalCounter = 1
        let verticalColor = "owo"
        let verticalPosition = 0


        //sprawdzenie tablicy kolumnami i zamiana kloców do zbicia na del

        for (let i = 0; i < this.width; i++) {
            verticalColor = "owo"
            for (let j = 0; j < this.height; j++) {


                if (String(this.boardTable[j][i]).includes(verticalColor) && verticalColor != 0) {
                    verticalCounter++
                }
                else {
                    if (String(this.boardTable[j][i]).includes("red")) {
                        verticalColor = "red"
                    }
                    else if (String(this.boardTable[j][i]).includes("blue")) {
                        verticalColor = "blue"
                    }
                    if (String(this.boardTable[j][i]).includes("yellow")) {
                        verticalColor = "yellow"
                    }

                    verticalPosition = j
                    verticalCounter = 1
                }
                if (verticalCounter == 4) {
                    for (let k = 0; k < verticalCounter; k++) {
                        this.delTable[verticalPosition + k][i] = "del"
                    }
                }
                else if (verticalCounter > 4) {
                    this.delTable[j][i] = "del"
                }
            }


        }


        let horizontalCounter = 1
        let horizontalColor = "uwu"
        let horizontalPosition = 0

        //sprawdzenie tablicy wierszami i zamiana kloców do zbicia na del

        for (let i = 0; i < this.height; i++) {
            horizontalColor = "uwu"
            for (let j = 0; j < this.width; j++) {
                if (String(board.boardTable[i][j]).includes(horizontalColor) && horizontalColor != 0) {
                    horizontalCounter++
                }
                else {
                    if (String(this.boardTable[i][j]).includes("red")) {
                        horizontalColor = "red"
                    }
                    else if (String(this.boardTable[i][j]).includes("blue")) {
                        horizontalColor = "blue"
                    }
                    else if (String(this.boardTable[i][j]).includes("yellow")) {
                        horizontalColor = "yellow"
                    }

                    horizontalPosition = j
                    horizontalCounter = 1
                }

                if (horizontalCounter == 4) {
                    this.delTable[i].splice(horizontalPosition, 4, "del", "del", "del", "del")

                }
                else if (horizontalCounter > 4) {
                    this.delTable[i][j] = "del"
                }
            }



        }

        //zmiana graficzek na x i o

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {

                if (this.delTable[i][j] == "del") {
                    this.delCounter++
                    this.boardTable[i][j]
                    let temp = this.boardTable[i][j]
                    if (temp != 0) {
                        if (temp.charAt(0) == "W") {
                            temp = temp.slice(1)
                            temp = "Z" + temp

                            if (temp.includes("red")) {
                                lupa.redAnimation = "dead"
                            }
                            else if (temp.includes("blue")) {
                                lupa.blueAnimation = "dead"
                            }
                            else if (temp.includes("yellow")) {
                                lupa.yellowAnimation = "dead"
                            }
                        }
                        else {
                            temp = temp.slice(1)
                            temp = "O" + temp
                        }
                    }
                    this.boardTable[i][j] = temp


                }
            }
        }


        board.refresh()
        if (this.delCounter > 0) {
            setTimeout(board.deletePills, 1000)
        }
        else {
            let ifwin = board.wygranko()
            console.log(ifwin)
            if (ifwin != true) {

                marianna.throwPill()
            }
        }






    },

    deletePills: function () {


        for (let i = 0; i < board.height; i++) {
            for (let j = 0; j < board.width; j++) {

                if (board.delTable[i][j] == "del") {
                    console.log(board.boardTable[i][j])
                    if (board.boardTable[i][j] != 0) {
                        if (board.boardTable[i][j].charAt(0) == "Z") {
                            score.actualScore += 100
                            score.setScore()
                        }
                    }
                    board.boardTable[i][j] = 0


                }
            }
        }

        board.gravity()


    },

    //funkcja zapewniająca wygranie po zabiciu wirusów
    wygranko: function () {
        let IloscWirusow = 0
        let redCount = 0
        let yellowCount = 0
        let blueCount = 0
        for (let i = 8; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (String(this.boardTable[i][j]).includes("W")) {
                    IloscWirusow++

                    if (String(this.boardTable[i][j]).includes("red")) {
                        redCount++
                    }
                    else if (String(this.boardTable[i][j]).includes("blue")) {
                        blueCount++
                    }
                    else if (String(this.boardTable[i][j]).includes("yellow")) {
                        yellowCount++
                    }
                }
            }
        }
        if (yellowCount == 0) {
            document.querySelector(".debilYellow").style.visibility = "hidden"
        }
        if (redCount == 0) {
            document.querySelector(".debilRed").style.visibility = "hidden"
        }
        if (blueCount == 0) {
            document.querySelector(".debilBlue").style.visibility = "hidden"
        }
        this.updateVirus(IloscWirusow)

        if (IloscWirusow == 0) {
            controls.keyPress()
            let flaga = document.querySelector(".wygryw")
            console.log(flaga)
            flaga.style.backgroundImage = 'url("img/sc.png")'
            flaga.style.left = "33%"
            flaga.style.width = "423px"
            flaga.style.height = "119px"
            board.level++

            clearInterval(this.boardInterval)
            return true
        }
        else {
            return false
        }
    },

    updateVirus: function (viruses) {
        let virusNumber = document.getElementById("virusnumber")
        virusNumber.innerHTML = ""
        if (viruses >= 10) {
            for (let i = 0; i < 2; i++) {
                let cyfra = document.createElement("div")
                cyfra.classList.add("cyfra")
                cyfra.style.backgroundImage = "url('img/cyfry/" + String(viruses).charAt(i) + ".png')"
                cyfra.style.width = "32px"
                cyfra.style.height = "32px"
                virusNumber.appendChild(cyfra)

            }
        } else {

            let cyfra1 = document.createElement("div")
            cyfra1.classList.add("cyfra")
            cyfra1.style.backgroundImage = "url('img/cyfry/0.png')"
            cyfra1.style.width = "32px"
            cyfra1.style.height = "32px"
            let cyfra2 = document.createElement("div")
            virusNumber.appendChild(cyfra1)

            cyfra2.classList.add("cyfra")
            cyfra2.style.backgroundImage = "url('img/cyfry/" + viruses + ".png')"
            cyfra2.style.width = "32px"
            cyfra2.style.height = "32px"
            virusNumber.appendChild(cyfra2)

        }

    },
    gravityInterval: 0,


    //funkcja grawitacji po zbiciu
    gravity: function () {
        board.refresh()
        let opuszczone = []
        let id = ""
        let dropCount = 0
        for (let i = 17; i > -1; i--) {

            for (let j = 8; j > -1; j--) {
                if (String(board.boardTable[i][j]).includes("$") && board.boardTable[i][j] != 0) {
                    id = board.boardTable[i][j].split("$")[1]
                    let checker = opuszczone.includes(id)
                    checker = !checker

                    if (checker) {
                        let doublePill = document.getElementsByClassName(id)
                        // ogarnięcie spadania dla piguł 2 czesciowych
                        if (doublePill.length > 1) {


                            let halfPill1X = parseInt(doublePill[1].dataset.x)
                            let halfPill1Y = parseInt(doublePill[1].dataset.y)

                            let halfPill2X = parseInt(doublePill[0].dataset.x)
                            let halfPill2Y = parseInt(doublePill[0].dataset.y)
                            let tempX1 = ""
                            let tempX2 = ""
                            opuszczone.push(id)
                            //spadanie dla piguł 
                            console.log(halfPill1X, halfPill2X)
                            console.log(halfPill1X == halfPill2X)
                            if (halfPill1Y == halfPill2Y) {
                                if (halfPill1Y < 17) {
                                    console.log(board.boardTable[halfPill1Y + 1][halfPill1X], board.boardTable[halfPill2Y + 1][halfPill2X])
                                    if (board.boardTable[halfPill1Y + 1][halfPill1X] == 0 && board.boardTable[halfPill2Y + 1][halfPill2X] == 0) {
                                        tempX1 = board.boardTable[halfPill1Y][halfPill1X]

                                        if (tempX1 != 0) {
                                            tempX1 = tempX1.slice(1)
                                            tempX1 = "X" + tempX1
                                            console.log(tempX1)

                                            board.boardTable[halfPill1Y].splice(halfPill1X, 1, 0)
                                            board.boardTable[halfPill1Y + 1].splice(halfPill1X, 1, tempX1)
                                            dropCount++
                                        }


                                        tempX2 = board.boardTable[halfPill2Y][halfPill2X]

                                        if (tempX2 != 0) {
                                            tempX2 = tempX2.slice(1)
                                            tempX2 = "X" + tempX2
                                            console.log(tempX2)

                                            board.boardTable[halfPill2Y].splice(halfPill2X, 1, 0)
                                            board.boardTable[halfPill2Y + 1].splice(halfPill2X, 1, tempX2)
                                            dropCount++
                                        }
                                    }
                                }



                            }
                            //spadanie dla piguł pionowych
                            else {

                                if (halfPill1Y < 17) {
                                    if (board.boardTable[halfPill1Y + 1][halfPill1X] == 0) {

                                        tempX1 = board.boardTable[halfPill1Y][halfPill1X]

                                        if (tempX1 != 0) {
                                            tempX1 = tempX1.slice(1)
                                            tempX1 = "X" + tempX1
                                            console.log(tempX1)

                                            board.boardTable[halfPill1Y].splice(halfPill1X, 1, 0)
                                            board.boardTable[halfPill1Y + 1].splice(halfPill1X, 1, tempX1)
                                            dropCount++
                                        }

                                    }
                                }
                                if (halfPill2Y < 17) {

                                    if (board.boardTable[halfPill2Y + 1][halfPill2X] == 0) {

                                        tempX2 = board.boardTable[halfPill2Y][halfPill2X]
                                        if (tempX2 != 0) {

                                            tempX2 = tempX2.slice(1)
                                            tempX2 = "X" + tempX2



                                            board.boardTable[halfPill2Y].splice(halfPill2X, 1, 0)
                                            board.boardTable[halfPill2Y + 1].splice(halfPill2X, 1, tempX2)
                                            dropCount++
                                        }

                                    }
                                }

                            }
                        }
                        else {
                            let halfPill2X = parseInt(doublePill[0].dataset.x)
                            let halfPill2Y = parseInt(doublePill[0].dataset.y)
                            let tempX1 = ""
                            opuszczone.push(id)
                            tempX1 = board.boardTable[halfPill2Y][halfPill2X]
                            tempX1 = tempX1.slice(1)
                            tempX1 = "X" + tempX1
                            board.boardTable[halfPill2Y].splice(halfPill2X, 1, tempX1)

                            if (halfPill2Y < 17) {

                                if (board.boardTable[halfPill2Y + 1][halfPill2X] == 0) {

                                    tempX1 = board.boardTable[halfPill2Y][halfPill2X]
                                    if (tempX1 != 0) {

                                        tempX1 = tempX1.slice(1)
                                        tempX1 = "X" + tempX1



                                        board.boardTable[halfPill2Y].splice(halfPill2X, 1, 0)
                                        board.boardTable[halfPill2Y + 1].splice(halfPill2X, 1, tempX1)
                                        dropCount++
                                    }

                                }
                            }

                        }
                    }

                }
            }
        }

        if (dropCount == 0) {
            // clearInterval(board.gravityInterval)
            board.clearPills()
        } else {
            board.refresh()

            setTimeout(board.gravity, 200)


        }

    },
}

//wszystko związane z klikaniem strzałeczek
let controls = {

    keyPress: function () {



        window.addEventListener('keydown', this.pressed)
    },

    removeKey: function () {
        window.removeEventListener('keydown', this.pressed)
    },

    pressed: function (key) {


        if (key.key == "Enter") {
            console.log("space")

            if (document.querySelector(".wygryw").style.backgroundImage == 'url("img/sc.png")') {

                clearInterval(board.boardInterval)
                board.createBoard()
                document.querySelector(".wygryw").style.backgroundImage = ""

            }
            else if (document.querySelector(".wygryw").style.backgroundImage == 'url("img/go.png")') {
                document.querySelector(".wygryw").style.backgroundImage = ""
                board.level = 1
                score.actualScore = 0
                board.heightCounter = 1
                board.createBoard()



            }
        }
        //wciśnięcie lewej strzałki
        if (key.key == "ArrowLeft") {


            if (pill.orientation == "horizontal") {
                if (board.positionX > 0) {
                    if (board.boardTable[board.heightCounter][board.positionX - 1] == 0) {
                        board.delPill()

                        board.positionX -= 1
                        board.putPill()
                        board.refresh()
                    }
                }
            }
            else {
                if (board.positionX > 0) {
                    if (board.boardTable[board.heightCounter][board.positionX - 1] == 0 && board.boardTable[board.heightCounter - 1][board.positionX - 1] == 0) {
                        board.delPill()

                        board.positionX -= 1
                        board.putPill()
                        board.refresh()
                    }
                }
            }
        }

        //wciśnięcie prawej strzałki
        if (key.key == "ArrowRight") {

            if (pill.orientation == "horizontal") {
                if (board.positionX < 6) {
                    if (board.boardTable[board.heightCounter][board.positionX + 2] == 0) {
                        board.delPill()
                        board.positionX += 1
                        board.putPill()
                        board.stopPill()
                        board.refresh()
                    }
                }
            }
            else {
                if (board.positionX < 7) {
                    if (board.boardTable[board.heightCounter][board.positionX + 1] == 0 && board.boardTable[board.heightCounter - 1][board.positionX + 1] == 0) {
                        board.delPill()
                        board.positionX += 1
                        board.putPill()
                        board.stopPill()
                        board.refresh()
                    }
                }
            }
        }

        //strzała w dół
        if (key.key == "ArrowDown") {

            if (board.heightCounter > 0) {
                clearInterval(board.boardInterval)
                board.boardInterval = setInterval(board.movePill, 80)
                controls.removeKey()
            }
        }

        // strzała w góre
        if (key.key == "ArrowUp") {

            //zmiana kolejnosci kolorów
            if (pill.orientation == "horizontal") {
                let tempColor = ""
                tempColor = pill.color1
                pill.color1 = pill.color2
                pill.color2 = tempColor
            }

            //obró w pion
            if (pill.orientation == "horizontal") {

                if (board.boardTable[board.heightCounter - 1][board.positionX] == 0) {

                    board.delPill()
                    pill.orientation = "vertical"


                    board.putPill()
                    board.stopPill()
                    board.refresh()


                }
            }

            //obrót w poziom
            else if (pill.orientation == "vertical") {

                //odbicie od ściany
                if (board.positionX == 7) {
                    if (board.boardTable[board.heightCounter][board.positionX - 1] == 0) {
                        board.delPill()
                        board.positionX -= 1
                        pill.orientation = "horizontal"
                        board.putPill()
                        board.stopPill()
                        board.refresh()

                    }
                }
                else {
                    if (board.boardTable[board.heightCounter][board.positionX + 1] == 0) {

                        board.delPill()
                        pill.orientation = "horizontal"
                        board.putPill()
                        board.stopPill()
                        board.refresh()

                    }
                }

            }
            pill.upCounter += 1

        }
        if (key.key == "Shift") {
            //zmiana kolejnosci kolorów
            if (pill.orientation == "vertical") {
                let tempColor = ""
                tempColor = pill.color2
                pill.color2 = pill.color1
                pill.color1 = tempColor
            }

            //obró w pion
            if (pill.orientation == "horizontal") {

                if (board.boardTable[board.heightCounter - 1][board.positionX] == 0) {

                    board.delPill()
                    pill.orientation = "vertical"


                    board.putPill()
                    board.stopPill()
                    board.refresh()


                }
            }

            //obrót w poziom
            else if (pill.orientation == "vertical") {

                //odbicie od ściany
                if (board.positionX == 7) {
                    if (board.boardTable[board.heightCounter][board.positionX - 1] == 0) {
                        board.delPill()
                        board.positionX -= 1
                        pill.orientation = "horizontal"
                        board.putPill()
                        board.stopPill()
                        board.refresh()

                    }
                }
                else {
                    if (board.boardTable[board.heightCounter][board.positionX + 1] == 0) {

                        board.delPill()
                        pill.orientation = "horizontal"
                        board.putPill()
                        board.stopPill()
                        board.refresh()

                    }
                }

            }
        }
    }
}

//generacja piguły i przesuwanie
let pill = {
    color1: "blue",
    color2: "red",
    color3: null,
    color4: null,
    orientation: "horizontal",
    upCounter: 0,
    idek: 0,

    generate: function () {
        if (this.color3 != null) {

            this.color1 = this.color3
            this.color2 = this.color4

        }
        controls.keyPress();
        this.idek++
        this.color3 = Math.floor(Math.random() * (3 - 1 + 1)) + 1
        this.color4 = Math.floor(Math.random() * (3 - 1 + 1)) + 1

        //przypisanie kolorów

        if (this.color3 == 1) {
            this.color3 = "blue"
        }
        else if (this.color3 == 2) {
            this.color3 = "red"
        }
        else if (this.color3 == 3) {
            this.color3 = "yellow"
        }

        if (this.color4 == 1) {
            this.color4 = "blue"
        }
        else if (this.color4 == 2) {
            this.color4 = "red"
        }
        else if (this.color4 == 3) {
            this.color4 = "yellow"
        }
        pill.orientation = "horizontal"
        pill.upCounter = 0

        if (this.color3 == null) {

            this.color1 = this.color3
            this.color2 = this.color4
            pill.generate()
        }

        marianna.createPreviev()
    }
}

let lupa = {
    lupaInterval: "",
    klatkaBlue: 7,
    klatkaYellow: 13,
    klatkaRed: 0,
    debilRed: document.querySelector(".debilRed"),
    debilBlue: "",
    debilYellow: "",
    positions: [[90, 40], [110, 40], [140, 50], [170, 50], [170, 70], [170, 90], [170, 120], [170, 140], [140, 170], [120, 170], [100, 170], [80, 160], [70, 160], [60, 140], [60, 120], [60, 100], [60, 80], [90, 50], [90, 50]],
    danceCounter: 1,
    deadCounter: 1,
    redDanceCounter: 1,
    redDeadCounter: 1,
    redAnimation: "dance",
    yellowDanceCounter: 1,
    yellowDeadCounter: 1,
    yellowAnimation: "dance",
    blueDanceCounter: 1,
    blueDeadCounter: 1,
    blueAnimation: "dance",

    red: function () {
        lupa.debilRed = document.querySelector(".debilRed")


        if (lupa.redDanceCounter == 1) {

            if (lupa.redAnimation == "dance") {
                lupa.debilRed.style.backgroundImage = 'url("img/lupa/br/1.png")'
            }
            else if (lupa.redAnimation == "laugh") {
                lupa.debilRed.style.backgroundImage = 'url("img/lupa/br/2.png")'
            }
            else {
                lupa.debilRed.style.backgroundImage = 'url("img/lupa/br/5.png")'

            }

            lupa.redDanceCounter++
        }
        else if (lupa.redDanceCounter == 2) {
            if (lupa.redAnimation == "dance") {
                lupa.debilRed.style.backgroundImage = 'url("img/lupa/br/2.png")'
            }
            else if (lupa.redAnimation == "laugh") {
                lupa.debilRed.style.backgroundImage = 'url("img/lupa/br/4.png")'
            }
            else {
                lupa.debilRed.style.backgroundImage = 'url("img/lupa/br/6.png")'

            }

            lupa.redDanceCounter++
        }
        else if (lupa.redDanceCounter == 3) {
            if (lupa.redAnimation == "dance") {
                lupa.debilRed.style.backgroundImage = 'url("img/lupa/br/3.png")'
            }
            else if (lupa.redAnimation == "laugh") {
                lupa.debilRed.style.backgroundImage = 'url("img/lupa/br/2.png")'
            }
            else {
                lupa.debilRed.style.backgroundImage = 'url("img/lupa/br/5.png")'

            }

            lupa.redDanceCounter++
        }
        else if (lupa.redDanceCounter == 4) {

            if (lupa.redAnimation == "dance") {
                lupa.debilRed.style.backgroundImage = 'url("img/lupa/br/2.png")'
            }
            else if (lupa.redAnimation == "laugh") {
                lupa.debilRed.style.backgroundImage = 'url("img/lupa/br/4.png")'
            }
            else {
                lupa.debilRed.style.backgroundImage = 'url("img/lupa/br/6.png")'
            }


            if (lupa.klatkaRed == lupa.positions.length) {
                lupa.klatkaRed = 0
            }

            //zmiana pozycji
            lupa.debilRed.style.top = lupa.positions[lupa.klatkaRed][0] + "px"
            lupa.debilRed.style.left = lupa.positions[lupa.klatkaRed][1] + "px"
            lupa.klatkaRed++

            lupa.redDanceCounter = 1
        }


    },

    yellow: function () {
        lupa.debilYellow = document.querySelector(".debilYellow")

        if (lupa.yellowDanceCounter == 1) {
            if (lupa.yellowAnimation == "dance") {
                lupa.debilYellow.style.backgroundImage = 'url("img/lupa/yl/1.png")'
            }
            else if (lupa.yellowAnimation == "laugh") {
                lupa.debilYellow.style.backgroundImage = 'url("img/lupa/yl/2.png")'
            }
            else {
                lupa.debilYellow.style.backgroundImage = 'url("img/lupa/yl/5.png")'
            }
            lupa.yellowDanceCounter++
        }
        else if (lupa.yellowDanceCounter == 2) {
            if (lupa.yellowAnimation == "dance") {
                lupa.debilYellow.style.backgroundImage = 'url("img/lupa/yl/2.png")'
            }
            else if (lupa.yellowAnimation == "laugh") {
                lupa.debilYellow.style.backgroundImage = 'url("img/lupa/yl/4.png")'
            }
            else {
                lupa.debilYellow.style.backgroundImage = 'url("img/lupa/yl/6.png")'
            }
            lupa.yellowDanceCounter++
        }
        else if (lupa.yellowDanceCounter == 3) {
            if (lupa.yellowAnimation == "dance") {
                lupa.debilYellow.style.backgroundImage = 'url("img/lupa/yl/3.png")'
            }
            else if (lupa.yellowAnimation == "laugh") {
                lupa.debilYellow.style.backgroundImage = 'url("img/lupa/yl/2.png")'
            }
            else {
                lupa.debilYellow.style.backgroundImage = 'url("img/lupa/yl/5.png")'
            }
            lupa.yellowDanceCounter++
        }
        else if (lupa.yellowDanceCounter == 4) {
            if (lupa.yellowAnimation == "dance") {
                lupa.debilYellow.style.backgroundImage = 'url("img/lupa/yl/2.png")'
            }
            else if (lupa.yellowAnimation == "laugh") {
                lupa.debilYellow.style.backgroundImage = 'url("img/lupa/yl/4.png")'
            }
            else {
                lupa.debilYellow.style.backgroundImage = 'url("img/lupa/yl/6.png")'
            }

            if (lupa.klatkaYellow == lupa.positions.length) {
                lupa.klatkaYellow = 0
            }



            lupa.debilYellow.style.top = lupa.positions[lupa.klatkaYellow][0] + "px"
            lupa.debilYellow.style.left = lupa.positions[lupa.klatkaYellow][1] + "px"
            lupa.klatkaYellow++

            lupa.yellowDanceCounter = 1
        }



    },

    blue: function name() {

        lupa.debilBlue = document.querySelector(".debilBlue")

        if (lupa.blueDanceCounter == 1) {

            if (lupa.blueAnimation == "dance") {
                lupa.debilBlue.style.backgroundImage = 'url("img/lupa/bl/1.png")'
            }
            else if (lupa.blueAnimation == "laugh") {
                lupa.debilBlue.style.backgroundImage = 'url("img/lupa/bl/2.png")'
            }
            else {
                lupa.debilBlue.style.backgroundImage = 'url("img/lupa/bl/5.png")'
            }
            lupa.blueDanceCounter++
        }
        else if (lupa.blueDanceCounter == 2) {

            if (lupa.blueAnimation == "dance") {
                lupa.debilBlue.style.backgroundImage = 'url("img/lupa/bl/2.png")'
            }
            else if (lupa.blueAnimation == "laugh") {
                lupa.debilBlue.style.backgroundImage = 'url("img/lupa/bl/4.png")'
            }
            else {
                lupa.debilBlue.style.backgroundImage = 'url("img/lupa/bl/6.png")'
            }
            lupa.blueDanceCounter++
        }
        else if (lupa.blueDanceCounter == 3) {
            if (lupa.blueAnimation == "dance") {
                lupa.debilBlue.style.backgroundImage = 'url("img/lupa/bl/3.png")'
            }
            else if (lupa.blueAnimation == "laugh") {
                lupa.debilBlue.style.backgroundImage = 'url("img/lupa/bl/2.png")'
            }
            else {
                lupa.debilBlue.style.backgroundImage = 'url("img/lupa/bl/5.png")'
            }
            lupa.blueDanceCounter++
        }
        else if (lupa.blueDanceCounter == 4) {

            if (lupa.blueAnimation == "dance") {
                lupa.debilBlue.style.backgroundImage = 'url("img/lupa/bl/2.png")'
            }
            else if (lupa.blueAnimation == "laugh") {
                lupa.debilBlue.style.backgroundImage = 'url("img/lupa/bl/4.png")'
            }
            else {
                lupa.debilBlue.style.backgroundImage = 'url("img/lupa/bl/6.png")'
            }
            if (lupa.klatkaBlue == lupa.positions.length) {
                lupa.klatkaBlue = 0
            }
            //zmiana pozycji
            lupa.debilBlue.style.top = lupa.positions[lupa.klatkaBlue][0] + "px"
            lupa.debilBlue.style.left = lupa.positions[lupa.klatkaBlue][1] + "px"
            lupa.klatkaBlue++
            lupa.blueDanceCounter = 1
        }


    },

}

let score = {
    actualScore: 0,
    highestScore: 0,

    setScore: function () {
        if (localStorage.getItem('highest') == null) {
            localStorage.setItem('highest', 0)
        }
        if (this.actualScore > this.highestScore) {
            localStorage.setItem('highest', this.actualScore)
        }

        this.highestScore = localStorage.getItem('highest')


        let licznik = document.getElementById("numerki")
        licznik.innerHTML = ""
        console.log(this.actualScore)
        console.log(String(this.actualScore))
        console.log(String(this.actualScore)[0])
        if (this.actualScore == 0) {

            for (let i = 0; i < 7; i++) {
                let cyfra = document.createElement("div")
                cyfra.classList.add("cyfra")
                cyfra.style.backgroundImage = "url('img/cyfry/0.png')"
                cyfra.style.width = "32px"
                cyfra.style.height = "32px"
                licznik.appendChild(cyfra)
            }
        }
        else {
            let lengthCyfry = 0
            let lengthZera = 0

            if (String(this.actualScore).length === 3) {
                lengthCyfry = 3
                lengthZera = 4
            }
            else if (String(this.actualScore).length === 4) {
                lengthCyfry = 4
                lengthZera = 3
            }
            else if (String(this.actualScore).length === 5) {
                lengthCyfry = 5
                lengthZera = 2
            }
            else if (String(this.actualScore).length === 6) {
                lengthCyfry = 6
                lengthZera = 1
            }
            else if (String(this.actualScore).length === 7) {
                lengthCyfry = 7
                lengthZera = 0
            }


            for (let i = 0; i < lengthZera; i++) {
                let cyfra = document.createElement("div")
                cyfra.classList.add("cyfra")
                cyfra.style.backgroundImage = "url('img/cyfry/0.png')"
                cyfra.style.width = "32px"
                cyfra.style.height = "32px"
                licznik.appendChild(cyfra)
            }
            for (let i = 0; i < lengthCyfry; i++) {
                let cyfra = document.createElement("div")
                cyfra.classList.add("cyfra")
                cyfra.style.backgroundImage = "url('img/cyfry/" + String(this.actualScore).charAt(i) + ".png')"
                cyfra.style.width = "32px"
                cyfra.style.height = "32px"
                licznik.appendChild(cyfra)
            }


        }
        let highScore = document.getElementById("highest")
        highScore.innerHTML = ""
        console.log(window.localStorage)
        if (this.highestScore == 0) {

            for (let i = 0; i < 7; i++) {
                let cyfra = document.createElement("div")
                cyfra.classList.add("cyfra")
                cyfra.style.backgroundImage = "url('img/cyfry/0.png')"
                cyfra.style.width = "32px"
                cyfra.style.height = "32px"
                highScore.appendChild(cyfra)
            }
        }
        else {
            let lengthCyfry = 0
            let lengthZera = 0

            if (String(this.highestScore).length === 3) {
                lengthCyfry = 3
                lengthZera = 4
            }
            else if (String(this.highestScore).length === 4) {
                lengthCyfry = 4
                lengthZera = 3
            }
            else if (String(this.highestScore).length === 5) {
                lengthCyfry = 5
                lengthZera = 2
            }
            else if (String(this.highestScore).length === 6) {
                lengthCyfry = 6
                lengthZera = 1
            }
            else if (String(this.highestScore).length === 7) {
                lengthCyfry = 7
                lengthZera = 0
            }


            for (let i = 0; i < lengthZera; i++) {
                let cyfra = document.createElement("div")
                cyfra.classList.add("cyfra")
                cyfra.style.backgroundImage = "url('img/cyfry/0.png')"
                cyfra.style.width = "32px"
                cyfra.style.height = "32px"
                highScore.appendChild(cyfra)
            }
            for (let i = 0; i < lengthCyfry; i++) {
                let cyfra = document.createElement("div")
                cyfra.classList.add("cyfra")
                cyfra.style.backgroundImage = "url('img/cyfry/" + String(this.highestScore).charAt(i) + ".png')"
                cyfra.style.width = "32px"
                cyfra.style.height = "32px"
                highScore.appendChild(cyfra)
            }


        }
    },



}

let marianna = {
    throwCoordsColor1: [
        [3, 10, "L"],
        [3, 10, "D"],
        [2, 10, "R"],
        [1, 9, "U"],
        [1, 8, "L"],
        [1, 8, "D"],
        [1, 8, "R"],
        [0, 7, "U"],
        [1, 6, "L"],
        [1, 6, "D"],
        [1, 6, "R"],
        [0, 5, "U"],
        [1, 4, "L"],
        [1, 4, "D"],
        [1, 4, "R"],
        [0, 3, "U"],
        [1, 2, "L"],
        [1, 2, "D"],
        [2, 2, "R"],
        [1, 1, "U"],
        [2, 0, "L"],
        [3, 0, "L"],
        [4, 0, "L"]
    ],
    throwCoordsColor2: [
        [3, 11, "R"],
        [2, 10, "U"],
        [2, 9, "L"],
        [2, 9, "D"],
        [1, 9, "R"],
        [0, 8, "U"],
        [1, 7, "L"],
        [1, 7, "D"],
        [1, 7, "R"],
        [0, 6, "U"],
        [1, 5, "L"],
        [1, 5, "D"],
        [1, 5, "R"],
        [0, 4, "U"],
        [1, 3, "L"],
        [1, 3, "D"],
        [1, 3, "R"],
        [0, 2, "U"],
        [2, 1, "L"],
        [2, 1, "D"],
        [2, 1, "R"],
        [3, 1, "R"],
        [4, 1, "R"]
    ],
    throwTable: [],

    createThrow: function () {
        let pillthrow = document.querySelector(".pillthrow")
        console.log(pillthrow)

        for (let i = 0; i < 8; i++) {
            this.throwTable.push([])
            for (let j = 0; j < 12; j++) {
                let divek = document.createElement("div")
                divek.classList.add("pole2")
                divek.id = String(i) + "i" + String(j)
                pillthrow.appendChild(divek)
                this.throwTable[i].push(0)
            }
        }
    },

    refreshThrow: function () {
        let pillthrow = document.querySelector(".pillthrow")
        pillthrow.innerHTML = ""
        for (let i = 0; i < 8; i++) {

            for (let j = 0; j < 12; j++) {
                let littleDiv = document.createElement("div")
                littleDiv.classList.add("pole2")

                let urlColor = ""
                if (String(marianna.throwTable[i][j]).includes("$")) {
                    idKloca = marianna.throwTable[i][j].split("$")[1]

                    littleDiv.classList.add(idKloca)

                }
                if (String(marianna.throwTable[i][j]).includes("red")) {
                    urlColor += "br_"

                }
                else if (String(marianna.throwTable[i][j]).includes("blue")) {
                    urlColor += "bl_"
                    littleDiv.style.backgroundColor = "blue"
                }
                else if (String(marianna.throwTable[i][j]).includes("yellow")) {
                    littleDiv.style.backgroundColor = "yellow"
                    urlColor += "yl_"
                }

                if (String(marianna.throwTable[i][j]).includes("L")) {
                    urlColor += "left"
                }
                else if (String(marianna.throwTable[i][j]).includes("R")) {
                    urlColor += "right"
                }
                else if (String(marianna.throwTable[i][j]).includes("U")) {
                    urlColor += "up"
                }
                else if (String(marianna.throwTable[i][j]).includes("D")) {
                    urlColor += "down"
                }

                if (urlColor.length > 3) {
                    littleDiv.style.backgroundImage = "url(\"img/" + urlColor + ".png\")";
                }
                pillthrow.appendChild(littleDiv)

            }
        }

    },

    createPreviev: function () {

        marianna.throwTable[3][10] = "L" + pill.color3
        marianna.throwTable[3][11] = "R" + pill.color4
        marianna.refreshThrow()

    },
    throwCounter: 1,

    throwPill: function () {

        if (document.querySelector('.wygryw').style.backgroundImage != 'url("img/go.png")') {
            lupa.blueAnimation = "dance";
            lupa.yellowAnimation = "dance";
            lupa.redAnimation = "dance";

            if (marianna.throwCounter == 23) {
                pill.generate()
                board.positionX = 3
                board.heightCounter = 0
                board.refresh()
                board.boardInterval = setInterval(board.movePill, 1000)
                marianna.throwCounter = 1
                marianna.throwTable[4][1] = 0
                marianna.throwTable[4][0] = 0
                setTimeout(marianna.refreshThrow, 1000)
                document.getElementById("marianna").style.backgroundImage = "url('img/marianna/up.png')"
            }
            else {
                let Y1 = marianna.throwCoordsColor1[marianna.throwCounter][0]
                let X1 = marianna.throwCoordsColor1[marianna.throwCounter][1]
                let Y2 = marianna.throwCoordsColor2[marianna.throwCounter][0]
                let X2 = marianna.throwCoordsColor2[marianna.throwCounter][1]

                let YY1 = marianna.throwCoordsColor1[marianna.throwCounter - 1][0]
                let XX1 = marianna.throwCoordsColor1[marianna.throwCounter - 1][1]
                let YY2 = marianna.throwCoordsColor2[marianna.throwCounter - 1][0]
                let XX2 = marianna.throwCoordsColor2[marianna.throwCounter - 1][1]
                if (marianna.throwCounter == 6) {
                    document.getElementById("marianna").style.backgroundImage = "url('img/marianna/mid.png')"
                }
                if (marianna.throwCounter == 8) {
                    document.getElementById("marianna").style.backgroundImage = "url('img/marianna/down.png')"
                }

                marianna.throwTable[YY1][XX1] = 0
                marianna.throwTable[YY2][XX2] = 0
                marianna.throwTable[Y1][X1] = marianna.throwCoordsColor1[marianna.throwCounter][2] + pill.color3
                marianna.throwTable[Y2][X2] = marianna.throwCoordsColor2[marianna.throwCounter][2] + pill.color4
                marianna.throwCounter++
                marianna.refreshThrow()
                console.log(marianna.throwCoordsColor1.length)
                setTimeout(marianna.throwPill, 100)
            }
        } else {
            controls.keyPress()
        }
    }
}

