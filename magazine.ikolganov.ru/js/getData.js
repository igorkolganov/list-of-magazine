let magazine = document.getElementsByClassName('magazines-box-block-form')
let author = document.getElementsByClassName('authors-box-block-form')
let buttons = document.getElementsByTagName('button')
let forms = document.getElementsByTagName('form')
let addAuthorButton = document.getElementById('add-new-author')
let addMagazineButton = document.getElementById('add-new-magazine')
let addAuthorFormButton = document.getElementById('add-author-magazine')
let addPhotoFormButton = document.getElementById('add-photo-magazine')
let autorMagazine = document.getElementsByClassName('autor-magazine')

document.addEventListener("DOMContentLoaded", () => {
    showMagazinesBlock()
});

async function getAuthorsForMagazine(a, b){
    let link = 'http://api.ikolganov.ru/major/' + a
    let data = await fetch(link)
    let authors = await data.json()

    authors.forEach((author) => {
        autorMagazine[b].innerHTML += `<p>${author.last_name} ${author.name} ${author.middle_name}</p>`
    })
}

var numColl = -1
async function getMagazines() {
    let data = await fetch('http://api.ikolganov.ru/magazine/list')
    let magazines = await data.json()

    document.querySelector('#show-all-data').innerHTML = ''
    magazines.forEach((magazine) => {
        getAuthorsForMagazine(magazine.id, ++numColl)
        document.querySelector('#show-all-data').innerHTML += `
            <div class="magazines-box-block">
                <div class="magazines-block">
                    <p id="name">${magazine.name}</p>
                    <p id="short-story">${magazine.short_name}</p>
                    <img src="${magazine.picture}" alt="Обложка журнала" style="width: 100%;">
                    <p class="autor-magazine" style="margin-top: 5px; font-weight: bold;">Авторы статьи:</p>
                    <p id="date-magazine">${magazine.date}</p>
                    <button type="button" style="display: inline-block;" onclick="deleteMagazine(${magazine.id})">Удалить журнал</button>
                    <button type="button" style="display: inline-block;" onclick="updateMagazine(${magazine.id})">Редактировать журнал</button>
                </div>
            </div>
        `
    })
}

async function getAuthors() {
    let data = await fetch('http://api.ikolganov.ru/author/list')
    let authors = await data.json()

    document.querySelector('#show-all-data').innerHTML = ''
    authors.forEach((author) => {
        document.querySelector('#show-all-data').innerHTML += `
            <div class="authors-box-block">
                <div class="authors-block">
                    <p>${author.last_name}</p>
                    <p>${author.name}</p>
                    <p>${author.middle_name}</p>
                    <button type="button" style="display: inline-block;" onclick="deleteAuthor(${author.id})">Удалить автора</button>
                    <button type="button" style="display: inline-block;" onclick="updateAuthor(${author.id})">Редактировать автора</button>
                </div>
            </div>
        `
    })
}

function showMagazinesBlock(){
    magazine[0].style.display = 'block'
    author[0].style.display = 'none'
    getMagazines()
}

function showAuthorsBlock(){
    magazine[0].style.display = 'none'
    author[0].style.display = 'block'
    getAuthors()
}

async function addMagazine(){

    let file = $('#photo-magazine-download')[0].files[0]

    // console.log($('#photo-magazine-download')[0].files[0].name)
    // console.log($('#photo-magazine-download')[0].files[0].size)
    // console.log($('#photo-magazine-download')[0].files[0].type)
    // console.log($('#photo-magazine-download')[0].files[0])
    // console.log(2e6, 'size-baby')

    if ((file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') && (file.size < 2e6)){
        addComments()
        let name = forms[0].children[0].value
        let shname = forms[0].children[1].value
        let image = linkUser
        let author = forms[0].children[4].value
        let date = document.querySelector('#date-magazine-form').value

        if (!name){
            alert('Введите название журнала!')
        }else if(!image){
            alert('Необходимо выбрать картинку!')
        }else if(!document.querySelector('#autor-magazine-select1')){
            alert('Выберети автора!')
        }else if(document.querySelector('#date-magazine-form').value === ''){
            alert('Выберете дату журнала!')
        }else{
            let formData = new FormData()
            formData.append('name', name)
            formData.append('shname', shname)
            formData.append('image', image)
            formData.append('author', author)
            formData.append('date', date)

            let result = await fetch('http://api.ikolganov.ru/magazine/add', {
                method: 'POST',
                body: formData
            })
            await getMagazines()

            let numbAuthor = 1
            let linkAuthor = '#autor-magazine-select1'
            let authors = []
            try{
                while (!!document.querySelector(linkAuthor)){
                    linkAuthor = '#autor-magazine-select' + numbAuthor++
                    authors.push(document.querySelector(linkAuthor).value)
                }
            }catch (e){

            }
            await getAuthorsIdFromAPI(authors)
            location.reload()
        }
    }else{
        alert('Файл должен быть формата *.jpg или *.png и размером менее 2Mb!')
    }
}

async function addAuthor(){
    let lastName = forms[1].children[0].value
    let namem = forms[1].children[2].value
    let middleName = forms[1].children[4].value

    if (!lastName && lastName.length < 3){
        alert('Вы не ввели фамилию или она короче 3-ех символов!')
    }else if(!namem){
        alert('Вы не ввели имя!')
    }else{
        let formData = new FormData()
        formData.append('last_name', lastName)
        formData.append('name', namem)
        formData.append('middle_name', middleName)

        let result = await fetch('http://api.ikolganov.ru/author/add', {
            method: 'POST',
            body: formData
        })
        await getAuthors()
    }
}
let idAuthor, idMagazine
for (let i = 0; i < buttons.length; i++){
    if (buttons[i].textContent !== 'Добавить автора' && buttons[i].textContent !== 'Добавить обложку'){
        buttons[i].addEventListener('click', () => {
            switch (i){
                case 0: showMagazinesBlock(); break;
                case 1: showAuthorsBlock(); break;
                case 4:
                    if (addMagazineButton.textContent === 'Изменить журнал'){
                        updateMagazineDB()
                    }else{
                        addMagazine()
                    }; break;
                case 5:
                    if (addAuthorButton.textContent === 'Изменить автора'){
                        updateAuthorDB()
                    }else{
                        addAuthor()
                    }; break;
            }
        })
    }
}

async function deleteAuthor(a) {
    let formData = new FormData()
    formData.append('id', a)

    let result = await fetch('http://api.ikolganov.ru/author/delete', {
        method: 'POST',
        body: formData
    })
    await getAuthors()
    addAuthorButton.innerHTML = 'Добавить нового автора'
    forms[1].children[0].value = ''
    forms[1].children[2].value = ''
    forms[1].children[4].value = ''
}

async function deleteMagazine(a) {
    let formData = new FormData()
    formData.append('id', a)

    let result = await fetch('http://api.ikolganov.ru/magazine/delete', {
        method: 'POST',
        body: formData
    })
    location.reload()
}

async function updateAuthor(a) {
    idAuthor = a
    let link = 'http://api.ikolganov.ru/author/' + a
    let data = await fetch(link)
    let authors = await data.json()
    authors.forEach((author) => {
        forms[1].children[0].value = author.last_name
        forms[1].children[2].value = author.name
        forms[1].children[4].value = author.middle_name
    })
    addAuthorButton.innerHTML = 'Изменить автора'
}

async function addAuthorFormButtonFMagazine(){
    let link = 'http://api.ikolganov.ru/major/' + idMagazine
    let datam = await fetch(link)
    let authorsm = await datam.json()
    let authorl = []

    authorsm.forEach((authorm) => {
        authorl.push(authorm)
    })

    let data = await fetch('http://api.ikolganov.ru/author/list')
    let authors = await data.json()

    for (let i = 0; i < authorl.length; i++){

        b++
        let idSelect = 'autor-magazine-select' + b

        document.querySelector('#author-magazine').innerHTML += `
            <input type="checkbox" checked style="display: inline-block; width: 20px;" class="checkbox-authors">
            <select name="" id="${idSelect}" style="margin-top: 5px; display: inline-block;"></select>
            <br>
            `
        authors.forEach((author) => {
            if ((authorl[i].last_name + authorl[i].name + authorl[i].middle_name) === (author.last_name + author.name + author.middle_name)){
                document.querySelector(`#${idSelect}`).innerHTML += `
                    <option selected>${author.last_name} ${author.name} ${author.middle_name}</option>
                `
            }else{
                document.querySelector(`#${idSelect}`).innerHTML += `
                    <option>${author.last_name} ${author.name} ${author.middle_name}</option>
                `
            }
        })
    }
}

async function updateMagazine(a) {
    idMagazine = a
    let link = 'http://api.ikolganov.ru/magazine/' + a
    let data = await fetch(link)
    let magazines = await data.json()
    magazines.forEach((magazine) => {
        forms[0].children[0].value = magazine.name
        forms[0].children[1].value = magazine.short_name
        document.querySelector('#photo-magazine').textContent = magazine.picture
        forms[0].children[4].value = magazine.name
        document.querySelector('#date-magazine-form').value = magazine.date
    })

    for (let i = 1; i < b + 1; i++) {
        let idSelect = '#autor-magazine-select' + i
        let idElement = document.querySelector(idSelect)
        let classCheckBox = document.querySelector('.checkbox-authors')
        if (!!idElement){
            idElement.parentNode.removeChild(idElement)
        }
        if (!!classCheckBox){
            classCheckBox.parentNode.removeChild(classCheckBox)
        }
    }

    addAuthorFormButtonFMagazine()
    addMagazineButton.innerHTML = 'Изменить журнал'
}

async function updateAuthorDB(){
    let lastName = forms[1].children[0].value
    let namem = forms[1].children[2].value
    let middleName = forms[1].children[4].value
    let id = idAuthor

    if (!lastName && lastName.length < 3){
        alert('Вы не ввели фамилию или она короче 3-ех символов!')
    }else if(!namem){
        alert('Вы не ввели имя!')
    }else{
        let formData = new FormData()
        formData.append('last_name', lastName)
        formData.append('name', namem)
        formData.append('middle_name', middleName)
        formData.append('id', id)

        let result = await fetch('http://api.ikolganov.ru/author/update', {
            method: 'POST',
            body: formData
        })
        await getAuthors()
        addAuthorButton.innerHTML = 'Добавить нового автора'
        forms[1].children[0].value = ''
        forms[1].children[2].value = ''
        forms[1].children[4].value = ''
    }
}

async function updateMagazineDB() {

    let image
    if (($('#photo-magazine-download')[0].files).length === 0){
        image = document.querySelector('#photo-magazine').textContent
    }else{
        let file = $('#photo-magazine-download')[0].files[0]
        if ((file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') && (file.size < 2e6)) {
            addComments()
            image = linkUser
        }else {
            alert('Файл должен быть формата *.jpg или *.png и размером менее 2Mb!')
            return
        }
    }


    let name = forms[0].children[0].value
    let shname = forms[0].children[1].value
    let author = forms[0].children[4].value
    let date = document.querySelector('#date-magazine-form').value
    let id = idMagazine

    if (!name) {
        alert('Введите название журнала!')
    } else if (!image) {
        alert('Необходимо выбрать картинку!')
    } else if (/*!document.querySelector('#autor-magazine-select1')*/false) {
        alert('Выберети автора!')
    } else if (document.querySelector('#date-magazine-form').value === '') {
        alert('Выберете дату журнала!')
    } else {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('shname', shname)
        formData.append('image', image)
        formData.append('author', author)
        formData.append('date', date)
        formData.append('id', id)

        let result = await fetch('http://api.ikolganov.ru/magazine/update', {
            method: 'POST',
            body: formData
        })

        let data = await fetch('http://api.ikolganov.ru/author/list')
        let authors = await data.json()
        let dataj = await fetch('http://api.ikolganov.ru/major')
        let authorsj = await dataj.json()


        let check = -1
        let chooseAuthors = [], chooseAddAuthor = []
        for (let i = 1; i < b + 1; i++) {
            let idSelect = '#autor-magazine-select' + i
            if (!!document.querySelector(idSelect)) {
                check++
                if (!!document.getElementsByClassName('checkbox-authors')[check]) {
                    if (!!document.getElementsByClassName('checkbox-authors')[check].checked) {
                        authors.forEach((author) => {
                            if (document.querySelector(idSelect).value === (author.last_name + ' ' + author.name + ' ' + author.middle_name)) {
                                chooseAuthors.push(author.id)
                            }
                        })
                    }
                } else {
                    authors.forEach((author) => {
                        if (document.querySelector(idSelect).value === (author.last_name + ' ' + author.name + ' ' + author.middle_name)) {
                            chooseAddAuthor.push(author.id)
                        }
                    })
                }

            }
        }

        let idRecords = []
        authorsj.forEach((authorj) => {
            if (+authorj.magazine_id === idMagazine) {
                idRecords.push(authorj.id)
            }
        })

        for (let i = 0; i < idRecords.length; i++) {
            let formDatam = new FormData()
            formDatam.append('author_id', chooseAuthors[i])
            formDatam.append('id', idRecords[i])

            let resultm = await fetch('http://api.ikolganov.ru/major/update', {
                method: 'POST',
                body: formDatam
            })
        }

        for (let i = 0; i < chooseAddAuthor.length; i++) {
            let formDatam = new FormData()
            formDatam.append('author_id', chooseAddAuthor[i])
            formDatam.append('magazine_id', idMagazine)

            let resultm = await fetch('http://api.ikolganov.ru/major/add', {
                method: 'POST',
                body: formDatam
            })
        }


        location.reload()
        addMagazineButton.innerHTML = 'Добавить новый журнал'
        forms[0].children[0].value = ''
        forms[0].children[1].value = ''
        forms[0].children[2].value = ''
        forms[0].children[3].value = ''
        forms[0].children[4].value = ''
    }
}

var b = 0
async function addAuthorFormButtonF(){
    let data = await fetch('http://api.ikolganov.ru/author/list')
    let authors = await data.json()

    b++
    let idSelect = 'autor-magazine-select' + b

    document.querySelector('#author-magazine').innerHTML += `<select name="" id="${idSelect}" style="margin-top: 5px;"></select><br>`
    authors.forEach((author) => {
        document.querySelector(`#${idSelect}`).innerHTML += `
                    <option>${author.last_name} ${author.name} ${author.middle_name}</option>
        `
    })
}

async function addPhotoFormButtonF(){
    document.querySelector('#photo-magazine').innerText = `Пусть к фото`
}

addAuthorFormButton.addEventListener('click', () => {
    addAuthorFormButtonF()
})

addPhotoFormButton.addEventListener('click', () => {
    addPhotoFormButtonF()
})

async function getAuthorsIdFromAPI(a){
    let data = await fetch('http://api.ikolganov.ru/author/list')
    let authors = await data.json()
    let authorsIds = []

    for (let i = 0; i < a.length; i++){
        authors.forEach((author) => {
            if ((author.last_name + ' ' + author.name + ' ' + author.middle_name) === a[i].trim()){
                authorsIds.push(author.id)
            }
        })
    }
    await addAuthorsToMagazines(authorsIds)
}

async function addAuthorsToMagazines(a){
    let data = await fetch('http://api.ikolganov.ru/magazine/list')
    let magazines = await data.json()
    let idMagazine = 0

    magazines.forEach((magazine) => {
        idMagazine = magazine.id
    })
    console.log(a.join(' '), idMagazine)

    for (let i = 0; i < a.length; i++){
        let formData = new FormData()
        formData.append('magazine_id', idMagazine)
        formData.append('author_id', a[i])

        let result = await fetch('http://api.ikolganov.ru/major/add', {
            method: 'POST',
            body: formData
        })
    }
}