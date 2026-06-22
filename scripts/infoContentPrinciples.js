const content = document.querySelectorAll('.info-content-principle')

content.forEach(item => {
    const header = item.querySelector('.info-content-principle-button')

    header.addEventListener('click', () => {
        content.forEach(i => {
            if (i !== item) i.classList.remove('active')
        })
        
        item.classList.toggle('active')
    })
})