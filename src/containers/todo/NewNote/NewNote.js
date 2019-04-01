import React, { Component } from 'react';
import { connect } from 'react-redux'

import Form from '../../../components/form/form';
import Input from '../../../components/input/Input';
import * as actionCreators from '../../../store/actions/index';
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
        this.props.toggleLoading();
console.log('this.props.userId',this.props.userId);
        this.props.saveNotes(this.state.note, this.props.isLogin, this.props.userId);
        //this.handleDialog();
    }
        

    handleDialog() {
        this.props.toggleDialog(
            true, 
            'You need to sign up to save your notes', 
            () => this.props.history.push('/signup'), 
            () => alert('button 2')
        )
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
                <Input 
                    type='text' 
                    placeholder='Title of your next adventure'
                    value={this.state.note.title}
                    onChange={(event) => this.handleTitleKeyPress(event)}
                    onKeyPress={(event)=>this.handleTitleKeyPress(event)}
                    />)
        }
        
        return (
            <Form
                title={title}
                buttons={[<button className='todo-actions todo-actions__submit' onClick={(event) => this.handleSubmit(event)}>
                <i className="fas fa-check todo-actions-icon" />
            </button>, <button className='todo-actions todo-actions__cancel' onClick={(event) => this.handleCancel(event)}>
                        <i className="fas fa-times todo-actions-icon" />
                    </button>
            ]}
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
                    <div key={idx}>
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
                    </div>
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
                    <s key={idx + '__completed'} className='completedItems'>
                        <p onClick={() => this.handleOnClick(idx)}>
                        <Input 
                            type='checkbox' 
                            value='undo' 
                            checked={true} 
                            onChange={()=>this.handleOnClick(idx)}/>
                            {item.description}
                        </p>
                    </s>
                )
            });
        }

        return completedItemsList;
    }

    componentDidMount() {
        //this.focusTextInput();
    }

    render(){
        let loading = null;
        if(this.props.loading){
            loading = (<div><i class="fas fa-spinner"/></div>);
        }

        let content = (<div><i class="fas fa-spinner"/></div>);
        if(this.state.note.items.pending.length || this.state.note.items.completed.length){
            content = this.buildForm();
        }

        return content;
    }
}

const mapStateToProps = state => {
    return {
      notes: state.user.notes,
      isLogin: state.user.login,
      loading: state.user.loading,
      userId: state.user.info.userId
    }
  }

const mapDispatchToProps = dispatch => ({
    saveNotes: (notes, isLogin, userId) => dispatch(actionCreators.saveNotes(notes, isLogin, userId)),
    toggleLoading: () => dispatch(actionCreators.toggleLoading())
})

  export default connect(mapStateToProps, mapDispatchToProps)(NewNote)