import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../components/form/form';
import Input from '../../components/input/Input';
import NoteContainer from '../../components/Note/NoteContainer/NoteContainer';
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
                this.props.toggleNoticeBar('success', this.state.note.title + ' Saved');
            }
        })
        .catch(err => {
            alert('error when submit');
        });
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/list');
    }

    pendingItemHandleCheckBox(idx) {
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        noteCopy.items.completed.push({...noteCopy.items.pending[idx]});
        noteCopy.items.pending.splice(idx, 1);
        if(noteCopy.items.pending.length === 0){
            noteCopy.items.pending.push(
                {
                    id: 0,
                    checked: false,
                    description: ''
                }
            );
        }
        this.setState({note: noteCopy});
    }

    

    completedHandleOnClick(idx){
console.log('args', idx);
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        noteCopy.items.pending.push({...noteCopy.items.completed[idx]});
        noteCopy.items.completed.splice(idx, 1)
        this.setState({note: noteCopy});
    }

    pendingItemOnChange(id, event) {
console.log('args',arguments);
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

    pendingItemOnKeyPress(id, event) {
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
                    className='center-text title-input'
                    type='text' 
                    placeholder='Title'
                    value={this.state.note.title}
                    onChange={(event) => this.handleTitleKeyPress(event)}
                    onKeyPress={(event)=>this.handleTitleKeyPress(event)}
                />
            )
        }
        
        return (
            <Form title={title}
                buttons={[<button className='todo-actions todo-actions__submit' onClick={(event) => this.handleSubmit(event)}>
                <i className="fas fa-check todo-actions-icon" />
            </button>,
            <button className='todo-actions todo-actions__cancel' onClick={(event) => this.handleCancel(event)}>
                <i className="fas fa-times todo-actions-icon" />
            </button>,
            <button className='todo-actions todo-actions__cancel'>
                <i  className="far fa-trash-alt"/>
            </button>]}
            >
                <NoteContainer 
                    data={this.state.note.items}
                    completedHandleOnClick={(idx) => this.completedHandleOnClick(idx)}
                    pendingItemHandleCheckBox={(idx) => this.pendingItemHandleCheckBox(idx)}
                    pendingItemOnChange={(idx, event) => this.pendingItemOnChange(idx, event)}
                    pendingItemOnKeyPress={(idx, event) => this.pendingItemOnKeyPress(idx, event)}
                />
            </Form>
        )
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.note.items.pending.length > prevState.note.items.pending.length){
            //this.focusTextInput();
        }
    }

    componentDidMount() {
        if(this.props.history &&
            this.props.history.location && 
            this.props.history.location.state && 
            this.props.history.location.state.noteID)
        {
            api.getNote(this.props.userId, this.props.history.location.state.noteID)
            .then(res => {
                if(res.note.items.completed === undefined){
                    res.note.items.completed = [];
                }
console.log('res.note',res.note);
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
