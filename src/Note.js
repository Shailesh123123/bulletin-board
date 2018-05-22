import React from "react";
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';

class Note extends React.Component {

constructor(props)
{

super(props);
this.state = {

editing: false

}
this.edit = this.edit.bind(this);
this.remove = this.remove.bind(this);
this.save = this.save.bind(this);
this.renderForm = this.renderForm.bind(this);
this.renderDisplay = this.renderDisplay.bind(this);
this.randomBetween = this.randomBetween.bind(this);

}

componentWillMount(){
		this.style = {
			right: this.randomBetween(0, window.innerWidth-150, 'px'),
			top: this.randomBetween(0,window.innerHeight - 150, 'px'),
			transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
		}
	}

  componentDidUpdate(){
		var textArea
		if(this.state.editing){
			textArea = this._newText
			textArea.focus()
			textArea.select()
		}
	}

  shouldComponentUpdate(nextProps, nextState)
  {

return(

this.props.children !== nextProps.children || this.state !== nextState
  
)

  }

save(e) {
		e.preventDefault()
		this.props.onChange(this._newText.value, this.props.index)
		this.setState({
			editing: false
		})
	}

// save() {
//
// alert(this._newText.value);
//
// }

randomBetween(x, y, s) {

return x + Math.ceil(Math.random() * (y-x)) + s


}


edit() {

alert('editing note');
this.setState({

editing: true

})

}

remove() {

this.props.onRemove(this.props.index)

}

renderForm() {
		return (
			<div className="note" style={this.style}>
				<form onSubmit={this.save}>
					<textarea ref={input => this._newText = input}
					defaultValue={this.props.children}/>
					<button id="save"><FaFloppyO /></button>
				</form>
			</div>
		)
	}

render(){

if(this.state.editing)
{

return this.renderForm();

}
else {

return this.renderDisplay();

}



}



renderDisplay() {
		return (
			<div className="note" style={this.style}>
				<p>{this.props.children}</p>
				<span>
					<button onClick={this.edit} id="edit"><FaPencil /></button>
					<button onClick={this.remove} id="remove"><FaTrash /></button>
				</span>
			</div>
		)
	}

}

export default Note
