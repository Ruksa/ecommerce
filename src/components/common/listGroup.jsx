import React from 'react';

const ListGroup = (props) => {
    const {items,textProperty,itemProperty,selectedItem,onItemSelect}=props;
    return <ul className="list-group">
    {items.map(item=>
        <li onClick={() => onItemSelect(item)} 
            key={item[itemProperty]}  
             className={selectedItem===item?"list-group-item active":"list-group-item"}>
             {item[textProperty]}
        </li>
    )}
    </ul> ;
}

ListGroup.defaultProps={
    textProperty:"name",
    itemProperty:"_id"
}
 
export default ListGroup;