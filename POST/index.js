const btnGet = document.querySelector('#getBtn')
const btnPost = document.querySelector('#btnAdd')
const btnEdit = document.querySelector('#btnEdit')
const inputName = document.querySelector('#name')
const inputJob = document.querySelector('#job')
const inputEmail = document.querySelector('#email')
const BASE_URL = 'http://localhost:3001'


//get
btnGet.addEventListener('click', async () => {
  const usersBD = await getUsers()
  render(usersBD);
})

async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`)
  const data = await response.json()
  return data
}


//post

btnPost.addEventListener('click', async () => {
  postUsers()
})

async function postUsers() {
  const users = {
    name: inputName.value,
    job: inputJob.value,
    email: inputEmail.value,
  }

  fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(users)
  })
  fetch(`${BASE_URL}/users`)
    .then(response => response.json())
    .then(data => render(data))
}

// put
const ul = document.querySelector('ul')
ul.addEventListener('click', async (e) => {
  const { target } = e
  if (target.tagName = 'LI') {
    const { id } = target.id
    const objUser = await getIdPost(id)
    inputName.value = objUser.name
    inputJob.value = objUser.job
    inputEmail.value = objUser.email
  }
})

async function getIdPost(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`)
  const data = await response.json()
  return data
}

async function putUsers() {
  const users = {
    name: inputName.value,
    job: inputJob.value,
    email: inputEmail.value,
  }

  fetch(`${BASE_URL}/users`, {
    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(users)
  })
  fetch(`${BASE_URL}/users`)
    .then(response => response.json())
    .then(data => render(data))
}




// 
function createPosts(data) {
  const template = `
  <p id=${data.id}>
    <span class='name_element'>${data.name}</span>
    <span class='email_element'>${data.email}</span>
    <span class='job_element'>${data.job}</span>
  </p>
  `
  const li = document.createElement('li')
  li.id = data.id
  li.innerHTML = template
  return li
}

function render(users) {
  const content = document.querySelector('.content')
  content.innerHTML = ''
  users.forEach(item => {
    content.append(createPosts(item))
  });
}