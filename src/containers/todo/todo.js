import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../components/form/form';
import Input from '../../components/input/Input';
import NoteContainerItem from '../../components/Note/NoteContainerItems/NotePendingItem/NotePendingItem';
import * as actionCreators from '../../store/actions/index';
import * as api from '../../utilities/api';
import './todo.css';

class Todo extends Component {
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
        loading: true,
        form: null
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
console.log('handleCheckbox idx ', idx);
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
console.log('noteCopy',noteCopy);
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
                <Input 
                    type='text' 
                    placeholder='Title of your next adventure'
                    value={this.state.note.title}
                    onChange={(event) => this.handleTitleKeyPress(event)}
                    onKeyPress={(event)=>this.handleTitleKeyPress(event)}
                    />)
        }
        
        return (
            <Form title={title}
                button={[<button className='todo-actions todo-actions__submit' onClick={(event) => this.handleSubmit(event)}>
                <i className="fas fa-check todo-actions-icon" />
            </button>,
            <button className='todo-actions todo-actions__cancel' onClick={(event) => this.handleCancel(event)}>
                <i className="fas fa-times todo-actions-icon" />
            </button>,
            <button className='todo-actions todo-actions__cancel'>
                <i  className="far fa-trash-alt"/>
            </button>]}
            >
                {list}
            </Form>
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
                    <NoteContainerItem
                        key={idx} 
                        value={item.description}
                        handleCheckBox={() => this.handleCheckbox(idx)}
                        onChange={(event) => this.handleInputDescription(idx, event)}
                        onKeyPress={event => this.handleKeyPress(idx, event)}
                    />
                    /*
                    <li key={idx}>
                        <Input 
                            type='checkbox' 
                            value='done'
                            checked={false} 
                            onChange={()=>this.handleCheckbox(idx)}/>
                        <Input 
                            type='text' 
                            value={item.description} 
                            onChange={(event) => this.handleInputDescription(idx, event)}
                            onKeyPress={event => this.handleKeyPress(idx, event)}
                            ref={idx === lastIndex ? this.state.textInput : null}/>
                    </li>
                    */
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
                    <NoteContainerItem
                        key={idx + '__completed'} 
                        completed
                        value={item.description}
                        handleCheckBox={() => this.handleCheckbox(idx)}
                        onChange={(event) => this.handleInputDescription(idx, event)}
                        onKeyPress={event => this.handleKeyPress(idx, event)}
                    />
                    /*
                    <li key={idx + '__completed'} className='completedItems'>
                        <s>
                            <p onClick={() => this.handleOnClick(idx)}>
                            <Input 
                                type='checkbox' 
                                value='undo' 
                                checked={true} 
                                onChange={()=>this.handleOnClick(idx)}/>
                                {item.description}
                            </p>
                        </s>
                    </li>
                    */
                )
            });
        }

        return completedItemsList;
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.note.items.pending.length > prevState.note.items.pending.length){
            //this.focusTextInput();
        }
    }

    componentDidMount() {
console.log('this.props.history', this.props.history);
        if(this.props.history &&
            this.props.history.location && 
            this.props.history.location.state && 
            this.props.history.location.state.noteID)
        {
            api.getNote(this.props.userId, this.props.history.location.state.noteID)
            .then(res => {
console.log('res',res);
if(res.note.items.completed === undefined){
    res.note.items.completed = [];
}
console.log('res',res)
                this.setState({
                    note: res.note,
                    loading: false
                })
            })
            .catch(err => {

            })
        }
    }

    render(){
        let content = (<i class="fas fa-spinner fa-spin"/>);
        if(!this.state.loading){
            content = this.buildForm();
        }

        return content;
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.user.login,
        loading: state.user.loading,
        userId: state.user.info.userId
      }
}

const mapDispatchToProps = dispatch => ({
    saveNotes: (notes, isLogin, userId) => dispatch(actionCreators.saveNotes(notes, isLogin, userId)),
    toggleLoading: () => dispatch(actionCreators.toggleLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
