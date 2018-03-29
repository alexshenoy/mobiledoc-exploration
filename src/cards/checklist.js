export default {
  name: 'checklist',
  type: 'dom',
  render({env, options, payload}) {
    let button = document.createElement('button')
    button.innerHTML = 'Add Todo'
    button.addEventListener('click', function () {
      payload.items.push('A new todo')
      let checklist_card = document.getElementById('card')
      checklist_card.appendChild(append_todo('A new todo'))
    })

    let wrapper = document.createElement('div')
    wrapper.id = 'card'
    wrapper.appendChild(button)

    for (let task of payload.items) {
      wrapper.appendChild(append_todo(task))
    }

    return wrapper
  },
  edit({env, options, payload}) {
    let wrapper = document.createElement('div')
    wrapper.className = 'card'
    for (let task of payload.items) {
      let item_wrapper = document.createElement('div')
      let el = document.createElement('input')
      el.type = 'checkbox'
      let caption = document.createTextNode(task)
      item_wrapper.appendChild(el)
      item_wrapper.appendChild(caption)
      wrapper.appendChild(item_wrapper)
    }
    return wrapper
  },
}

function append_todo(task) {
  let item_wrapper = document.createElement('div')
  let el = document.createElement('input')
  el.type = 'checkbox'

  let caption = document.createTextNode(task)
  item_wrapper.appendChild(el)
  item_wrapper.appendChild(caption)
  return item_wrapper
}
