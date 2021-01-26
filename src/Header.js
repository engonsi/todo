const Header = ({ isMobile, task, checkTask, addTask, getCats }) => {
  return (
    <div id='taskEntry' className={isMobile ? 'mobile' : ''}>
      <div>
        <input
          value={task}
          onChange={checkTask}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTask()
            }
          }}
        />
        <button onClick={addTask} className='noselect'>
          Add
        </button>
      </div>
      <div className='filters noselect'>{getCats()}</div>
    </div>
  )
}

export default Header
