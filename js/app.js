new Vue({
  el: "#taskApp",
  data: {
    nameApp: "ToDo VueJS",
    beforeTitleCache: '',
    alertMessage: '',
    alertClass: 'alert-success',
    newTask: '',
    tasks: [
      {
        title: "tarea de prueba",
        done: false,
        editing: false
      },
    ]
  },
  methods: {
    showMessage: function ({ message, className }) {
      this.alertMessage = message
      this.alertClass = className
      setTimeout(() => {
        this.alertMessage = ''
        this.alertClass = ''
      }, 4000);
    },
    addTask: function (e) {
      console.log(this.newTask)
      if (this.newTask.length <= 5) {
        this.showMessage({
          message: 'Se requiere <strong>minimo 6 caracteres</strong> para agregar una tarea',
          className: "alert-danger"
        })
        return
      }

      this.tasks.push({
        title: this.newTask,
        done: false,
        editing: false
      })
      localStorage.setItem('todo-vue', JSON.stringify(this.tasks))
      this.newTask = ''
      this.showMessage({
        message: 'Tarea agregada con exito!',
        className: "alert-success"
      })
    },
    editTask: function (task) {
      console.log('click')
      this.beforeTitleCache = task.title
      task.editing = true
    },
    doneEdit: function (task) {
      if (task.title.trim() === '') {
        task.title = this.beforeTitleCache
        return
      }

      localStorage.setItem('todo-vue', JSON.stringify(this.tasks))
      task.editing = false
      this.showMessage({
        message: 'Tarea modificada con exito!',
        className: "alert-info"
      })
    },
    cancelEdit: function (task) {
      task.title = this.beforeTitleCache
      task.editing = false
    },
    deleteTask: function (task) {
      if (confirm('Estas seguro de eliminar esta tarea?')) {
        var index = this.tasks.indexOf(task)
        this.tasks.splice(index, 1)
        localStorage.setItem('todo-vue', JSON.stringify(this.tasks))
      }
    }
  },
  created: function () {
    let dataLocal = JSON.parse(localStorage.getItem('todo-vue'))
    if (dataLocal === null) return

    this.tasks.splice(0, this.tasks.length)
    this.tasks.push(...dataLocal)
  }
});