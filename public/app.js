const toCurrency = price => new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
}).format(price)

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent)
})

const $card = document.querySelector('#card')

const AJAX = async (id) => {
  try {
    const req = await fetch('card/remove/' + id, {
      method: 'delete'
    })

    const card = await req.json()
    if (card.courses.length) {
      const html = card.courses.map(c => `
      <tr>
        <td>${c.title}</td>
        <td>${c.count}</td>
        <td>
          <button class="btn btn-small js-remove" data-id='${c.id}'>Remove</button>
        </td>
      </tr>`).join('')

      console.log(html)

      $card.querySelector('tbody').innerHTML = html
      $card.querySelector('.price').textContent = toCurrency(card.price)

    } else {
      $card.innerHTML = '<p>Card is empty</p>'
    }
  } catch (error) {
    console.error(error)
  }
}

if ($card) {
  const handlerEvent = (event) => {
    const isJsRemove = event.target.classList.contains('js-remove')
    if (isJsRemove) {
      const id = event.target.dataset.id

      // fetch('card/remove/' + id, {
      //   method: 'delete'
      // }).then(res => res.json())
      // .then(card => {
      //   console.log(card)
      // })

      AJAX(id)

    }
  }
  $card.addEventListener('click', handlerEvent)
}