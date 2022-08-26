import Trello from './Trello'

export default class DND extends Trello {
  constructor() {
    super()
    this.task = null
    this.background = null
    this.shiftY = null
    this.shiftX = null
    this.eventMove = null
    this.eventUp = null
    this.eventOver = null
    this.events()
  }

  events() {
    super.events()
    this.surface.addEventListener('mousedown', (e) => this.onMouseDown(e))
  }

  onMouseDown(event) {
    if (event.target.closest('.task')) {
      this.task = event.target.closest('.task')
      this.background = document.createElement('div')
      this.shiftY = event.clientY - this.task.getBoundingClientRect().top;
      this.shiftX = event.clientX - this.task.getBoundingClientRect().left;

      this.eventUp = this.onMouseUp.bind(this)
      document.addEventListener('mouseup', this.eventUp)
      this.eventMove = this.onMouseMove.bind(this)
      document.addEventListener('mousemove', this.eventMove)
    }
  }

  onMouseMove(event) {

    this.background.style.height = this.task.clientHeight + 'px'
    this.background.style.width = this.task.clientWidth + 'px'
    this.background.style.borderRadius = '3px'
    this.background.style.backgroundColor = '#bfbfbf'
    this.task.insertAdjacentElement('afterend', this.background)

    this.task.style.position = 'absolute';
    this.task.style.zIndex = 1000;
    this.task.style.width = this.task.closest('.list').clientWidth + 'px'
    this.task.style.top = event.pageY - this.shiftY + 'px';
    this.task.style.left = event.pageX - this.shiftX + 'px';
  }

  onMouseUp(event) {
    document.removeEventListener('mousemove', this.eventMove);
    if (this.background.clientHeight > 0) {
      this.background.remove()
      this.eventOver = this.onMouseOver.bind(this)
      document.addEventListener('mouseover', this.eventOver)
      this.task.style.position = 'relative';
      this.task.style.top = 'auto'
      this.task.style.left = 'auto'
      this.task.style.zIndex = 'auto';
    }

    document.removeEventListener('mouseup', this.eventUp)
  }

  onMouseOver(event) {
    let targetObject = null
    if (event.target.closest('.surface__column')) {
      this.tasks = this.tasks.map(column => this.task.closest('.surface__column').id === column.id ?
        {
          ...column, tasks: column.tasks.filter(item => {
            if (item.id !== this.task.id) {
              return item.id !== this.task.id
            } else {
              targetObject = item
            }
          })
        } :
        column
      )

      this.tasks = this.tasks.map(column => event.target.closest('.surface__column').id === column.id ?
        { ...column, tasks: [...column.tasks, targetObject] } :
        column
      )

      this.printTasks(this.tasks)
    }
    document.removeEventListener('mouseover', this.eventOver)
  }
}