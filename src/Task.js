import { FaTimes } from 'react-icons/fa'
import { GiPin } from 'react-icons/gi'

const Task = ({ taskView, doneToggle, delTask, pinnedToggle }) => {
  const categorizeTitle = (task) => {
    if (task.category !== '') {
      return (
        <div className='categorize'>
          <span className='category'>{task.category}</span>
          {task.title}
        </div>
      )
    }
    return task.title
  }

  return (
    <>
      <ul>
        {taskView.map((task) => (
          <div
            key={task.id}
            className={`tasks ${task.done ? 'done' : 'notdone'}`}>
            <li
              className='noselect'
              onClick={() => doneToggle(task.id)}
              onDoubleClick={() => pinnedToggle(task.id)}>
              {categorizeTitle(task)}
            </li>
            {task.pinned ? (
              <span className='pinned'>
                <GiPin />
              </span>
            ) : (
              <span className='delButton' onClick={() => delTask(task.id)}>
                <FaTimes />
              </span>
            )}
          </div>
        ))}
      </ul>
    </>
  )
}

export default Task
