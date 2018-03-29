<template>
  <div id="editor">
    <div class="hello">
      <p></p>
    </div>
  </div>
</template>

<script>
import Mobiledoc from 'mobiledoc-kit'
import checklist from '../cards/checklist'

export default {
  name: 'HelloWorld',
  data() {
    return {
      message: 'Hello World!',
      doc: {}
    }
  },
  mounted() {
    this.doc = {
      version: "0.3.1",
      markups: [],
      atoms: [],
      cards: [],
      sections: [
        [
          1,
          "h1",
          []
        ]
      ]
    }

    var editor = new Mobiledoc.Editor({
      mobiledoc: this.doc,
      placeholder: 'Start writing...',
      cards: [checklist],
    })

    var element = document.querySelector(".hello")

    editor.didUpdatePost( post => {
      this.doc = editor.serialize('0.3.1')
    })

    editor.onTextInput({
      name: 'customBold',
      match: /^\/\w/,
      run(editor, matches) {
        let checklist_items = [
          'Complete the first task',
          'Complete the second task'
        ]
        editor.insertCard('checklist', {items: checklist_items}, false)
        editor.run(postEditor => postEditor.toggleMarkup("strong"))
      }
    })

    editor.render(element)
  }
}
</script>

<style scoped>

#editor {
  width: 800px;
  border-radius: .20em;
  background-color: white;
  margin: 1.5em auto;
  padding: 0.5rem;
  display: block;
  box-shadow: 0.2rem 0.2rem 0.2rem gray, 0.2rem 0.2rem 0.2rem gray;
  overflow-y: scroll;
  max-height: 80vh;
  min-height: 80vh;
}

.hello {
  position:relative;
  display: inline-block;
  width: inherit;
}

.__mobiledoc-editor.__has-no-content:after {
  content: attr(data-placeholder);
  color: #bbb;
  cursor: text;
  font-size: 32px;
  font-weight: bold;
  position: absolute;
  top: 0;
}

.hello p {
  margin: 0 !important;
}

.card {
    border: 1px solid black;
    padding: 2em;
}

</style>
