import { FC, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Action } from '../reducer/contactsReducer';

interface ContactFormProps {
    dispatch: React.Dispatch<Action>;
}

const ContactForm: FC<ContactFormProps> = ({ dispatch }) => {

    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        phone: ''
    })

    console.log(contact.firstName)

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setContact((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleObSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch({
            type: "ADD_CONTACT",
            payload: {
                id: Date.now(),
                ...contact
            }
        })
    }

    return (
        <Form className='contact-form' onSubmit={handleObSubmit}>
            <Form.Group controlId='firstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    className='firstName'
                    name='firstName'
                    value={contact.firstName}
                    type='text'
                    onChange={handleOnChange}
                />
            </Form.Group>

            <Form.Group controlId='lastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    className='lastName'
                    name='lastName'
                    value={contact.lastName}
                    type='text'
                    onChange={handleOnChange}
                />
            </Form.Group>

            <Form.Group controlId='phone'>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    className='phone'
                    name='phone'
                    value={contact.phone}
                    type='number'
                    onChange={handleOnChange}
                />
            </Form.Group>

            <Form.Group controlId='submit' className='mt-4'>
                <Button variant='primary' type='submit' className='submit'>
                    Add Contact
                </Button>
            </Form.Group>
        </Form>
    )
}

export default ContactForm