import {React, useState, memo} from "react";
import '../../index.css'
import AddTask from '../../App'
import CloseIcon from "../Modal/CloseIcon.jsx";

const DropDown = ({categorys, value, onChange}) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="selectCategory">
      <option value="">Выберите категорию</option>
      {categorys.map((category) => (
        <option key={category.id} value={category.title}>{category.title}</option>
      ))}
      </select>
    )
}

const PriorityChoose = ({ prioritys, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="selectPriority">
      <option value="">Выберите приоритет</option>
      {prioritys.map((priority) => (
        <option key={priority.id} value={priority.id}>{priority.title }</option>
      ))}
    </select>
  )
}

const ModalWindow = memo(({addTask, addCategory, categorys, prioritys}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [input, setInput] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrioritys, setSelectedPrioritys] = useState('')

    const toggleOpen = () => { 
        setIsModalOpen(true)
    }

    const handleClick = (e) => {
      e.preventDefault()
      if (!input.trim() ||  !selectedCategory || !selectedPrioritys) return
      addTask({ text: input, category: selectedCategory, priority: selectedPrioritys })
      setInput('')
      setCategoryName('')
      setIsModalOpen(false)
    }
    
    return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="buttonAddTask">Создать задачу</button>
      {isModalOpen ? (
        <>
          <div className="backdrop" onClick={() => setIsModalOpen(false)}></div>
            <div className="dialog">
                <div className="modalHead">
                    <span className="doneTasksHeader">Your Tasks</span>
                        <button className="close" onClick={() => setIsModalOpen(false)}>
                            <CloseIcon />
                        </button>
                </div>
              <div className="modalMainUi">
                <div className="modalMenuHeader">
                  <input type="text" placeholder="Введите текст задачи" value={input} onChange={(e) => setInput(e.target.value)} className='inputTask' />
                  <DropDown categorys={categorys} value={selectedCategory} onChange={setSelectedCategory} />
                  <PriorityChoose prioritys={prioritys} value={selectedPrioritys} onChange={(id)=>setSelectedPrioritys(Number(id))}/>
                </div>

                <div className="mainModalMenu">
                  <input className='inputTask' placeholder="Введите имя категории" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                  <button onClick={() => {
                    if(categoryName.trim() === '') return
                    addCategory(categoryName)
                    setCategoryName('')
                  }} className='buttonAddTask' >
                    Создать категорию
                  </button>

                </div>
                <button onClick={handleClick} className='buttonAddTaskModal'>Добавить задачу</button>
                </div>        
            </div>
        </>
      ) : null}
    </>
  );

})

export default ModalWindow
