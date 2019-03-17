import React, { Component } from 'react';

import * as api from '../../../utilities/api';

import './NewNote.css';

class NewNote extends Component {
    state = {
        // items consist of numeric increment as ID, checked status and description
        note: {
            items: {
                pending: [
                    {
                        id: 0,
                        checked: false,
                        description: ''
                    }
                ],
                completed: []
            },
            title: ''
        },    
        textInput: React.createRef(),
        titleChange: true,
        loading: true
    }

    focusTextInput() {
        this.state.textInput.current.focus();
    }

    newRow(){

    }

    handleSubmit(event){
        event.preventDefault();
        api.submitNote(this.state.note)
        .then(res => {
            if(res.status === 200){
                console.log('props',this.props);
                this.props.toggleNoticeBar('success', this.state.note.title + ' Saved');
            }
        })
        .catch(err => {
            alert('error when submit');
        });
    }

    handleCheckbox(idx) {
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        noteCopy.items.completed.push({...noteCopy.items.pending[idx]});
        noteCopy.items.pending.splice(idx, 1)
        this.setState({note: noteCopy});
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/list');
    }

    handleOnClick(idx){
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        noteCopy.items.pending.push({...noteCopy.items.completed[idx]});
        noteCopy.items.completed.splice(idx, 1)
        this.setState({note: noteCopy});
    }

    handleInputDescription(id, event) {
        event.preventDefault();
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        if(event.key === 'Enter'){
            noteCopy.items.pending.push({
                id: this.state.note.items.pending.length,
                checked: false,
                description: ''});
        } else {
            noteCopy.items.pending[id].description = event.target.value; 
        }
        
        this.setState({note: noteCopy});
    }

    handleKeyPress(id, event) {
        event.preventDefault();
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        if(event.key === 'Enter'){
            noteCopy.items.pending.push({
                id: this.state.note.items.pending.length,
                checked: false,
                description: ''});
        } else {
            const value = event.target.value + event.key;
            noteCopy.items.pending[id].description = value;
        }
        this.setState({note: noteCopy});
    }

    changeTitle() {
        this.setState({titleChange: !this.state.titleChange});
    }

    handleTitleKeyPress(event) {
        if(event.key === 'Enter'){
            this.setState({titleChange: false});
        }
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        noteCopy.title = event.target.value;
        this.setState({note: noteCopy});
    }

    buildForm() {
        let list = this.buildList();
        let title = null;
        if(!this.state.titleChange){
            title = (
                <h1 onClick={()=>this.changeTitle()}>
                    {this.state.note.title}
                </h1>
            );
        } else {
            title = (
                <input 
                    type='text' 
                    placeholder='Title of your next adventure'
                    value={this.state.note.title}
                    onChange={(event) => this.handleTitleKeyPress(event)}
                    onKeyPress={(event)=>this.handleTitleKeyPress(event)}
                    />)
        }
        
        return (
            <form id='todo'>
                {title}
                <div className='form--content'>
                    {list}
                </div>
                <section className='form-content-actions'>
                    <button className='todo-actions todo-actions__submit' onClick={(event) => this.handleSubmit(event)}>
                        <i className="fas fa-check todo-actions-icon" />
                    </button>
                    <button className='todo-actions todo-actions__cancel' onClick={(event) => this.handleCancel(event)}>
                        <i className="fas fa-times todo-actions-icon" />
                    </button>
                </section>  
            </form>
        )
    }

    
    buildList() {
        let pendingItemsList = this.buildPendingList();
        let completedItemsList = this.buildCompleteList();

        return (
            <section>
                <ul>
                    {pendingItemsList}
                </ul>
                <ul>
                    {completedItemsList}
                </ul>
            </section>
        )
    }

    buildPendingList() {
        let lastIndex = this.state.note.items.pending.length - 1;
        let pendingItemsList = this.state.note.items.pending.map((item, idx) => {
            if(!item.checked){
                return (
                    <li key={idx}>
                        <input 
                            type='checkbox' 
                            value='done'
                            checked={false} 
                            onChange={()=>this.handleCheckbox(idx)}/>
                        <input 
                            type='text' 
                            value={item.description} 
                            onChange={(event) => this.handleInputDescription(idx, event)}
                            onKeyPress={event => this.handleKeyPress(idx, event)}
                            ref={idx === lastIndex ? this.state.textInput : null}/>
                    </li>
                )
            } else {
                return null;
            }
        });

        return pendingItemsList;
    }

    buildCompleteList() {
        let completedItemsList = null;
        if(this.state.note.items.completed && this.state.note.items.completed.length){
            completedItemsList = this.state.note.items.completed.map((item, idx) => {
                return (
                    <li key={idx + '__completed'} className='completedItems'>
                        <s>
                            <p onClick={() => this.handleOnClick(idx)}>
                            <input 
                                type='checkbox' 
                                value='undo' 
                                checked={true} 
                                onChange={()=>this.handleOnClick(idx)}/>
                                {item.description}
                            </p>
                        </s>
                    </li>
                )
            });
        }

        return completedItemsList;
    }

    componentDidMount() {
        this.focusTextInput();
    }

    render(){
        let content = (<div><i class="fas fa-spinner"/></div>);
        if(this.state.note.items.pending.length || this.state.note.items.completed.length){
            content = this.buildForm();
        }

        return content;
    }
}

export default NewNote;