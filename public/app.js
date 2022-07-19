document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id
    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }

  if (event.target.dataset.type === 'edit') {
    const editTitle = prompt('enter new title')
    const id = event.target.dataset.id
    edit({id, title: editTitle}).then(()=>{
      event.target.closest('li').querySelector('span').innerText = editTitle
    })
  }
})


async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}

async function edit(obj) {
  await fetch(`/${obj.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
}