import React from 'react';
import classes from './ListItems.module.css';
import CreateListItem from '../CreateListItem/CreateListItem';
import ListItem from '../ListItem/ListItem';

const listItems = (props) => {

    let lists = props.lists.map((listItem, index) => {
        return (
            <ListItem
                list={listItem}
                key={listItem.id}
                deleteList={listId => props.deleteList(listId)}
            />
        );
    });

    return (
        <div className={classes.ListItems}>
            <CreateListItem 
                newListChanged={event => props.newListChanged(event)}
                newListSubmit={event => props.newListSubmit(event)}
                newListKeyPressed={event => props.newListKeyPressed(event)}
                newListName={props.newListName}
            />
            {lists}
        </div>
    );
}

export default listItems;