import React from "react";

const FilterTasks = ({ filterCategory, setFilterCategory, categorys }) => {
    return (
        <>
            <select className="filterCategory" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">Все категории</option>
                {categorys.map(category => (
                    <option key={category.id} value={category.title}>{category.title}</option>
                ))}

            </select>
        </>
    )
}

export default FilterTasks