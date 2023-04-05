class App {
    constructor(){
        const get = id => document.querySelector(id)


        this.notes = JSON.parse(localStorage.getItem('notes')) || []
        this.title = ''
        this.text = ''
        this.id = ''

        this.$form = get('#form')
        this.$placeholder = get('#placeholder')
        this.$notes = get('#notes')
        this.$noteTitle = get('#note-title')
        this.$noteText = get('#note-text')
        this.$formButtons = get('#form-buttons')
        this.$formCloseButton = get('#form-close-button')
        this.$modal = get('.modal')
        this.$modalTitle = get('.modal-title')
        this.$modalText = get('.modal-text')
        this.$modalCloseButton = get('.modal-close-button')
        this.$colorTooltip = get('#color-tooltip')

        this.render()
        this.addEventListeners()
    }


    addEventListeners(){
        document.body.addEventListener('click', e => {
            this.handleFormClick(e)
            this.selectNote(e)
            this.openModal(e)
            this.deleteNote(e)
            this.deleteNote(e)
        })

        document.body.addEventListener('mouseover', (e) => {
            this.openTooltip(e)
        })
        document.body.addEventListener('mouseout', (e) => {
            this.closeTooltip(e)
        })
        this.$colorTooltip.addEventListener('mouseover', function() {
            this.style.display = 'flex'
        })
        this.$colorTooltip.addEventListener('mouseout', function() {
            this.style.display = 'none'
        })
        this.$colorTooltip.addEventListener('click', (e) => {
            const color = e.target.dataset.color
            if (color) {
                this.editNoteColor(color)
            }

        })
        


        this.$form.addEventListener('submit', e => {
            e.preventDefault()
            const title = this.$noteTitle.value
            const text = this.$noteText.value
            const hasNote = title || text

            if(hasNote){
                this.addNote({ title, text })
            }
            
        })
        
        this.$formCloseButton.addEventListener('click', e => {
            e.stopPropagation() 
            this.closeForm()
        })
        this.$modalCloseButton.addEventListener('click', e => {
            this.closeModal(e);  
        })
        
    }

    handleFormClick(e){
        const isFormClicked = this.$form.contains(e.target)
        const title = this.$noteTitle.value
        const text = this.$noteText.value
        const hasNote = title || text

        if(isFormClicked){
            this.openForm()
        } else if(hasNote){
            this.addNote({ title, text })
        }
        else{
            this.closeForm()
        }

    }

    openForm(){
        this.$form.classList.add('form-open')
        this.$noteTitle.style.display = 'block'
        this.$formButtons.style.display = 'block'
    }

    closeForm(){
        this.$form.classList.remove('form-open')
        this.$noteTitle.style.display = 'none'
        this.$formButtons.style.display = 'none'
        this.$noteTitle.value = ""
        this.$noteText.value = ""
    }

    openModal(e){
        if (e.target.matches('.trash')) return;  
         
        if(e.target.closest('.note')){
            this.$modal.classList.toggle('open-modal')
            this.$modalTitle.value = this.title
            this.$modalText.value = this.text
        }
    }

    closeModal(e){
        this.editNote()
        this.$modal.classList.toggle('open-modal')
 
    }

    openTooltip(e){
        if (!e.target.matches('.toolbar-color')) return;
        this.id = e.target.dataset.id
        const noteCoords = e.target.getBoundingClientRect()
        const horizontal = noteCoords.left + window.scrollX
        const vertical = noteCoords.top + window.scrollY + 20
        this.$colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`
        this.$colorTooltip.style.display = 'flex'
    }
    
    closeTooltip(e){
        if (!e.target.matches('.toolbar-color')) return;
        this.$colorTooltip.style.display = 'none'
    }


    addNote({ title , text }){
        const newNote = {
            title,
            text,
            color: 'white',
            id: this.notes.length > 0? this.notes[this.notes.length - 1].id + 1 : 1
        }
        this.notes = [...this.notes, newNote]
        this.render()
        this.closeForm()
    }
    editNote(){
        const title = this.$modalTitle.value
        const text = this.$modalText.value
        this.notes = this.notes.map(note => 
            note.id === Number(this.id) ? { ...note, title, text } : note
            )
            this.render()
    }

    editNoteColor(color){
        this.notes = this.notes.map(note => 
            note.id === Number(this.id) ? { ...note, color } : note
        )
        this.render()
    }

    selectNote(e) {
        const $selectedNote = e.target.closest('.note')
        if (!$selectedNote) return;
        const [$noteTitle, $noteText] = $selectedNote.children
        this.title = $noteTitle.innerText
        this.text = $noteText.innerText
        this.id = $selectedNote.dataset.id
    }

    deleteNote(e) {
        e.stopPropagation()
        if (!e.target.matches('.trash')) return;
        const id = e.target.dataset.id
        this.notes = this.notes.filter(note => note.id !== Number(id))
        this.render()
    }


    render(){
        this.saveNotes()
        this.displayNotes()
    }

    saveNotes(){
        localStorage.setItem('notes', JSON.stringify(this.notes))
    }


    displayNotes(){
       const hasNotes = this.notes.length > 0
       this.$placeholder.style.display = hasNotes ? 'none' : 'flex'

       this.$notes.innerHTML =  this.notes.map( note => `
       <div style="background: ${note.color};" class="note" data-id="${note.id}">
        <div class=${note.title && 'note-title'}>${note.title}</div>
        <div class="note-text">${note.text}</div>
        <div class="toolbar-container">
            <div class="toolbar">
            <img class="toolbar-color" data-id="${note.id}"  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMTIgMjJDNi40OSAyMiAyIDE3LjUxIDIgMTJTNi40OSAyIDEyIDJzMTAgNC4wNCAxMCA5YzAgMy4zMS0yLjY5IDYtNiA2aC0xLjc3Yy0uMjggMC0uNS4yMi0uNS41IDAgLjEyLjA1LjIzLjEzLjMzLjQxLjQ3LjY0IDEuMDYuNjQgMS42N0EyLjUgMi41IDAgMCAxIDEyIDIyem0wLTE4Yy00LjQxIDAtOCAzLjU5LTggOHMzLjU5IDggOCA4Yy4yOCAwIC41LS4yMi41LS41YS41NC41NCAwIDAgMC0uMTQtLjM1Yy0uNDEtLjQ2LS42My0xLjA1LS42My0xLjY1YTIuNSAyLjUgMCAwIDEgMi41LTIuNUgxNmMyLjIxIDAgNC0xLjc5IDQtNCAwLTMuODYtMy41OS03LTgtN3oiLz48Y2lyY2xlIGN4PSI2LjUiIGN5PSIxMS41IiByPSIxLjUiLz4KICA8Y2lyY2xlIGN4PSI5LjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgY3g9IjE0LjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSIxMS41IiByPSIxLjUiLz4KPC9zdmc+Cg==">
            <svg class="toolbar-delete trash" data-id="${note.id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z" class="trash" data-id="${note.id}"></path><path d="M9 8h2v9H9zm4 0h2v9h-2z" class="trash" data-id="${note.id}"></path></svg>
            </div>
          </div>
        </div>
       `).join('')
       
    }

}
 
new App()