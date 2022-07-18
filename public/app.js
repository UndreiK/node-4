document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id
    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }
})

document.addEventListener('click', event => {
  if (event.target.dataset.type === 'edit') {
    const editTitle = prompt('enter new title')
    const id = event.target.dataset.id

  }
})

async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}