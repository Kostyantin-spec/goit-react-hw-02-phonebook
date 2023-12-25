import { Component } from 'react';
import css from './contactForm.module.css';
import { nanoid } from 'nanoid';

export class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };

    nameInputId = nanoid();
    numberInputId = nanoid();

    handelSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state);

        this.reset();
    };

    handelChange = event => {
       const { name, value } = event.currentTarget;

       this.setState({ [name]: value });

    };

    reset = () => {
     this.setState({ name: '', number: '' });
    };

    render() {
        return (
          <form className={css.form} onSubmit={this.handelSubmit}>
            <label className={css.label} htmlFor={this.nameInputId}>
              Name
              <input
                className={css.input_form}
                type="text"
                onChange={this.handelChange}
                name="name"
                value={this.state.name}
                required
              />
            </label>
            <label className={css.label} htmlFor={this.numberInputId}>
              Number
              <input
                className={css.input_form}
                type="tel"
                onChange={this.handelChange}
                name="number"
                value={this.state.number}
                required
              />
            </label>
    
            <button className={css.btn} type="submit">
              Add contact
            </button>
          </form>
        );
      }
    }
