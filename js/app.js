new Vue({
  el: "#taskApp",
  data: {
    nameApp: "ToDo VueJS",
    beforeTitleCache: '',
    tasks: [
      {
        title: "tarea 1",
        done: false,
        editing: false
      },
      {
        title: "tarea 2",
        done: false,
        editing: false
      },
      {
        title: "tarea 3",
        done: false,
        editing: false
      }

    ]
  },
  methods: {
    addTask: function (e) {
      if (this.tasks.title) {
        if (this.tasks.title.length <= 5) {
          alert('Se requiere minimo 6 caracteres para agregar una tarea')
          return
        }
      } else {
        alert('Por favor, ingresa el nombre de la tarea')
        return
      }

      this.tasks.push({
        title: this.tasks.title,
        done: false
      })
    },
    editTask: function (task) {
      this.beforeTitleCache = task.title
      task.editing = true
    },
    doneEdit: function (task) {
      if (task.title.trim() === '') {
        task.title = this.beforeTitleCache
      }

      task.editing = false
    },
    cancelEdit: function (task) {
      task.title = this.beforeTitleCache
      task.editing = false
    },
    deleteTask: function (task) {
      if (confirm('Estas seguro de eliminar esta tarea?')) {
        var index = this.tasks.indexOf(task)
        this.tasks.splice(index, 1)
      }
    }
  }
});